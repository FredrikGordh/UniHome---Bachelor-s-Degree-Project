from main import db
from main import User
from main import Date
from main import Ad
from main import Attributes

#To be able to run this script, you must be in (venv) and write python3 script.py in the terminal.

db.drop_all()
db.create_all()

user1 = User(name="jakob", email="jakob@google.com", telephone="0700222144", gender = "male")
User.set_password(user1, "jakob")
db.session.add(user1)
db.session.commit()
birthdateuser1 = Date(year="1998", month="2", day="16", user_id=user1.id)
db.session.add(birthdateuser1)
db.session.commit()

user2 = User(name="albin", email="albin@google.com", telephone="0152-15215", gender = "male")
User.set_password(user2, "albin")
db.session.add(user2)
db.session.commit()
birthdateuser2 = Date(year="1998", month="4", day="21", user_id=user2.id)
db.session.add(birthdateuser2)
db.session.commit()

user3 = User(name="ines", email="ines@google.com", telephone="112", gender = "female")
User.set_password(user3, "ines")
db.session.add(user3)
db.session.commit()
birthdateuser3 = Date(year="1998", month="1", day="3", user_id=user3.id)
db.session.add(birthdateuser3)
db.session.commit()

user4 = User(name="emeli", email="emeli@google.com", telephone="114 14", gender = "female")
User.set_password(user4, "emeli")
db.session.add(user4)
db.session.commit()
birthdateuser4 = Date(year="1996", month="12", day="11", user_id=user4.id)
db.session.add(birthdateuser4)
db.session.commit()

ad1 = Ad(title="Mysigt studentboende", description="mys mys mys ultra mys", neighbourhood="Valla", studentcity="Linköping", 
streetaddress="Vallavägen", streetnumber ="4", city="Linköping", postalcode="512 15", country ="Sverige", squaremetres="25", 
price="200", beds="1", accommodationtype="Lägenhet", host_id="1")
db.session.add(ad1)
db.session.commit()
startad1 = Date(year="2021", month="06", day="10", start_ad_id=ad1.id)
endad1 = Date(year="2021", month="06", day="12", end_ad_id=ad1.id)
attributes1 = Attributes(wifi=True, sauna=True, bike=True, ad_id=ad1.id)
db.session.add(startad1)
db.session.add(endad1)
db.session.add(attributes1)
db.session.commit()

ad2 = Ad(title="Läskigt studentboende mitt i smeten", description="Lääääääskigt", neighbourhood="Vasastan", studentcity="Linköping", 
streetaddress="Drottninggatan", streetnumber ="23", city="Linköping", postalcode="512 30", country ="Sverige", squaremetres="45", price="450", 
beds="2", accommodationtype="Lägenhet", host_id="3")
db.session.add(ad2)
db.session.commit()
startad2 = Date(year="2021", month="05", day="9", start_ad_id=ad2.id)
endad2 = Date(year="2021", month="05", day="14", end_ad_id=ad2.id)
attributes2 = Attributes(wifi=True, sauna=True, dishwasher=True, ad_id=ad2.id)
db.session.add(startad2)
db.session.add(endad2)
db.session.add(attributes2)
db.session.commit()

ad3 = Ad(title="Stort boende nära campus", description="Big big big!!!", neighbourhood="Vallastaden", studentcity="Linköping", 
streetaddress="Vallastadsvägen", streetnumber ="45B", city="Linköping", postalcode="511 34", country ="Sverige", squaremetres="90", price="1120", 
beds="4", accommodationtype="Lägenhet", host_id="4")
db.session.add(ad3)
db.session.commit()
startad3 = Date(year="2021", month="06", day="10", start_ad_id=ad3.id)
endad3 = Date(year="2021", month="06", day="12", end_ad_id=ad3.id)
attributes3 = Attributes(wifi=True, sauna=True, dishwasher=True, washingmachine=True, ad_id=ad3.id)
db.session.add(startad3)
db.session.add(endad3)
db.session.add(attributes3)
db.session.commit()



print("You have now cleared everything that was in the database and created 4 users and 3 ads")

