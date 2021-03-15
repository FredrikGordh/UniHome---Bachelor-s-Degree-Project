from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask import request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity)
from flask import abort

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
    birthdate = db.relationship("Date", backref='birthdate')
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
                    is_admin=self.is_admin, birthdate=Date.query.filter_by(user_id=self.id).first().serialize())

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

    startdate = db.relationship(
        "Date", backref='start', foreign_keys="Date.start_ad_id")
    enddate = db.relationship("Date", backref='end',
                              foreign_keys="Date.end_ad_id")
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
                    startdate=Date.query.filter_by(
                        start_ad_id=self.id).first().serialize(),
                    enddate=Date.query.filter_by(end_ad_id=self.id).first().serialize())


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


class Date(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=False)
    month = db.Column(db.Integer, nullable=False)
    day = db.Column(db.Integer, nullable=False)
    start_ad_id = db.Column(db.Integer, db.ForeignKey('ad.id'), nullable=True)
    end_ad_id = db.Column(db.Integer, db.ForeignKey('ad.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def __repr__(self):
        return '<Date {} {} {} {}>'.format(self.id, self.year, self.month, self.day)

    def serialize(self):
        return dict(id=self.id, year=self.year, month=self.month, day=self.day)


###################################################### APP.ROUTES ######################################################

# /user/signup has the method POST that is used when you want to create a new user on the website.
# Written by Jakob, Gustav
# KIND OF DONE
@app.route('/user/signup', methods=['POST'])
def signup():
    newuser = request.get_json(force=True)
    if not (User.query.filter_by(email=newuser.get('email')).first()):
        newuserDB = User(name=newuser.get('name'), email=newuser.get(
            'email'), telephone=newuser.get('telephone'), gender=newuser.get('gender'))
        User.set_password(newuserDB, newuser.get('password'))
        db.session.add(newuserDB)
        db.session.commit()
        birthdateDB = Date(year=newuser.get('year'), month=newuser.get(
            'month'), day=newuser.get('day'), user_id=newuserDB.id)
        db.session.add(birthdateDB)
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
    print(found.serialize())
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
        return "NYI"


# /ads has the method GET, it is used to retrieve all the ads that is stored in the database.
# Written by Jakob, Gustav, Joel & Fredrik
@app.route('/ads', methods=['GET'])
def ads():
    if request.method == 'GET':
        ad_list = []
        all_ads = Ad.query.all()
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
            'description'), host_id=(current_user_id))
        db.session.add(newadDB)
        db.session.commit()
        startdayDB = Date(year=newad.get('startyear'), month=newad.get(
            'startmonth'), day=newad.get('startday'), start_ad_id=newadDB.id)
        enddayDB = Date(year=newad.get('endyear'), month=newad.get(
            'endmonth'), day=newad.get('endday'), end_ad_id=newadDB.id)
        attributesDB = Attributes(ad_id=newadDB.id)
        db.session.add(startdayDB)
        db.session.add(enddayDB)
        db.session.add(attributesDB)
        db.session.commit()

        return "success", 200


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
