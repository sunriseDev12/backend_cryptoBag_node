const express = require('express');
const cors = require('cors');
const app = express();
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');
var url = "mongodb+srv://mynthraapp:8AQdwAhFODo0oSLm@myntraapp.viemi.mongodb.net/myntra";
app.use(cors());
const bcrypt = require('bcrypt');
// const multer = require('multer');
const saltRounds = 10;
app.use(bodyParser.json());



//register
app.post('/register', (req, res) => {

    console.log("Backend register adding", req.body);

    MongoClient.connect(url, function (err, db) {

        if (err) throw err;

        var dbo = db.db("cryptoBag");

        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var setpasswords = req.body.passwords;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(setpasswords, salt);


        // console.log("name", products_name)
        var myobj = {
            fname: fname,
            lname: lname,
            email: email,
            passwords: hash

        }

        dbo.collection("user").insertOne(myobj, function (err, result) {

            if (err) throw err;
            return res.status(200).json({

                status: true,
                description: result
            })

        }
        )
    })
})

//address purchase
app.post('/purchase', (req, res) => {

    console.log("purchase adding", req.body);

    MongoClient.connect(url, function (err, db) {

        if (err) throw err;

        var dbo = db.db("cryptoBag");

        var customer = req.body.customer;
        var product = req.body.product;
        var address = req.body.address;
        var pricechoose = req.body.pricechoose;
        var tokenchoose = req.body.tokenchoose;
        
       

        // console.log("name", products_name)
        var myobj = {
            customer_detail:customer,
            Product_detail:product,
            address:address,
            pricechoose: pricechoose,
            tokenchoose: tokenchoose,
        

        }

        dbo.collection("purchase").insertOne(myobj, function (err, result) {

            if (err) throw err;
            return res.status(200).json({

                status: true,
                description: result
            })

        }
        )
    })
})

//cart size
app.post('/cartSize', (req, res) => {

    console.log("size  adding", req.body);

    MongoClient.connect(url, function (err, db) {

        if (err) throw err;

        var dbo = db.db("cryptoBag");

        var id = req.body._id;
        var sizes = req.body.size;
     
        
       

        // console.log("name", products_name)
        var myobj = {
            customer:id,
            size:sizes
            
        

        }

        dbo.collection("sizes").insertOne(myobj, function (err, result) {

            if (err) throw err;
            return res.status(200).json({

                status: true,
                description: result
            })

        }
        )
    })
})



//address
app.post('/address', (req, res) => {

    console.log("address adding", req.body);

    MongoClient.connect(url, function (err, db) {

        if (err) throw err;

        var dbo = db.db("cryptoBag");

        

        var fname = req.body.fname;
        var lname = req.body.lname;
        var mail = req.body.mail;
        var phone = req.body.phone;
        var company = req.body.company;
        var address = req.body.address;
        var apartment = req.body.apartment;
        var city = req.body.city;
        var country = req.body.country;
        var state = req.body.state;
        var country = req.body.country;
        var pincode = req.body.pincode;
        var user = req.body.user;
        // var setpasswords = req.body.passwords;
        // const salt = bcrypt.genSaltSync(saltRounds);
        // const hash = bcrypt.hashSync(setpasswords, salt);


        // console.log("name", products_name)
        var myobj = {
            // fname: fname,
            // lname: lname,
            // email: email,


        fname: fname,
        lname:lname,
        phone: phone,
        company: company,
        address: address,
        apartment: apartment,
        city: city,
        country: country,
        state: state,
        pincode:pincode,
        mail:mail,
        user:user,
            

        }

        dbo.collection("address").insertOne(myobj, function (err, result) {

            if (err) throw err;
            return res.status(200).json({

                status: true,
                description: result
            })

        }
        )
    })
})


app.post('/getaddress', (req, res) => {
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoBag");

    
    var user = req.body.user;
   
  
    dbo.collection("address").find({ user : user }).toArray(function (err, result){
  
        if (err) {
            //    throw err;
            return res.status(400).json({
                status: false,
                description: "400 bad request"
            })
        }

         else {
            return res.status(200).json({
                status: true,
                description: result
            })
        }
        dbo.close();
     } )
    });
});

//updateinfo
app.put('/updateinfo', (req, res) => {
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cryptoBag");

    
    var user = req.body.id;
    console.log("sss",req.body);


    // updateOne({ _id: req.body._id }, { $set: query }, { upsert: false }, async (err, result) => {

        



   
    
   
  
    dbo.collection("address").updateOne({ user: req.body.user }, { $set: req.body }, { upsert: false }, async (err, result) => {

        if (err) {

            console.log(err)

            return res.status(500).send({ status: false, Message: "Signature upload failed!" })

        }

        else {

           // console.log(result)

            return res.status(200).send({ status: true, Message: "Accept Sucessfully" })



        }
        
        dbo.close();
     } )
    });
});



