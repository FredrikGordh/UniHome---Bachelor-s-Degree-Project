from main import db
from main import User
from main import Ad
from main import Attributes
import datetime

# To be able to run this script, you must be in (venv) and write python3 script.py in the terminal.

db.drop_all()
db.create_all()

user1 = User(name="Jakob Fogelberg", email="jakob@google.com",
             telephone="0700222144", gender="Man", birthdate=datetime.date(2000, 1, 1))
User.set_password(user1, "jakob")
db.session.add(user1)
db.session.commit()

user2 = User(name="Albin Janzén", email="albin@google.com",
             telephone="0152-15215", gender="Man", birthdate=datetime.date(2000, 1, 1))
User.set_password(user2, "albin")
db.session.add(user2)
db.session.commit()

user3 = User(name="Ines Diezengremel", email="ines@google.com",
             telephone="112", gender="Kvinna", birthdate=datetime.date(2000, 1, 1))
User.set_password(user3, "ines")
db.session.add(user3)
db.session.commit()

user4 = User(name="Emeli Anjel Lachas", email="emeli@google.com",
             telephone="114 14", gender="Kvinna", birthdate=datetime.date(2000, 1, 1))
User.set_password(user4, "emeli")
db.session.add(user4)
db.session.commit()

user5 = User(name="Fredrik Gordh", email="fredrik@google.com",
             telephone="114 14", gender="Man", birthdate=datetime.date(2000, 1, 1))
User.set_password(user5, "fredrik")
db.session.add(user5)
db.session.commit()

user6 = User(name="Joel Einarsson", email="joel@google.com",
             telephone="114 14", gender="Man", birthdate=datetime.date(2000, 1, 1))
User.set_password(user6, "joel")
db.session.add(user6)
db.session.commit()

user7 = User(name="Gustav Berling", email="gustav@google.com",
             telephone="114 14", gender="Man", birthdate=datetime.date(2000, 1, 1))
User.set_password(user7, "gustav")
db.session.add(user7)
db.session.commit()

ad1 = Ad(title="Trevligt boende", description="En mindre 2:a med kök som fungerar perfekt som studentboende. Boendet ligger i stadsdelen Gottfridsberg, nära till både studentpub Flamman och till den fina stadskärnan. Minst 2 nätter sammanhängande och uthyres endast till rök- och djurfria hyresgäster.",
         neighbourhood="Gottfridsberg", studentcity="Linköping",
         streetaddress="Skolgatan", streetnumber="23", city="Linköping", postalcode="512 15", country="Sverige", squaremetres="47",
         price="1300", beds="1", accommodationtype="Lägenhet", host_id="5", startdate=datetime.date(2021, 4, 20), enddate=datetime.date(2021, 4, 25))
db.session.add(ad1)
db.session.commit()
attributes1 = Attributes(wifi=True, sauna=True, bike=True, ad_id=ad1.id)
db.session.add(attributes1)
db.session.commit()
image1 = Image(url = "Media/fredrik.jpg", ad_id = ad1.id)
db.session.add(image1)
db.session.commit()

ad2 = Ad(title="Centralt studentboende i Irrblosset", description="En 1:a med kök som ligger mitt i fina Valla och nära Campus Valla. Lägenheten ligger nära en studentbar, gym och matbutik. Uthyres till rökfria personer, längre uthyrningar prioriteras.", neighbourhood="Valla", studentcity="Linköping",
         streetaddress="Vallavägen", streetnumber="4D", city="Linköping", postalcode="512 15", country="Sverige", squaremetres="27", price="450",
         beds="2", accommodationtype="Lägenhet", host_id="1", startdate=datetime.date(2021, 4, 22), enddate=datetime.date(2021, 4, 25))
db.session.add(ad2)
db.session.commit()
attributes2 = Attributes(wifi=True, sauna=True, dishwasher=True, ad_id=ad2.id)

db.session.add(attributes2)
db.session.commit()
image2 = Image(url = "Media/jakob.jpg", ad_id = ad2.id)
db.session.add(image2)
db.session.commit()


