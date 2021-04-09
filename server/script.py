from main import db
from main import User
from main import Ad
from main import Attributes
import datetime

# To be able to run this script, you must be in (venv) and write python3 script.py in the terminal.

db.drop_all()
db.create_all()

user1 = User(name="jakob", email="jakob@google.com",
             telephone="0700222144", gender="male", birthdate=datetime.date(2000, 1, 1))
User.set_password(user1, "jakob")
db.session.add(user1)
db.session.commit()

user2 = User(name="albin", email="albin@google.com",
             telephone="0152-15215", gender="male", birthdate=datetime.date(2000, 1, 1))
User.set_password(user2, "albin")
db.session.add(user2)
db.session.commit()

user3 = User(name="ines", email="ines@google.com",
             telephone="112", gender="female", birthdate=datetime.date(2000, 1, 1))
User.set_password(user3, "ines")
db.session.add(user3)
db.session.commit()

user4 = User(name="emeli", email="emeli@google.com",
             telephone="114 14", gender="female", birthdate=datetime.date(2000, 1, 1))
User.set_password(user4, "emeli")
db.session.add(user4)
db.session.commit()

user5 = User(name="fredrik", email="fredrik@google.com",
             telephone="114 14", gender="male", birthdate=datetime.date(2000, 1, 1))
User.set_password(user5, "fredrik")
db.session.add(user5)
db.session.commit()


ad2 = Ad(title="Läskigt studentboende mitt i smeten", description="Lääääääskigt", neighbourhood="Vasastan", studentcity="Linköping",
         streetaddress="Drottninggatan", streetnumber="23", city="Linköping", postalcode="512 30", country="Sverige", squaremetres="45", price="450",
         beds="2", accommodationtype="Lägenhet", host_id="3", startdate=datetime.date(2000, 1, 1), enddate=datetime.date(2001, 1, 1))
db.session.add(ad2)
db.session.commit()
attributes2 = Attributes(wifi=True, sauna=True, dishwasher=True, ad_id=ad2.id)

db.session.add(attributes2)
db.session.commit()

ad3 = Ad(title="Stort boende nära campus", description="Big big big!!!", neighbourhood="Vallastaden", studentcity="Linköping",
         streetaddress="Vallastadsvägen", streetnumber="45B", city="Linköping", postalcode="511 34", country="Sverige", squaremetres="90", price="1120",
         beds="4", accommodationtype="Lägenhet", host_id="4", startdate=datetime.date(2000, 1, 1), enddate=datetime.date(2001, 1, 1))
db.session.add(ad3)
db.session.commit()
attributes3 = Attributes(wifi=True, sauna=True,
                         dishwasher=True, washingmachine=True, ad_id=ad3.id)
db.session.add(attributes3)
db.session.commit()

ad4 = Ad(title="Litet jäkla hus", description="nope", neighbourhood="Vallastaden", studentcity="Linköping",
         streetaddress="Vallastadsvägen", streetnumber="42C", city="Linköping", postalcode="511 34", country="Sverige", squaremetres="25", price="500",
         beds="4", accommodationtype="Lägenhet", host_id="4", startdate=datetime.date(2021, 1, 1), enddate=datetime.date(2021, 9, 10))
db.session.add(ad4)
db.session.commit()
attributes4 = Attributes(wifi=True, sauna=True,
                         dishwasher=True, washingmachine=True, ad_id=ad4.id)
db.session.add(attributes4)
db.session.commit()


print("You have now cleared everything that was in the database and created 5 users and 4 ads")
