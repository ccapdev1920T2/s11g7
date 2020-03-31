const database = require('./db.js')
const Admin = require('./Admin.js')
const Course = require('./Course.js')
const Student = require('./Student.js')

database.connect()

database.deleteMany(Admin, {})
database.deleteMany(Course, {})
database.deleteMany(Student, {})

database.insertOne(Admin, {
    "username": "admin",
    "password": "admin"
})

database.insertMany(Course, 
    [
        
    ]
)

database.insertMany(Student,
    [
        {"firstname":"Emilie","middlename":null,"lastname":"Truluck","address":"4 Sugar Place","birthdate":"09/08/1996","email":"etruluck0@usatoday.com","idnum":11857072,"password":"Na9slDq"},
        {"firstname":"Dirk","middlename":null,"lastname":"Gyer","address":"593 Hudson Plaza","birthdate":"04/04/1993","email":"dgyer1@skyrock.com","idnum":11583673,"password":"ls2qXomojuR"},
        {"firstname":"Arabel","middlename":null,"lastname":"Gillease","address":"388 Macpherson Drive","birthdate":"02/09/1995","email":"agillease2@china.com.cn","idnum":12004847,"password":"NKw6Dv"},
        {"firstname":"Kelli","middlename":"Waller","lastname":"Hazzard","address":"93429 Forest Dale Pass","birthdate":"02/23/1998","email":"khazzard3@freewebs.com","idnum":11906219,"password":"HjRUgj"},
        {"firstname":"Conan","middlename":null,"lastname":"Hofton","address":"3916 Gale Drive","birthdate":"01/04/2001","email":"chofton4@google.com","idnum":11358459,"password":"3dkn9zLvTY"},
        {"firstname":"Krista","middlename":"Pridham","lastname":"Jacqueme","address":"1348 Hintze Junction","birthdate":"10/29/1996","email":"kjacqueme5@dagondesign.com","idnum":11530375,"password":"LKcy3oUrk"},
        {"firstname":"Jessika","middlename":null,"lastname":"Connick","address":"819 Delaware Crossing","birthdate":"06/15/1992","email":"jconnick6@icq.com","idnum":11962003,"password":"t57HhP5hG9"},
        {"firstname":"Fayre","middlename":null,"lastname":"Sculley","address":"88 Menomonie Trail","birthdate":"01/07/1992","email":"fsculley7@icio.us","idnum":11067349,"password":"G0Urq98N"},
        {"firstname":"Kendell","middlename":null,"lastname":"Kidd","address":"19473 Westport Junction","birthdate":"12/19/1999","email":"kkidd8@booking.com","idnum":11047941,"password":"Cd7JHI"},
        {"firstname":"Daffi","middlename":"Luckhurst","lastname":"Murison","address":"411 Canary Point","birthdate":"01/19/1991","email":"dmurison9@bravesites.com","idnum":11109467,"password":"N0WPHnzfxqh4"},
        {"firstname":"Erminie","middlename":null,"lastname":"Fossord","address":"3 Aberg Center","birthdate":"12/06/2000","email":"efossorda@gravatar.com","idnum":11949481,"password":"cSVQmdCKE7"},
        {"firstname":"Cecil","middlename":null,"lastname":"Sandars","address":"6650 Grayhawk Lane","birthdate":"11/13/1997","email":"csandarsb@patch.com","idnum":11222630,"password":"P8pKOmMDh"},
        {"firstname":"Gerti","middlename":null,"lastname":"Burridge","address":"168 Erie Terrace","birthdate":"07/03/1992","email":"gburridgec@geocities.com","idnum":11183063,"password":"rIDE3J"},
        {"firstname":"Ashla","middlename":"Gisby","lastname":"Holbarrow","address":"99 Manley Road","birthdate":"02/03/1991","email":"aholbarrowd@comsenz.com","idnum":12034037,"password":"SzLxI4z9Igd"},
        {"firstname":"Ashton","middlename":"Storch","lastname":"Shinner","address":"464 Kropf Parkway","birthdate":"04/26/1991","email":"ashinnere@pen.io","idnum":11764441,"password":"dSty4NZxhn7f"},
        {"firstname":"Trevor","middlename":null,"lastname":"Cashman","address":"18 Charing Cross Circle","birthdate":"06/07/1998","email":"tcashmanf@goo.ne.jp","idnum":11816414,"password":"bqZuS5mJsdG"},
        {"firstname":"Tamma","middlename":null,"lastname":"Flippen","address":"6 Mcguire Pass","birthdate":"11/26/2000","email":"tflippeng@lulu.com","idnum":11293144,"password":"yBF1OE9UyU"},
        {"firstname":"Sayre","middlename":null,"lastname":"Hulles","address":"34664 Scott Court","birthdate":"02/19/1993","email":"shullesh@printfriendly.com","idnum":11272058,"password":"uhVvDE"},
        {"firstname":"Rebeca","middlename":null,"lastname":"Vassel","address":"007 Farwell Parkway","birthdate":"07/07/1998","email":"rvasseli@home.pl","idnum":11912596,"password":"AEtqCwO3Y"},
        {"firstname":"Robbyn","middlename":null,"lastname":"Piffe","address":"3 Stone Corner Trail","birthdate":"07/04/1992","email":"rpiffej@shutterfly.com","idnum":11785411,"password":"QdoHe24gi"},
        {"firstname":"Harrietta","middlename":null,"lastname":"Pagitt","address":"6265 Cherokee Parkway","birthdate":"10/06/1994","email":"hpagittk@hao123.com","idnum":11486686,"password":"Zid5bhQyAJjn"},
        {"firstname":"Isak","middlename":null,"lastname":"Norfolk","address":"06 Artisan Pass","birthdate":"01/14/2001","email":"inorfolkl@sciencedirect.com","idnum":11193417,"password":"nzadMIJ"},
        {"firstname":"Berta","middlename":null,"lastname":"Cumpton","address":"549 Continental Court","birthdate":"10/05/1991","email":"bcumptonm@a8.net","idnum":12032557,"password":"i6UIvcJD"},
        {"firstname":"Geri","middlename":null,"lastname":"Hamel","address":"30 1st Road","birthdate":"09/22/1993","email":"ghameln@biblegateway.com","idnum":11532680,"password":"b4nhcjwkVQ"},
        {"firstname":"Lorrie","middlename":null,"lastname":"Glandfield","address":"0 Moose Point","birthdate":"06/09/1992","email":"lglandfieldo@elpais.com","idnum":11831022,"password":"Wopr59zHtw"},
        {"firstname":"Charita","middlename":null,"lastname":"Fronczak","address":"09 1st Terrace","birthdate":"01/11/1997","email":"cfronczakp@upenn.edu","idnum":11333219,"password":"AN0PXesngY"},
        {"firstname":"Lyle","middlename":null,"lastname":"Gossage","address":"3 Thierer Plaza","birthdate":"03/05/1997","email":"lgossageq@canalblog.com","idnum":11764252,"password":"uxs5r6Jb38X"},
        {"firstname":"Jordon","middlename":null,"lastname":"Stoile","address":"24 Vernon Drive","birthdate":"01/29/1992","email":"jstoiler@livejournal.com","idnum":11793716,"password":"Q9X1Hfycq"},
        {"firstname":"Alex","middlename":null,"lastname":"Fearnill","address":"132 Eagle Crest Street","birthdate":"02/17/1990","email":"afearnills@cocolog-nifty.com","idnum":11954043,"password":"k2etHi9rIrHR"},
        {"firstname":"Jorge","middlename":"Sinclair","lastname":"Fullerlove","address":"9 Bartelt Plaza","birthdate":"08/07/1997","email":"jfullerlovet@lulu.com","idnum":11170010,"password":"wLnwKtpKvE"},
        {"firstname":"Amalia","middlename":null,"lastname":"Spehr","address":"570 Evergreen Lane","birthdate":"08/24/2000","email":"aspehru@issuu.com","idnum":11911948,"password":"Eaad5t7h"},
        {"firstname":"Victor","middlename":"Gilston","lastname":"De Laspee","address":"5 Center Court","birthdate":"12/27/1994","email":"vdelaspeev@networksolutions.com","idnum":11468998,"password":"bYRNzn45S"},
        {"firstname":"Waylan","middlename":null,"lastname":"Woodyear","address":"7 Hooker Lane","birthdate":"12/09/1998","email":"wwoodyearw@sciencedaily.com","idnum":11086211,"password":"HwnzNWl"},
        {"firstname":"Sonia","middlename":null,"lastname":"Compford","address":"454 Pond Road","birthdate":"03/04/1990","email":"scompfordx@google.co.jp","idnum":12021930,"password":"Gz8Ta2uK0Lj6"},
        {"firstname":"Magdalene","middlename":"Niblett","lastname":"Hoppner","address":"795 Hoard Crossing","birthdate":"03/27/1992","email":"mhoppnery@paypal.com","idnum":11557141,"password":"29Bnzt"},
        {"firstname":"Karee","middlename":"Abotson","lastname":"Ziehm","address":"206 Hintze Street","birthdate":"05/02/1995","email":"kziehmz@behance.net","idnum":11048891,"password":"2Mq2AAaB"},
        {"firstname":"Berkeley","middlename":null,"lastname":"Sympson","address":"34208 Clarendon Trail","birthdate":"05/02/1996","email":"bsympson10@java.com","idnum":11765003,"password":"b2qGDpZDlw"},
        {"firstname":"Andrei","middlename":null,"lastname":"Blown","address":"573 East Court","birthdate":"06/18/1996","email":"ablown11@geocities.jp","idnum":11025166,"password":"MVRR2Yp"},
        {"firstname":"Carter","middlename":null,"lastname":"Campling","address":"777 Jackson Park","birthdate":"04/12/1994","email":"ccampling12@comcast.net","idnum":11748265,"password":"sT5Jr3wi"},
        {"firstname":"Betta","middlename":null,"lastname":"Jumont","address":"27 Blue Bill Park Junction","birthdate":"10/08/2000","email":"bjumont13@mapquest.com","idnum":11359463,"password":"c7gKNP8AXd"},
        {"firstname":"Bank","middlename":null,"lastname":"Texton","address":"206 Brown Junction","birthdate":"07/15/1996","email":"btexton14@dropbox.com","idnum":11963956,"password":"pIvIBeTEvWf"},
        {"firstname":"Brandise","middlename":null,"lastname":"Vasyuchov","address":"18956 5th Terrace","birthdate":"10/16/1992","email":"bvasyuchov15@buzzfeed.com","idnum":11678763,"password":"Svm9RetLy4m"},
        {"firstname":"Hunter","middlename":null,"lastname":"Taudevin","address":"52082 Sunbrook Point","birthdate":"07/17/1990","email":"htaudevin16@apache.org","idnum":11029277,"password":"oCw0rq4V"},
        {"firstname":"Kaitlynn","middlename":"Como","lastname":"Hardacre","address":"09143 Nevada Point","birthdate":"09/17/1993","email":"khardacre17@europa.eu","idnum":11775548,"password":"0WoUKN2w"},
        {"firstname":"Gayle","middlename":"Bonwick","lastname":"Mahedy","address":"3347 Bartillon Court","birthdate":"03/14/1994","email":"gmahedy18@odnoklassniki.ru","idnum":11133597,"password":"MZqTEZDaeC"},
        {"firstname":"Natal","middlename":null,"lastname":"Pimerick","address":"493 Anderson Park","birthdate":"11/30/1992","email":"npimerick19@google.it","idnum":11376813,"password":"iNYouNHzdo"},
        {"firstname":"Seymour","middlename":null,"lastname":"Caldes","address":"410 Bowman Plaza","birthdate":"07/01/2001","email":"scaldes1a@gnu.org","idnum":11242299,"password":"bTXJltc"},
        {"firstname":"Artus","middlename":null,"lastname":"Eastcott","address":"6 Canary Pass","birthdate":"10/15/1996","email":"aeastcott1b@stumbleupon.com","idnum":11464399,"password":"HlUZplh"},
        {"firstname":"Chaddie","middlename":"Pigney","lastname":"Stranks","address":"807 Texas Point","birthdate":"02/11/1995","email":"cstranks1c@slashdot.org","idnum":11617047,"password":"J0jG7xqGnd"},
        {"firstname":"Essy","middlename":null,"lastname":"Dilrew","address":"91 Hayes Street","birthdate":"04/05/1997","email":"edilrew1d@cloudflare.com","idnum":11251409,"password":"dVlNkFhv"}
    ]
)