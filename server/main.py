from flask import Flask, json
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask import request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity)
from flask import abort
import datetime
import stripe
import json
import os
# The imports down below handle images saved in the server.
from flask import flash, redirect, url_for
from werkzeug.utils import secure_filename
from flask import send_from_directory
from flask_cors import CORS, cross_origin


UPLOAD_FOLDER = '../client/Media'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app = Flask(__name__, static_folder='../client', static_url_path='/')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'LuSg31rsf76nGvMVjzeqV1R0vchtnxu6XTrhrOSLtek'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)

jwt = JWTManager(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

stripe.api_key = "sk_test_51IdXd9I1LSmMkwS0JSJnHxWNUUhHIQJeZI8dO5H7qleNOh30X8cfFOz1e8wgFJduwU1uJCvtrspqIeelpu7RuJjZ00j0qjVnl8"

###################################################### CLASSES ######################################################

# The class user contains all information about the user.
# Written by Jakob, Gustav, Joel & Fredrik

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/account/apikeys


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    telephone = db.Column(db.String, nullable=False)

    gender = db.Column(db.String, nullable=False)
    birthdate = db.Column(db.Date, nullable=False)

    hostads = db.relationship("Ad", backref="host", foreign_keys="Ad.host_id")
    bookedads = db.relationship(
        "Ad", backref="tenant", foreign_keys="Ad.tenant_id")

    payments = db.relationship("Payment", backref="user")

    university = db.Column(db.String, nullable=True)
    education = db.Column(db.String, nullable=True)
    bio = db.Column(db.String, nullable=True)

    verified_student = db.Column(db.Boolean, default=False, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<user {} {} {} {} {} {} {} {} {} {} >'.format(self.id, self.name, self.email, self.telephone,
                                                              self.gender, self.university, self.education, self.bio, self.verified_student, self.is_admin)

    def serialize(self):
        return dict(id=self.id, name=self.name, email=self.email, telephone=self.telephone, gender=self.gender,
                    university=self.university, education=self.education, bio=self.bio, verified_student=self.verified_student,
                    is_admin=self.is_admin, birthdate=self.birthdate)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(
            password).decode('utf8')

    def set_admin(self):
        self.is_admin = True


# The class ad containts all the information about the ads. An ad is owned by a user.
# Written by Jakob, Gustav, Joel
# What to do: Change nullable from false to true, print attributes
class Ad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    neighbourhood = db.Column(db.String, nullable=True)
    studentcity = db.Column(db.String, nullable=True)

    reserved = db.Column(db.Boolean, nullable=False, default=False)
    booked = db.Column(db.Boolean, nullable=False, default=False)
    paid = db.Column(db.Boolean, nullable=False, default=False)

    tenant_startdate = db.Column(db.Date, nullable=True)
    tenant_enddate = db.Column(db.Date, nullable=True)

    streetaddress = db.Column(db.String, nullable=False)
    streetnumber = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=False)
    postalcode = db.Column(db.Integer, nullable=True)
    country = db.Column(db.String, nullable=True)

    startdate = db.Column(db.Date, nullable=False)
    enddate = db.Column(db.Date, nullable=False)
    attributes = db.relationship("Attributes", backref='ad_attribute')

    squaremetres = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    accommodationtype = db.Column(db.String, nullable=False)

    host_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    payment_id = db.relationship("Payment", backref="ad")

    image_id = db.relationship("Image", backref='ad')

    def __repr__(self):
        return '<Ad {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {}>'.format(self.id, self.title, self.description,
                                                                                         self.neighbourhood, self.studentcity, self.streetaddress, self.streetnumber, self.city, self.postalcode,
                                                                                         self.country, self.squaremetres, self.price, self.beds, self.accommodationtype, self.reserved, self.booked, self.paid, self.tenant_id, self.image_id, self.tenant_startdate, self.tenant_enddate)

    def serialize(self):
        return dict(id=self.id, title=self.title, description=self.description, neighbourhood=self.neighbourhood,
                    studentcity=self.studentcity, streetaddress=self.streetaddress, streetnumber=self.streetnumber, city=self.city,
                    postalcode=self.postalcode, country=self.country, squaremetres=self.squaremetres, price=self.price, beds=self.beds,
                    accommodationtype=self.accommodationtype, host=User.query.get(
                        self.host_id).serialize(),
                    startdate=self.startdate.strftime('%Y-%m-%d'),
                    enddate=self.enddate.strftime('%Y-%m-%d'),
                    tenant_startdate=self.startdate.strftime('%Y-%m-%d'),
                    tenant_enddate=self.enddate.strftime('%Y-%m-%d'),
                    reserved=self.reserved,
                    booked=self.booked,
                    paid=self.paid,
                    attributes=Attributes.query.filter_by(
                        ad_id=self.id).first().serialize(),
                    image=Image.query.filter_by(ad_id=self.id).first().serialize(), )


