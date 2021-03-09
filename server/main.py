from flask import Flask
from flask_sqlalchemy import SQLAlchemy


dbConnection = "mysql+pymysql://{}:{}@{}/{}".format(
    'client', 'tddd83', '83.249.161.212', 'unihome')

app = Flask(__name__, static_folder='../client', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = dbConnection
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'LuSg31rsf76nGvMVjzeqV1R0vchtnxu6XTrhrOSLtek'
db = SQLAlchemy(app)


@app.route('/')
def default():

    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run(debug=True)