ad3 = Ad(title="Liten och mysig student-etta", description="Nyrenoverad lägenhet, omgjord från korridorsrum i Ryd som ligger nära campus Valla. Det finns även en trevlig uteplats för husets boendegäster. Uthyres endast till djurfria personer.", neighbourhood="Ryd", studentcity="Linköping",
         streetaddress="Rydsvägen", streetnumber="258C", city="Linköping", postalcode="511 34", country="Sverige", squaremetres="20", price="150",
         beds="1", accommodationtype="Lägenhet", host_id="1", startdate=datetime.date(2021, 4, 21), enddate=datetime.date(2021, 4, 21))
db.session.add(ad3)
db.session.commit()
attributes3 = Attributes(wifi=True, ad_id=ad3.id)
db.session.add(attributes3)
db.session.commit()
image3 = Image(url = "Media/jakob2.jpeg", ad_id = ad3.id)
db.session.add(image3)
db.session.commit()


ad4 = Ad(title="Fräsch 1:a nära campus Valla", description="Mysig 1:a med kök nära Ebbepark, ett stenkast från campus Valla. Mölighet till att hyra cykel finns. ", neighbourhood="Valla", studentcity="Linköping",
         streetaddress="Vallavägen", streetnumber="2c", city="Linköping", postalcode="511 34", country="Sverige", squaremetres="27", price="500",
         beds="1", accommodationtype="Lägenhet", host_id="2", startdate=datetime.date(2021, 4, 22), enddate=datetime.date(2021, 4, 26))
db.session.add(ad4)
db.session.commit()
attributes4 = Attributes(wifi=True, dishwasher=True, ad_id=ad4.id)
db.session.add(attributes4)
db.session.commit()
image4 = Image(url = "Media/albin2.jpg", ad_id = ad4.id)
db.session.add(image4)
db.session.commit()


ad5 = Ad(title="Lägenhet med fin utsikt mitt i stan", description="Rymliga lägenhet i stadsdelen Vasastan, som passar utmärkt för ett par om två personer. På taket finns även en trevlig uteplats med sol under hela dagen, utemöbler och grill", neighbourhood="Vasastan", studentcity="Linköping",
         streetaddress="Drottninggatan", streetnumber="37", city="Linköping", postalcode="511 35", country="Sverige", squaremetres="45", price="1100",
         beds="2", accommodationtype="Lägenhet", host_id="4", startdate=datetime.date(2021, 4, 20), enddate=datetime.date(2021, 4, 30))
db.session.add(ad5)
db.session.commit()
attributes5 = Attributes(wifi=True, dishwasher=True, washingmachine=True, ad_id=ad5.id)
db.session.add(attributes5)
db.session.commit()
image5 = Image(url = "Media/emeli.jpg", ad_id = ad5.id)
db.session.add(image5)
db.session.commit()


ad6 = Ad(title="Större takvåning med utsikt i Vallastaden", description="Rymlig takvåning med 4 rum och kök på 5:e våningen med vacker utsikt i Vallastaden. Lägenheten har även en mysig balkong som passar perfekt för sommar- och vårkvällar. Uthyres till rök- och djurfria hyresgäster", neighbourhood="Vallastaden", studentcity="Linköping",
         streetaddress="Musikgränd", streetnumber="20A", city="Linköping", postalcode="511 35", country="Sverige", squaremetres="110", price="1050",
         beds="4", accommodationtype="Lägenhet", host_id="3", startdate=datetime.date(2021, 4, 19), enddate=datetime.date(2021, 9, 21))
db.session.add(ad6)
db.session.commit()
attributes6 = Attributes(wifi=True, sauna=True, dishwasher=True, washingmachine=True, ad_id=ad6.id)
db.session.add(attributes6)
db.session.commit()
image6 = Image(url = "Media/emeli2.jpg", ad_id = ad6.id)
db.session.add(image6)
db.session.commit()