# The class attributes contains all the attributes of ad that has a boolean.
# Written by Jakob, Joel, Gustav
# What to do: Connect to ad.
class Attributes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dishwasher = db.Column(db.Boolean, nullable=False, default=False)
    wifi = db.Column(db.Boolean, nullable=False, default=False)
    washingmachine = db.Column(db.Boolean, nullable=False, default=False)
    sauna = db.Column(db.Boolean, nullable=False, default=False)
    bike = db.Column(db.Boolean, nullable=False, default=False)
    ad_id = db.Column(db.Integer, db.ForeignKey('ad.id'), nullable=True)

    def __repr__(self):
        return '<Attributes {} {} {} {} {} {}>'.format(self.id, self.dishwasher, self.wifi,
                                                       self.washingmachine, self.sauna, self.bike)

    def serialize(self):
        return dict(id=self.id, dishwasher=self.dishwasher, wifi=self.wifi,
                    washingmachine=self.washingmachine, sauna=self.sauna, bike=self.bike)


# The class contains details regarding a payment
class Payment(db.Model):
    id = db.Column(db.String, primary_key=True)
    ad_id = db.Column(db.Integer, db.ForeignKey('ad.id'), nullable=False)
    payement_person_id = db.Column(
        db.Integer, db.ForeignKey('user.id'), nullable=False)
    payment_price = db.Column(db.Integer, nullable=False)
    ad_title = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<Payment {} {} {} {}>'.format(self.id, self.ad_id, self.payement_person_id,
                                              self.payment_price, self.ad_title)

    def serialize(self):
        return dict(id=self.id, ad_id=self.ad_id, payment_person_id=self.payement_person_id,
                    payment_price=self.payment_price, ad_title=self.ad_title)


# Image class
class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ad_id = db.Column(db.Integer, db.ForeignKey('ad.id'), nullable=False)
    url = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<url: {}>'.format(self.url)

    def serialize(self):
        return dict(url=self.url)


###################################################### APP.ROUTES ######################################################

# /user/signup has the method POST that is used when you want to create a new user on the website.
# Written by Jakob, Gustav
# KIND OF DONE


@app.route('/')
def default():
    return app.send_static_file("index.html")


@app.route('/user/signup', methods=['POST'])
def signup():
    newuser = request.get_json(force=True)
    if not (User.query.filter_by(email=newuser.get('email')).first()):
        newuserDB = User(name=newuser.get('name'), email=newuser.get(
            'email'), telephone=newuser.get('telephone'), gender=newuser.get('gender'), birthdate=datetime.date(int(newuser.get('year')), int(newuser.get('month')), int(newuser.get('day'))))
        User.set_password(newuserDB, newuser.get('password'))
        db.session.add(newuserDB)
        db.session.commit()
        return "Created", 201
    else:
        return "email_in_use", 409


