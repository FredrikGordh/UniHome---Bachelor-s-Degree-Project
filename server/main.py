from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask import request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity)
from flask import abort
import datetime

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'LuSg31rsf76nGvMVjzeqV1R0vchtnxu6XTrhrOSLtek'
jwt = JWTManager(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

###################################################### CLASSES ######################################################

# The class user contains all information about the user.
# Written by Jakob, Gustav, Joel & Fredrik


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

    streetaddress = db.Column(db.String, nullable=True)
    streetnumber = db.Column(db.String, nullable=True)
    city = db.Column(db.String, nullable=True)
    postalcode = db.Column(db.Integer, nullable=True)
    country = db.Column(db.String, nullable=True)

    startdate = db.Column(db.Date, nullable=False)
    enddate = db.Column(db.Date, nullable=False)
    attributes = db.relationship("Attributes", backref='ad_attribute')

    squaremetres = db.Column(db.Integer, nullable=True)
    price = db.Column(db.Integer, nullable=True)
    beds = db.Column(db.Integer, nullable=True)
    accommodationtype = db.Column(db.String, nullable=True)

    host_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def __repr__(self):
        return '<Ad {} {} {} {} {} {} {} {} {} {} {} {} {} {}>'.format(self.id, self.title, self.description,
                                                                       self.neighbourhood, self.studentcity, self.streetaddress, self.streetnumber, self.city, self.postalcode,
                                                                       self.country, self.squaremetres, self.price, self.beds, self.accommodationtype)

    def serialize(self):
        return dict(id=self.id, title=self.title, description=self.description, neighbourhood=self.neighbourhood,
                    studentcity=self.studentcity, streetaddress=self.streetaddress, streetnumber=self.streetnumber, city=self.city,
                    postalcode=self.postalcode, country=self.country, squaremetres=self.squaremetres, price=self.price, beds=self.beds,
                    accommodationtype=self.accommodationtype, host=User.query.get(
                        self.host_id).serialize(),
                    startdate=self.startdate,
                    enddate=self.enddate,
                    attributes=Attributes.query.filter_by(ad_id=self.id).first().serialize())


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

# The class date is used for managing dates. Both ad and user uses the date class.
# Written by Jakob, Gustav, Joel

class Image(db.Model): 

# WILL MAKE A IMAGE/PICTURE CLASS HERE EVENTUALLY


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
        return "E-mail already in use", 409


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
        if start:
            filter.append(Ad.startdate <= start)
        if end:
            filter.append(Ad.enddate >= end)
        if area != "Område":
            filter.append(Ad.neighbourhood == area)
        if type != "Typ av boende":
            filter.append(Ad.accommodationtype == type)
        if attrib != "Attribut":
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
@app.route('/ad/create', methods=['POST'])
@jwt_required()
def create_ad():
    if request.method == 'POST':
        current_user_id = get_jwt_identity()
        newad = request.get_json(force=True)
        newadDB = Ad(title=newad.get('title'), description=newad.get(
            'description'), host_id=(current_user_id), startdate=newad.get('start'), enddate=newad.get('end'))
        db.session.add(newadDB)
        db.session.commit()
        attributesDB = Attributes(ad_id=newadDB.id)
        db.session.add(attributesDB)
        db.session.commit()

        return "success", 200


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