///login
app.post('/login', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("cryptoBag");
        console.log(req.body);
        var Email = req.body.email;
        console.log("mail1", Email);
        var Passwords = req.body.passwords;
        console.log("passw1", Passwords);
        dbo.collection("user").find({ email: Email }).toArray(function (err, result) {
            // dbo.collection("customers").find({}).toArray(function(err, result) {
            console.log("2pass", result);
            hashpassword = result[0].passwords;

            if (bcrypt.compareSync(Passwords, hashpassword)) {
                if (err) throw err;

                if (result == '' || result == null) {
                    return res.status(200).json({
                        status: false,
                        description: "user not valid"
                    })
                } else {
                    return res.status(200).json({
                        status: true,
                        description: result
                    })
                }
            } else {
                return res.status(200).json({
                    status: false,
                    description: "password not found"
                })

            }
        })

    })
})



//products insert

// app.post('/images', (req, res) => {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("cryptoBag");
//         var myobj =
//              { id: "1", category: "Jackets", price: "0200",  token:"19.3432", prod_image1: "jack1.jpg", prod_image2:"jack5.jpg", prod_image3: "jack3.jpg", prod_image4: "jack4.png", prod_image5: "jack2.jpg", name: "Conquery Insuraty. " };


          


//         dbo.collection("products").insertOne(myobj, function (err, result) {
//             if (err) throw err;
//             console.log("image addes 1");
             
//             db.close();
//         })
//     })
// })


//product get
//To get products list from Database
app.get('/viewproducts', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("cryptoBag");
        dbo.collection("products").find({}).toArray(function (err, result) {
            if (err) {
                //    throw err;
                return res.status(400).json({
                    status: false,
                    description: "400 bad request"
                })
            }

            if (result == '' || result == null) {
                return res.status(200).json({
                    status: false,
                    description: "no products to display"
                })
            } else {
                return res.status(200).json({
                    status: true,
                    description: result
                })
            }
            db.close();
        });
    });
})

//profile
app.get('/viewprofile', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("cryptoBag");
        dbo.collection("purchase").find({}).toArray(function (err, result) {
            if (err) {
                //    throw err;
                return res.status(400).json({
                    status: false,
                    description: "400 bad request"
                })
            }

            if (result == '' || result == null) {
                return res.status(200).json({
                    status: false,
                    description: "no products to display"
                })
            } else {
                return res.status(200).json({
                    status: true,
                    description: result
                })
            }
            db.close();
        });
    });
})