@app.route('/user/edit', methods=['PUT'])
@jwt_required()
def edit_user():
    edituser = request.get_json(force=True)
    editable_user = User.query.filter_by(id=get_jwt_identity()).first()
  #  print(editable_user.get('name'))
    if edituser.get('name') != None:
        editable_user.name = edituser.get('name')
    if edituser.get('email') != None:
        editable_user.email = edituser.get('email')
    if edituser.get('telephone') != None:
        editable_user.telephone = edituser.get('telephone')
    if edituser.get('gender') != None:
        editable_user.gender = edituser.get('gender')
    if edituser.get('bio') != None:
        editable_user.bio = edituser.get('bio')
    db.session.commit()
    return "Changed"


# /user/login has the method POST that is used when you want to log in with a user.
# Written by Jakob, Gustav, Joel
# KIND OF DONE
@app.route('/user/login', methods=['POST'])
def login():
    user = request.get_json(force=True)
    found = User.query.filter_by(email=user['email']).first()
    if found:
        if (bcrypt.check_password_hash(found.password_hash, user['password'])):
            access_token = create_access_token(identity=found.id)
            response = {"token": access_token, "user": found.serialize()}
            return jsonify(response), 200
        else:
            abort(401)
    else:
        abort(401)


@app.route('/user/ads', methods=['GET'])
@jwt_required()
def my_ads():
    current_user_id = get_jwt_identity()
    if request.method == 'GET':
        all_ads = Ad.query.filter(Ad.host_id == current_user_id).all()
        ad_list = []
        for ad in all_ads:
            ad_list.append(ad.serialize())
        return jsonify(ad_list)


@app.route('/user/bookings', methods=['GET'])
@jwt_required()
def my_bookings():
    current_user_id = get_jwt_identity()
    if request.method == 'GET':
        all_ads = Ad.query.filter(
            Ad.tenant_id == current_user_id, Ad.reserved == True).all()
        ad_list = []
        for ad in all_ads:
            ad_list.append(ad.serialize())
        return jsonify(ad_list)


# /users has the method GET that is used when you want to retrieve all the users that are in the database. Not sure if we actually need it.
# Written by Jakob, Gustav, Joel
# KIND OF DONE
@app.route('/users', methods=['GET'])
def list_users():
    user_list = []
    all_users = User.query.all()
    for user in all_users:
        user_list.append(user.serialize())
    return jsonify(user_list)


# /ad/<int:ad_id> has the method PUT, GET. The method PUT .....
# Written by Jakob, Joel, Gustav
@app.route('/ad/<int:ad_id>', methods=['PUT', 'GET'])
def list_ad(ad_id):
    if request.method == 'GET':
        return jsonify(Ad.query.get_or_404(ad_id).serialize())
    elif request.method == 'PUT':
        # NOT NECCESSARY TO IMPLEMENT YET
        return "NYI"


@app.route('/ad/<int:ad_id>/reserved', methods=['PUT'])
def set_reserved(ad_id):
    if request.method == 'PUT':
        reserved = request.get_json(force=True)
        current_ad = Ad.query.get_or_404(ad_id)
        current_ad.reserved = reserved.get('status')
        current_ad.tenant_startdate = datetime.datetime.strptime(
            reserved.get('start'), '%Y-%m-%d').date()
        current_ad.tenant_enddate = datetime.datetime.strptime(
            reserved.get('end'), '%Y-%m-%d').date()
        db.session.commit()
        return "success", 200


@app.route('/ad/<int:ad_id>/paid', methods=['PUT'])
def set_paid(ad_id):
    if request.method == 'PUT':
        paid = request.get_json(force=True)
        current_ad = Ad.query.get_or_404(ad_id)
        current_ad.paid = paid
        db.session.commit()
        return "success", 200


@app.route('/ad/<int:ad_id>/booked', methods=['PUT'])
def set_booked(ad_id):
    if request.method == 'PUT':
        booked = request.get_json(force=True)
        current_ad = Ad.query.get_or_404(ad_id)
        current_ad.booked = booked
        db.session.commit()
        return "success", 200