ad7 = Ad(title="Liten 2:a i Irrblosset", description="Gemytlig 2:a uthyres under helger i Irrblosset. Uthyres till besökande studenter under vårens festhelger. Uthyres endast till rökfria och djurfria hyresgäster.  ", neighbourhood="Valla", studentcity="Linköping",
         streetaddress="Vallavägen", streetnumber="2D", city="Linköping", postalcode="511 36", country="Sverige", squaremetres="35", price="600",
         beds="2", accommodationtype="Lägenhet", host_id="2", startdate=datetime.date(2021, 4, 1), enddate=datetime.date(2021, 5, 30))
db.session.add(ad7)
db.session.commit()
attributes7 = Attributes(wifi=True, sauna=True, dishwasher=True, washingmachine=True, ad_id=ad7.id)
db.session.add(attributes7)
db.session.commit()
image7 = Image(url = "Media/albin.jpg", ad_id = ad7.id)
db.session.add(image7)
db.session.commit()

ad8 = Ad(title="Trevligt korridorsrum uthyres", description="Litet och trevligt korridorsrum som ligger i Ryd. Uthyres till någon lugn och skötsam, ingen fest tillåten. Uthyres endast till rökfria och djurfria hyresgäster.", neighbourhood="Ryd", studentcity="Linköping",
         streetaddress="Rydsvägen", streetnumber="248C", city="Linköping", postalcode="584 34", country="Sverige", squaremetres="20", price="400",
         beds="1", accommodationtype="Korridorsrum", host_id="2", startdate=datetime.date(2021, 4, 17), enddate=datetime.date(2021, 4, 18))
db.session.add(ad8)
db.session.commit()
attributes8 = Attributes(wifi=True, sauna=True, dishwasher=False, washingmachine=True, bike=True, ad_id=ad8.id)
db.session.add(attributes8)
db.session.commit()
image8 = Image(url = "Media/korridor1.jpg", ad_id = ad8.id)
db.session.add(image8)
db.session.commit()

ad9 = Ad(title="Litet korridorsrum", description="Litet och trevligt inrett korridorsrum som ligger i Ryd. Uthyres till någon lugn och skötsam, ingen fest tillåten. Uthyres endast till rökfria och djurfria hyresgäster.", neighbourhood="Ryd", studentcity="Linköping",
         streetaddress="Rydsvägen", streetnumber="258B", city="Linköping", postalcode="584 34", country="Sverige", squaremetres="20", price="500",
         beds="1", accommodationtype="Korridorsrum", host_id="2", startdate=datetime.date(2021, 4, 17), enddate=datetime.date(2021, 4, 18))
db.session.add(ad9)
db.session.commit()
attributes9 = Attributes(wifi=True, sauna=False, dishwasher=True, washingmachine=True, bike=False, ad_id=ad9.id)
db.session.add(attributes9)
db.session.commit()
image9 = Image(url = "Media/korridor2.jpg", ad_id = ad9.id)
db.session.add(image9)
db.session.commit()

ad10 = Ad(title="Korridorsrum med dubbelsäng", description="Ett korridorsrum i Ryd som har dubbelsäng, perfekt för ett par som är på besök över en festhelg. Uthyres endast till rökfria och djurfria hyresgäster.", neighbourhood="Ryd", studentcity="Linköping",
         streetaddress="Rydsvägen", streetnumber="240A", city="Linköping", postalcode="584 34", country="Sverige", squaremetres="20", price="550",
         beds="2", accommodationtype="Korridorsrum", host_id="2", startdate=datetime.date(2021, 4, 17), enddate=datetime.date(2021, 4, 18))
db.session.add(ad10)
db.session.commit()
attributes10 = Attributes(wifi=True, sauna=False, dishwasher=True, washingmachine=False, bike=True, ad_id=ad10.id)
db.session.add(attributes10)
db.session.commit()
image10 = Image(url = "Media/korridor3.jpg", ad_id = ad10.id)
db.session.add(image10)
db.session.commit()




print("You have now cleared everything that was in the database and created 7 users and 10 ads")