//to insert multiple product
app.post('/images', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("cryptoBag");
        var myobj =
            [

                { id: "1",user:"", category: "Jackets", totalprice: "0200",  totaltoken:"19.3432", price: "0200",  token:"19.3432", prod_image1: "jack1.jpg", prod_image2:"jack5.jpg", prod_image3: "jack3.jpg", prod_image4: "jack4.png", prod_image5: "jack2.jpg", name: "Conquery Insuraty", quantity:"1",size :"S"},

                { id: "2",user:"", category: "Jackets", totalprice: "0250",  totaltoken:"18.3232", price: "0250",  token:"18.3232", prod_image1: "1.png", prod_image2:"2.png", prod_image3: "3.png", prod_image4: "4.png", name: "PAUSE Sport" , quantity:"1",size :"S"},

                { id: "3",user:"", category: "Jackets", totalprice: "0453",  totaltoken:"19.421", price: "0453",  token:"19.421", prod_image1: "2jack1.jpg", prod_image2:"2jack5.jpg", prod_image3: "2jack3.jpg", prod_image4: "2jack4.jpg", prod_image5: "2jack2.jpg", name: "HIGHLANDER", quantity:"1",size :"S" },

                { id: "4",user:"", category: "Jackets", totalprice: "0234",  totaltoken:"14.342", price: "0234",  token:"14.342", prod_image1: "3jack1.jpg", prod_image2:"3jack5.jpg", prod_image3: "3jack3.jpg", prod_image4: "3jack4.jpg", prod_image5: "3jack2.jpg", name: "MONTREZ ", quantity:"1",size :"S" },

                { id: "5",user:"", category: "Jackets", totalprice: "0123",  totaltoken:"13.532", price: "0123",  token:"13.532", prod_image1: "4jack1.jpg", prod_image2:"4jack2.jpg", prod_image3: "4jack3.jpg", prod_image4: "4jack4.png", name: "METRONAUT", quantity:"1",size :"S"},

                { id: "6",user:"", category: "Jackets", totalprice: "0323",  totaltoken:"16.343", price: "0323",  token:"16.343", prod_image1: "11.png", prod_image2:"12.png", prod_image3: "13.png", prod_image4: "14.png", name:"LOCOMOTIVE" , quantity:"1",size :"S"},

                { id: "7",user:"", category: "Jackets", totalprice: "0134",  totaltoken:"15.334", price: "0134",  token:"15.334", prod_image1: "21.png", prod_image2:"22.png", prod_image3: "23.png", prod_image4: "24.png", name: "TRIPR", quantity:"1",size :"S" },

                { id: "8",user:"", category: "Jackets", totalprice: "0432",  totaltoken:"16.342", price: "0432",  token:"16.342", prod_image1: "31.png", prod_image2:"32.png", prod_image3: "33.png", prod_image4: "34.png", name: "WROGN", quantity:"1",size :"S" },
               
                { id: "9",user:"", category: "Shoes", totalprice: "043",  totaltoken:"11.343", price: "043",  token:"11.343", prod_image1: "ad1.png", prod_image2:"ad2.png", prod_image3: "ad3.png", prod_image4: "ad4.png", name: "Comfy Feet", quantity:"1",size :"S" },
               
                { id: "10",user:"", category: "Shoes", totalprice: "032",  totaltoken:"11.232", price: "032",  token:"11.232", prod_image1: "bro1.png", prod_image2:"bro2.png", prod_image3: "bro3.png", prod_image4: "bro4.png", name: "Feet Smart", quantity:"1",size :"S" },
               
                { id: "11",user:"", category: "Shoes", totalprice: "023",  totaltoken:"11.232", price: "023",  token:"11.232", prod_image1: "run1.png", prod_image2:"run2.png", prod_image3: "run3.png", prod_image4: "run4.png", name: "Famous" , quantity:"1",size :"S"},
               
                { id: "12",user:"", category: "Shoes", totalprice: "029",  totaltoken:"11.43",price: "029",  token:"11.43", prod_image1: "shoe1.png", prod_image2:"shoe2.png", prod_image3: "shoe3.png", prod_image4: "shoe4.png", name: "Hunter", quantity:"1",size :"S" },
                

                { id: "13",user:"", category: "Shoes",totalprice: "030",  totaltoken:"1.342", price: "030",  token:"1.342", prod_image1: "white1.png", prod_image2:"white2.png", prod_image3: "white3.png", prod_image4: "white4.png", name: "Fresh Feet" , quantity:"1",size :"S"}
               
            ];


            dbo.collection("products").insertMany(myobj, function (err, result) {
                if (err) throw err;
                if (result == '' || result == null) {
    
                    return res.status(200).json({
    
                        status: false,
    
                        description: "no products to display"
    
                    })
    
                } else {
    
                    return res.status(200).json({
    
                        status: true,
    
                        description: result
    
                    })
    
                }
                console.log("products addedv 2");
                db.close();
            })
        })
    })
app.post('/images1', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("cryptoBag");
                var myobj =
                            
                { id: "14", category: "Shoes", price: "030",  token:"1.342", prod_image1: "white1.png", prod_image2:"white2.png", prod_image3: "white3.png", prod_image4: "white4.png", name: "Fresh Feet" ,size :"S"};
                          


            dbo.collection("products").insertOne(myobj, function (err, result) {
                if (err) throw err;
                if (result == '' || result == null) {
    
                    return res.status(200).json({
    
                        status: false,
    
                        description: "no products to display"
    
                    })
    
                } else {
    
                    return res.status(200).json({
    
                        status: true,
    
                        description: result
    
                    })
    
                }
                console.log("products addedv 2");
                db.close();
            })
        })
    })



    //profile
// app.post('/profile', (req, res) => {
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("cryptoBag");     
//         // console.log("dsd",req.body._id);
//         var _id = req.body.id;
//         // console.log("varvalu",_id);

//         dbo.collection("products").find({_id:_id}).toArray(function (err, result) {
//             console.log("3pass",result);
//             if (err) {
//                 throw err;
         
//         }else {
//                 return res.status(200).json({
//                     status: true,
//                     description: result
//                 })
//             }
//             db.close();
//         });
//     });
// })
app.post('/profile', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("cryptoBag");     
        // console.log("dsd",req.body._id);
        var id = req.body._id;
       
        // console.log("varvalu",_id);
        // console.log("lsls",_id);
        dbo.collection("products").find({
          _id:ObjectId(id)
          
            // fullname : "vishnu"
        
        }).toArray(function (err, result) {
            console.log("3pass",result);
            if (err) {
                throw err;
         
        }else {
                return res.status(200).json({
                    status: true,
                    description: result
                })
            }
            
        });
    });
})



app.listen(8099, () => console.log('Assessment1 api runs on http://localhost:8099/'));