@app.route('/ad/<int:ad_id>/tenant', methods=['PUT', 'GET'])
@jwt_required()
def tenant(ad_id):
    if request.method == 'PUT':
        tenant_id = get_jwt_identity()
        current_ad = Ad.query.get_or_404(ad_id)
        current_ad.tenant_id = tenant_id
        db.session.commit()
        return "success", 200
    if request.method == 'GET':
        current_ad = Ad.query.get_or_404(ad_id)
        return jsonify(User.query.get_or_404(current_ad.tenant_id).serialize())


# /ads has the method GET, it is used to retrieve all the ads that is stored in the database.
# Written by Jakob, Gustav, Joel & Fredrik
@app.route('/ads', methods=['GET'])
def ads():
    if request.method == 'GET':
        sort = request.args.get('sort')
        sort_parameter = request.args.get('sortparam')
        start = request.args.get('start')
        end = request.args.get('end')
        area = request.args.get('area')
        attrib = request.args.get('attributes')
        type = request.args.get('type')
        attrib2 = attrib.split('-')
        filter = []
        filter.append(Ad.reserved != True)
        if start:
            filter.append(Ad.startdate <= start)
        if end:
            filter.append(Ad.enddate >= end)
        if area != "Område":
            filter.append(Ad.neighbourhood == area)
        if type != "Typ av boende":
            filter.append(Ad.accommodationtype == type)
        if attrib != "Bekvämligheter":
            for a in attrib2:
                filter.append(Ad.attributes.any(
                    getattr(Attributes, a)) == True)
        ad_list = []
        if sort == "asc":
            all_ads = Ad.query.filter(*filter).order_by(
                getattr(Ad, sort_parameter).asc()).all()
        else:
            all_ads = Ad.query.filter(*filter).order_by(
                getattr(Ad, sort_parameter).desc()).all()
        for ad in all_ads:
            ad_list.append(ad.serialize())
        return jsonify(ad_list)


# /ad/create has the method POST, it is used to make an ad that is connected to the specifik user that created it.
# Written by Jakob, Gustav, Joel & Fredrik

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)


@app.route('/ad/create', methods=['POST'])
@jwt_required()
def create_ad():
    if request.method == 'POST':
        current_user_id = get_jwt_identity()
        newad = request.get_json(force=True)
        print(newad)
        newadDB = Ad(title=newad.get('title'), description=newad.get('description'),
                     neighbourhood=newad.get('neighbourhood'), studentcity="Linköping",
                     streetaddress=newad.get('streetaddress'), streetnumber=newad.get('streetnumber'), city=newad.get('city'),
                     postalcode=newad.get('postalcode'), country="Sverige", host_id=(current_user_id),
                     startdate=datetime.datetime.strptime(
                         newad.get('startdate'), '%Y-%m-%d').date(),
                     enddate=datetime.datetime.strptime(newad.get('enddate'), '%Y-%m-%d').date(), squaremetres=newad.get('squaremetres'),
                     price=newad.get('price'), beds=newad.get('beds'), accommodationtype=newad.get('accommodationtype'))

        db.session.add(newadDB)
        db.session.flush()
        db.session.commit()

        print(newad.get('attributes'))
        attributesDB = Attributes()
        setattr(attributesDB, 'ad_id', newadDB.id)
        if newad.get('attributes'):
            list = newad.get('attributes').split(
                ' ')  # list = ['bike', 'wifi'];
            for x in list:
                setattr(attributesDB, x, True)
        db.session.add(attributesDB)
        db.session.flush()
        print(attributesDB)
        db.session.commit()

        file = request.files.get('file')
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            imageDB = Image(ad_id=newadDB.id, url=url_for(
                'uploaded_file', filename=filename))
            db.session.add(imageDB)
            db.session.flush()
            db.session.commit()

        if file and not allowed_file(file.filename):
            filename = secure_filename(file.filename)

            imageDB = Image(ad_id=newadDB.id, url=url_for(
                'uploaded_file', filename=filename))
            db.session.add(imageDB)
            db.session.flush()
            db.session.commit()

        return "success", 200

