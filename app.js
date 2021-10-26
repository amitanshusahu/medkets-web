const express = require("express")
const app = express();
const port = process.env.PORT ||3000;
const path = require('path')
const bodyParser = require("body-parser");

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// SETUP FOR PUG , ejs
app.set("view engine", "pug")
// app.set('view engine', 'ejs')
app.set("views" , path.join(__dirname+"/views"))
//static files
app.use('/', express.static("public"))

// MONGOOSE SETUP
const mongoose = require("mongoose")
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(`mongodb+srv://amitanshuAdmin:idkpassword@cluster0.9vqxf.mongodb.net/medketsBooking?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
}

//MOONGOOSE RELATED STUFFS (shema and modal)
var ticketBookingSchema = new mongoose.Schema({
    name : String,
    adhar : Number,
    phone : Number
});
var ticketBooking = mongoose.model("ticketBookings", ticketBookingSchema)

// ENDPOIINTS
app.get("/", (req,res) =>{
    res.status(200).sendFile(path.join(__dirname,"public","html/index.html"))
    // res.render("index.pug")
});
app.post("/", (req, res) => {
    var ticketBookingData = new ticketBooking(req.body)
    ticketBookingData.save().then(()=>{
        res.status(200).send("booked....")
        console.log("ticketBookingData Saved...")
    }).catch(() => {
        res.status(400).send("opps some thing went wrong")
    })
})
app.get("/getdata" ,  (req, res) => {
    const bookings = ticketBooking.find({} , (err , result) => {
        if(err){res.send(err)}
        else{
            // res.render("bookings.ejs" , {quotes : result})
            res.render("bookings.pug" , { data : result})
        }
    })
})
app.get("/update" , (req , res) => {
    // res.sendFile(path.join(__dirname+"/views/update.html"))
    res.render("update.pug")
})
// app.post('/update', (req, res) => {
//   console.log(req.body)
//     quotesCollection.findOneAndUpdate(
//         { name: 'Amitanshu sahu' },  /*to find*/
//         {
//           $set: {
//             name: req.body.name,
//           }
//         },
//         {
//           upsert: true
//         }
//       )
//         .then(result => {console.log(result)})
//         .catch(error => console.error(error))
//       .then(result => {
//         console.log(result)
//        })
//       .catch(error => console.error(error))
//   });

app.get("*" , (req, res) => {
  res.render("404.pug")
})
// START SERVER
app.listen(port, () =>{
    console.log(`server started sucessfuly at http://localhost:${port}`)
})