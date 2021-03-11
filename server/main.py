from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask import request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity)

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'LuSg31rsf76nGvMVjzeqV1R0vchtnxu6XTrhrOSLtek'
jwt = JWTManager(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

########################### CLASSES ###########################

# The class user contains all information about the user. Written by Jakob, Gustav, Joel & Fredrik


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    telephone = db.Column(db.String, nullable=False)

    gender = db.Column(db.String, nullable=False)
    yearofbirth = db.Column(db.Integer, nullable=False)
    monthofbirth = db.Column(db.Integer, nullable=False)
    dayofbirth = db.Column(db.Integer, nullable=False)

    university = db.Column(db.String, nullable=True)
    education = db.Column(db.String, nullable=True)
    bio = db.Column(db.String, nullable=True)

    verified_student = db.Column(db.Boolean, default=False, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    def __repr__(self):
        return '<user {} {} {} {} {} {} {} {} {} {} {} {} {}>'.format(self.id, self.name, self.email, self.telephone, self.gender, self.yearofbirth, self.monthofbirth, self.dayofbirth, self.university, self.education, self.bio, self.verified_student, self.is_admin)

    def serialize(self):
        return dict(id=self.id, name=self.name, email=self.email, telephone=self.telephone, gender=self.gender, yearofbirth=self.yearofbirth, monthofbirth=self.monthofbirth, dayofbirth=self.dayofbirth, university=self.university, education=self.education, bio=self.bio, verified_student=self.verified_student, is_admin=self.is_admin, )  # har lagt till is_admin

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(
            password).decode('utf8')

    def set_admin(self):
        self.is_admin = True


# The class ad containts all the information about the ads. A ad is owned by a user. Written by Jakob, Gustav, Joel & Fredrik
class Ad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    neighbourhood = db.Column(db.String, nullable=False)
    studentcity = db.Column(db.String, nullable=False)

    streetaddress = db.Column(db.String, nullable=False)
    streetnumber = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    postalcode = db.Column(db.Integer, nullable=False)
    country = db.Column(db.String, nullable=False)

    startyear = db.Column(db.Integer, nullable=False)
    startmonth = db.Column(db.Integer, nullable=False)
    startday = db.Column(db.Integer, nullable=False)
    stopyear = db.Column(db.Integer, nullable=False)
    stopmonth = db.Column(db.Integer, nullable=False)
    stopday = db.Column(db.Integer, nullable=False)

    dishwasher = db.Column(db.Boolean, nullable=False)
    wifi = db.Column(db.Boolean, nullable=False)
    washingmachine = db.Column(db.Boolean, nullable=False)
    sauna = db.Column(db.Boolean, nullable=False)
    bike = db.Column(db.Boolean, nullable=False)

    squaremetres = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    beds = db.Column(db.Integer, nullable=False)
    accommodationtype = db.Column(db.String, nullable=False)
   
   # features = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)

    def __repr__(self):
        return '<Ad {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {} {}>'.format(self.id, self.title, self.description, self.neighbourhood, self.studentcity, self.streetaddress, self.streetnumber, self.city, self.postalcode, self.country, self.startyear, self.startmonth, self.startday, self.stopyear, self.stopmonth, self.stopday, self.dishwasher, self.wifi, self.washingmachine, self.sauna, self.bike, self.squaremetres, self.price, self.beds, self.accommodationtype)

    def serialize(self):
        return dict(id=self.id, title=self.title, description=self.description, neighbourhood=self.neighbourhood, studentcity=self.studentcity, streetaddress=self.streetaddress, streetnumber=self.streetnumber, city=self.city, postalcode=self.postalcode, country=self.country, startyear=self.startyear, startmonth=self.startmonth, startday=self.startday, stopyear=self.stopyear, stopmonth=self.stopmonth, stopday=self.stopday, dishwasher=self.dishwasher, wifi=self.wifi, washingmachine=self.washingmachine, sauna=self.sauna, bike=self.bike, squaremetres=self.squaremetres, price=self.price, beds=self.beds, accommodationtype=self.accommodationtype user=User.query.get(self.user_id).serialize())

# class Attributes(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     attribute = db.Column(db.String, nullable=False)

    
# class Date(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     year = db.Column(db.Integer, nullable=False)
#     month = db.Column(db.Integer, nullable=False)
#     day = db.Column(db.Integer, nullable=False)

#     def __repr__(self):
#         return '<Date {} {} {}>'.format(self.id, self.year, self.month, self.day)

#     def serialize(self):
#         return dict(id=self.id, adress=self.adress, description=self.description, user=User.query.get(self.user_id).serialize())



########################### APP.ROUTES ###########################

# /user/signup has the method POST that is used when you want to create a new user on the website. Written by Jakob, Gustav, Joel & Fredrik


@app.route('/user/signup', methods=['POST'])
def signup():
    newuser = request.get_json(force=True)
    if not (User.query.filter_by(email=newuser.get('email')).first()):
        newuserDB = User(name=newuser.get('name'), email=newuser.get('email'), telephone=newuser.get('telephone'), gender=newuser.get('gender'), yearofbirth=newuser.get('yearofbirth'), monthofbirth=newuser.get('monthofbirth'), dayofbirth=newuser.get('dayofbirth'))
        User.set_password(newuserDB, newuser.get('password'))

    # if(newuser.get('is_admin') == "True"):
    #    User.set_admin(newuserDB)
    # Needs to be changed

    db.session.add(newuserDB)
    db.session.commit()
    return "Success", 200

# /user/login has the method POST that is used when you want to log in with a user. Written by Jakob, Gustav, Joel & Fredrik


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

# /users has the method GET that is used when you want to retrieve all the users that are in the database. Not sure if we actually need it. Written by Jakob, Gustav, Joel & Fredrik


@app.route('/users', methods=['GET'])
def list_users():
    user_list = []
    all_users = User.query.all()
    for user in all_users:
        user_list.append(user.serialize())
    return jsonify(user_list)


# /ad/<int:ad_id> has the method PUT, GET. The method PUT .....
@app.route('/ad/<int:ad_id>', methods=['PUT', 'GET'])
def list_ad(ad_id):
    if request.method == 'GET':
        return jsonify(Ad.query.get_or_404(ad_id).serialize())
    elif request.method == 'PUT':
        return "NYI"


# /ads has the method GET, it is used to retrieve all the ads that is stored in the database. Written by Jakob, Gustav, Joel & Fredrik
@app.route('/ads', methods=['GET'])
def ads():
    if request.method == 'GET':
        ad_list = []
        all_ads = Ad.query.all()
        for ad in all_ads:
            ad_list.append(ad.serialize())
        return jsonify(ad_list)


# /ad/create has the method POST, it is used to make an ad that is connected to the specifik user that created it. Written by Jakob, Gustav, Joel & Fredrik
@app.route('/ad/create', methods=['POST'])
@jwt_required()
def create_ad():
    if request.method == 'POST':
        current_user_id = get_jwt_identity()
        newad = request.get_json(force=True)
        newadDB = Ad(adress=newad.get('adress'), description=newad.get(
            'description'), user_id=(current_user_id))
        db.session.add(newadDB)
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
