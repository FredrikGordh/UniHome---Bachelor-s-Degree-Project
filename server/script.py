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

user5 = User(name="Fredrik", email="fredrik@google.com",
             telephone="114 14", gender="male", birthdate=datetime.date(2000, 1, 1))
User.set_password(user5, "fredrik")
db.session.add(user5)
db.session.commit()

ad1 = Ad(title="Mysigt studentboende", description="En mindre 2:a med kök som fungerar perfekt som studentboende. Boendet ligger i stadsdelen Valla emellan campus Valla och centrum. Minst 2 nätter sammanhängande och uthyres endast till rök- och djurfria hyresgäster.",
         neighbourhood="Valla", studentcity="Linköping",
         streetaddress="Vallavägen", streetnumber="4", city="Linköping", postalcode="512 15", country="Sverige", squaremetres="25",
         price="200", beds="1", accommodationtype="Lägenhet", host_id="1", startdate=datetime.date(2021, 1, 1), enddate=datetime.date(2021, 9, 9))
db.session.add(ad1)
db.session.commit()
attributes1 = Attributes(wifi=True, sauna=True, bike=True, ad_id=ad1.id)
db.session.add(attributes1)
db.session.commit()
image1 = Image(url = "Media/IMG_1710.JPG", ad_id = ad1.id)
db.session.add(image1)
db.session.commit()

ad2 = Ad(title="Centralt studentboende i innerstan", description="En 1:a med kök som ligger mitt i innerstan och nära till resecentrum. Lägenheten ligger nära barer, gym och matbutik. Uthyres till rökfria personer, längre uthyrningar prioriteras", neighbourhood="Vasastan", studentcity="Linköping",
         streetaddress="Drottninggatan", streetnumber="23", city="Linköping", postalcode="512 30", country="Sverige", squaremetres="27", price="450",
         beds="2", accommodationtype="Lägenhet", host_id="2", startdate=datetime.date(2000, 1, 1), enddate=datetime.date(2001, 1, 1))
db.session.add(ad2)
db.session.commit()
attributes2 = Attributes(wifi=True, sauna=True, dishwasher=True, ad_id=ad2.id)

db.session.add(attributes2)
db.session.commit()
image2 = Image(url = "Media/IMG_1710.JPG", ad_id = ad2.id)
db.session.add(image2)
db.session.commit()


ad3 = Ad(title="Nyproducerat och stort boende nära campus", description="Nyproducerat boende i den moderna stadsdelen Vallastaden som ligger nära campus Valla. Boendet passar att delas av flera studenter på grund av det stora utrymmet. Det finns även en trevlig uteplats för husets boendegäster. Uthyres endast till djurfria personer.", neighbourhood="Vallastaden", studentcity="Linköping",
         streetaddress="Vallastadsvägen", streetnumber="45B", city="Linköping", postalcode="511 34", country="Sverige", squaremetres="90", price="1120",
         beds="4", accommodationtype="Lägenhet", host_id="3", startdate=datetime.date(2000, 1, 1), enddate=datetime.date(2001, 1, 1))
db.session.add(ad3)
db.session.commit()
attributes3 = Attributes(wifi=True, ad_id=ad3.id)
db.session.add(attributes3)
db.session.commit()
image3 = Image(url = "Media/IMG_1710.JPG", ad_id = ad3.id)
db.session.add(image3)
db.session.commit()


ad4 = Ad(title="Fräsch 1:a nära campus Valla", description="Mysig 1:a med kök i den nybyggda stadsdelen Vallastaden ett stenkast från campus Valla. Mölighet till att hyra cykel finns. ", neighbourhood="Vallastaden", studentcity="Linköping",
         streetaddress="Vallastadsvägen", streetnumber="42C", city="Linköping", postalcode="511 34", country="Sverige", squaremetres="25", price="500",
         beds="4", accommodationtype="Lägenhet", host_id="4", startdate=datetime.date(2021, 1, 1), enddate=datetime.date(2021, 9, 10))
db.session.add(ad4)
db.session.commit()
attributes4 = Attributes(wifi=True, dishwasher=True, ad_id=ad4.id)
db.session.add(attributes4)
db.session.commit()
image4 = Image(url = "Media/IMG_1710.JPG", ad_id = ad4.id)
db.session.add(image4)
db.session.commit()


ad5 = Ad(title="2-våningshus i Vallastaden som passar som kollektiv", description="Rymligt 2-våningshus i stadsdelen Vallastaden, som passar utmärkt för ett kollektiv av 4 eller 5 studenter. På taket finns även en trevlig uteplats med sol under hela dagen, utemöbler och grill", neighbourhood="Vallastaden", studentcity="Linköping",
         streetaddress="Poesigränd", streetnumber="12A", city="Linköping", postalcode="511 35", country="Sverige", squaremetres="155", price="1500",
         beds="4", accommodationtype="Lägenhet", host_id="2", startdate=datetime.date(2021, 1, 1), enddate=datetime.date(2021, 9, 10))
db.session.add(ad5)
db.session.commit()
attributes5 = Attributes(wifi=True, dishwasher=True, washingmachine=True, ad_id=ad5.id)
db.session.add(attributes5)
db.session.commit()
image5 = Image(url = "Media/IMG_1710.JPG", ad_id = ad5.id)
db.session.add(image5)
db.session.commit()


ad6 = Ad(title="Större takvåning med utsikt i Vallastaden", description="Rymlig takvåning med 4 rum och kök på 5:e våningen med vacker utsikt i Vallastaden. Lägenheten har även en mysig balkong som passar perfekt för sommar- och vårkvällar. Uthyres till rök- och djurfria hyresgäster", neighbourhood="Vallastaden", studentcity="Linköping",
         streetaddress="Musikgränd", streetnumber="20A", city="Linköping", postalcode="511 35", country="Sverige", squaremetres="110", price="1050",
         beds="4", accommodationtype="Lägenhet", host_id="3", startdate=datetime.date(2021, 1, 1), enddate=datetime.date(2021, 9, 10))
db.session.add(ad6)
db.session.commit()
attributes6 = Attributes(wifi=True, sauna=True, dishwasher=True, washingmachine=True, ad_id=ad6.id)
db.session.add(attributes6)
db.session.commit()
image6 = Image(url = "Media/IMG_1710.JPG", ad_id = ad6.id)
db.session.add(image6)
db.session.commit()


ad7 = Ad(title="Rymlig 3:a i Vallastaden", description="Gemytlig 3:a uthyres under helger i Vallastaden. Uthyres till besökande studenter under vårens festhelger. Uthyres endast till rökfria och djurfria hyresgäster.  ", neighbourhood="Vallastaden", studentcity="Linköping",
         streetaddress="Hugo Thorells Gata", streetnumber="22A", city="Linköping", postalcode="511 36", country="Sverige", squaremetres="65", price="600",
         beds="4", accommodationtype="Lägenhet", host_id="4", startdate=datetime.date(2021, 1, 1), enddate=datetime.date(2021, 9, 10))
db.session.add(ad7)
db.session.commit()
attributes7 = Attributes(wifi=True, sauna=True, dishwasher=True, washingmachine=True, ad_id=ad7.id)
db.session.add(attributes7)
db.session.commit()
image7 = Image(url = "Media/IMG_1710.JPG", ad_id = ad7.id)
db.session.add(image7)
db.session.commit()




print("You have now cleared everything that was in the database and created 5 users and 7 ads")
