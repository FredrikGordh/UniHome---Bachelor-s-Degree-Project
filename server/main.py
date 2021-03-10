from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from flask import request
from flask_bcrypt import Bcrypt

dbConnection = "mysql+pymysql://{}:{}@{}/{}".format(
    'client', 'tddd83', '83.249.161.212', 'unihome')

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'LuSg31rsf76nGvMVjzeqV1R0vchtnxu6XTrhrOSLtek'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable = False) 
    password_hash = db.Column(db.String, nullable = False)


    def __repr__(self):
        return '<user {}: {} {}>'.format(self.id, self.name, self.email, self.is_admin)
    def serialize(self):
        return dict(id=self.id, name=self.name, email=self.email, is_admin=self.is_admin) #har lagt till is_admin

    def set_password(self,password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf8')

    def set_admin(self):
        self.is_admin = True

class Ad(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    adress = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
  #  features = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = True)

    def __repr__(self):
        return '<Ad {}: {} {}>'.format(self.id, self.adress, self.description)
    def serialize(self):
            return dict(id=self.id, adress=self.adress, description=self.description, user = User.query.get(self.user_id).serialize())


# Användare 
# Bli värd 
# Användaruppgifter 
# Användarnamn -
# Epost -
# Lösenord - 
# Profilbeskrivning 
# Profilbild? 
# Bli medlem 
# Användaruppgifter 
# Användarnamn 
# Epost 
# Lösenord 
# Profilbeskrivning 
# Profilbild? 
# Logga in/ut 
# Glömt lösenord 
# Ändra lösenord 
# Redigera användare 
# Användaruppgifter 
# Användarnamn 
# Epost 
# Lösenord 
# Profilbeskrivning 
# Profilbild? 

# Annonser 
# Lägga upp annons 
# Beskrivning 
# Bilder 
# Plats 
# Redigera annons 
# Beskrivning 
# Bilder 
# Plats 
# Sökning av annons 
# Plats 
# Adress 
# Stad 
# Område 
# Specifika attribut 
# Storlek på lägenhet/rum 
# Funktioner 

@app.route('/')
def default():
    return "WEEEEEEE"

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

@app.route('/users')
def list_users():
    user_list = []
    all_users = User.query.all()
    for user in all_users:
      user_list.append(user.serialize())
    return jsonify(user_list)

if __name__ == "__main__":
    app.run(debug=True)