# Löser så att man kan lägga till bilder
# @app.route('/ad/addimage/<int:ad_id>', methods = ['POST'])
# @jwt_required
# def addimage(ad):
    #newImage = Image(ad_id = ad.id, url= ...)


# By Abbetabbe
@app.route('/areas', methods=['GET'])
def areas():
    area_list = []
    all_areas = db.session.query(Ad.neighbourhood).distinct()
    for area in all_areas:
        area_list.append(area)
    return jsonify(area_list)


# By Abbetabbe
@app.route('/types', methods=['GET'])
def types():
    type_list = []
    all_types = db.session.query(Ad.accommodationtype).distinct()
    for type in all_types:
        type_list.append(type)
    return jsonify(type_list)

# Payment, functions and app routes


def calculate_order_amount(id):
    current_ad = Ad.query.get_or_404(id)
    return current_ad.price * 100

# Creates the payment intent


@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        data = json.loads(request.data)
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(data['id']),
            currency='sek'
        )
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403

# API to register a payment in the payment history + get:ing the payment history


@app.route('/payments', methods=['GET', 'POST'])
@jwt_required()
def payments():
    if request.method == 'POST':
        user_id = get_jwt_identity()
        payment = request.get_json(force=True)
        amount = calculate_order_amount(payment.get("ad_id"))/100
        current_ad = Ad.query.get_or_404(payment.get("ad_id"))
        ad_title_temp = current_ad.title
        newPaymentDB = Payment(id=payment.get('paymentID'), ad_id=payment.get(
            "ad_id"), payement_person_id=user_id, payment_price=amount, ad_title=ad_title_temp)  # ändrat /Joel
        db.session.add(newPaymentDB)
        db.session.commit()
        return "success", 200
    elif request.method == 'GET':
        user_id = get_jwt_identity()
        ad_id = request.args.get('id')
        payment = Payment.query.filter(
            Payment.ad_id == ad_id).first()
        payment = payment.serialize()
        return jsonify(payment)

# API för att registrera en betalning till betalningshistorik samt hämta betalningshistorik


@app.route('/past-bookings', methods=['GET'])
@jwt_required()
def past_bookings():
    if request.method == 'GET':
        user_id = get_jwt_identity()
        booking_list = []
        current_date = datetime.datetime.now()
        all_bookings = Ad.query.filter(
            Ad.tenant_id == user_id, Ad.paid == True, Ad.tenant_enddate < current_date)
        for booking in all_bookings:
            booking_list.append(booking.serialize())
        return jsonify(booking_list)
# Ändra detta API när datum är implementerat i en bokning

# ___________________________________________


exec(open('script.py').read())

if __name__ == "__main__":
    app.run(debug=True)

# API:
# Anvandare
# Bli vard
# Anvandaruppgifter
# Anvandarnamn -
# Epost -
# Losenord -
# Profilbeskrivning
# Profilbild?
# Bli medlem
# Anvandaruppgifter
# Anvandarnamn
# Epost
# Losenord
# Profilbeskrivning
# Profilbild?
# Logga in/ut
# Glomt losenord
# Andra losenord
# Redigera anvandare
# Anvandaruppgifter
# Anvandarnamn
# Epost
# Losenord
# Profilbeskrivning
# Profilbild?

# Annonser
# Lagga upp annons
# Beskrivning
# Bilder
# Plats
# Redigera annons
# Beskrivning
# Bilder
# Plats
# Sokning av annons
# Plats
# Adress
# Stad
# Omrade
# Specifika attribut
# Storlek pa lagenhet & rum
# Funktioner
