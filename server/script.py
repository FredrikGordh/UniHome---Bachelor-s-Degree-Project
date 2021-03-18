from main import db
from main import User
from main import Date

#To be able to run this script, you must write python3 script.py in the terminal.

db.drop_all()
db.create_all()

user1 = User(name="jakob", email="jakob@google.com", telephone="0700222144", gender = "male")
User.set_password(user1, "jakob")
db.session.add(user1)
db.session.commit()
birthdateuser1 = Date(year="1998", month="02", day="16", user_id=user1.id)
db.session.add(birthdateuser1)
db.session.commit()

user2 = User(name="albin", email="albin@google.com", telephone="0152-15215", gender = "male")
User.set_password(user2, "albin")
db.session.add(user2)
db.session.commit()
birthdateuser2 = Date(year="1998", month="04", day="21", user_id=user2.id)
db.session.add(birthdateuser2)
db.session.commit()

user3 = User(name="ines", email="ines@google.com", telephone="112", gender = "female")
User.set_password(user3, "ines")
db.session.add(user3)
db.session.commit()
birthdateuser3 = Date(year="1998", month="01", day="03", user_id=user3.id)
db.session.add(birthdateuser3)
db.session.commit()

user4 = User(name="emeli", email="emeli@google.com", telephone="114 14", gender = "female")
User.set_password(user4, "emeli")
db.session.add(user4)
db.session.commit()
birthdateuser4 = Date(year="1996", month="12", day="11", user_id=user4.id)
db.session.add(birthdateuser4)
db.session.commit()



