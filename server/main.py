from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask import request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (JWTManager, create_access_token, jwt_required, get_jwt_identity)

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'LuSg31rsf76nGvMVjzeqV1R0vchtnxu6XTrhrOSLtek'
jwt = JWTManager(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

########################### CLASSES ###########################

#The class user contains all information about the user. Written by Jakob, Gustav, Joel & Fredrik
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    # age, gender, tel_no, utbildning, verified_student
    is_admin = db.Column(db.Boolean, default=False, nullable = False) 
    password_hash = db.Column(db.String, nullable = False)

    def __repr__(self):
        return '<user {} {} {} {}>'.format(self.id, self.name, self.email, self.is_admin)
    def serialize(self):
        return dict(id=self.id, name=self.name, email=self.email, is_admin=self.is_admin) #har lagt till is_admin

    def set_password(self,password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf8')

    def set_admin(self):
        self.is_admin = True


#The class ad containts all the information about the ads. A ad is owned by a user. Written by Jakob, Gustav, Joel & Fredrik
class Ad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    adress = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
   # features = db.Column(db.String, nullable=False)
   # Dishwasher, wifi, square_meter, No. of beds, price/night, pet, distance_to_campus, sauna, shared, type, city, street, neighborhood, postal_code, available_date_start, available_date_finish, student_city
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)

    def __repr__(self):
        return '<Ad {}: {} {}>'.format(self.id, self.adress, self.description)
    def serialize(self):
            return dict(id=self.id, adress=self.adress, description=self.description, user = User.query.get(self.user_id).serialize())

########################### APP.ROUTES ###########################

#/user/signup has the method POST that is used when you want to create a new user on the website. Written by Jakob, Gustav, Joel & Fredrik
@app.route('/user/signup', methods = ['POST'])
def signup():
    newuser = request.get_json(force=True)
    newuserDB = User(name=newuser.get('name'), email=newuser.get('email'))
    User.set_password(newuserDB,newuser.get('password'))
    if(newuser.get('is_admin') == "True"):
        User.set_admin(newuserDB)
    
    db.session.add(newuserDB)
    db.session.commit()
    return "Success", 200

#/user/login has the method POST that is used when you want to log in with a user. Written by Jakob, Gustav, Joel & Fredrik
@app.route('/user/login', methods = ['POST'])
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

#/users has the method GET that is used when you want to retrieve all the users that are in the database. Not sure if we actually need it. Written by Jakob, Gustav, Joel & Fredrik
@app.route('/users', methods = ['GET'])
def list_users():
    user_list = []
    all_users = User.query.all()
    for user in all_users:
      user_list.append(user.serialize())
    return jsonify(user_list)


#/ad/<int:ad_id> has the method PUT, GET. The method PUT .....
@app.route('/ad/<int:ad_id>', methods = ['PUT', 'GET'])
def list_ad(ad_id):
    if request.method == 'GET':
        return jsonify(Ad.query.get_or_404(ad_id).serialize())
    elif request.method == 'PUT':
        return "NYI"
        

#/ads has the method GET, it is used to retrieve all the ads that is stored in the database. Written by Jakob, Gustav, Joel & Fredrik
@app.route('/ads', methods = ['GET'])
def ads():
    if request.method == 'GET':
        ad_list = []
        all_ads = Ad.query.all()
        for ad in all_ads:
            ad_list.append(ad.serialize())
        return jsonify(ad_list)


#/ad/create has the method POST, it is used to make an ad that is connected to the specifik user that created it. Written by Jakob, Gustav, Joel & Fredrik
@app.route('/ad/create', methods = ['POST'])
@jwt_required()
def create_ad():
    if request.method == 'POST':
            current_user_id = get_jwt_identity()
            newad = request.get_json(force=True)
            newadDB = Ad(adress=newad.get('adress'), description=newad.get('description'), user_id=(current_user_id))
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
