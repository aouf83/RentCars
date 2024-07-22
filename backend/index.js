import express  from "express";
import cors from "cors";
import { Register } from "./models/admincart.js";
import { Bookcars } from "./models/date.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path"
import  {fileURLToPath }from "url"



const PORT =  5050;
const app = express();

// Middleware
app.use(express.json());

app.use(cors());

app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "./models/images")
  )
);




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./models/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage });


// Express Route for adding a new item to admin cart
app.post("/admincart", upload.single("image"), async (req, res) => {
  try {
    const { name, price ,logo,transmission,fuel,seats } = req.body;
    const image = req.file.filename; // Get the file path
    
    // Create a new item in the admin cart
    await Register.create({ name: name, price: price, image: image , logo:logo , transmission: 
      transmission , fuel:fuel , seats:seats});
    
    res.status(201).json({ message: "Success" }); // Send success response
  } catch (error) {
    console.error("Error adding item to admin cart:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});
  



app.get("/getadmincart" , async(req,res)=>{
  try {
  const response = await Register.find()
res.json(response)
  } catch (error) {
    console.log(error);
  }
})




app.post("/Bookcar", async (req, res) => {
  try {
    const { startLocation, endLocation, startDate, startTime, endDate, endTime } = req.body;
    const newBooking = await Bookcars.create({ startLocation, endLocation, startDate, startTime, endDate, endTime });
    console.log("data saved");
    res.status(201).json({ message: "Success", id: newBooking._id }); // Include the newly created booking data in the response
  } catch (error) {
    console.error("Error adding item to booking car:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Send error response
  }
});



app.get("/payments/:id",async(req,res)=>{
  try {
    const {id} = req.params
    const response = await Register.findById(id)
    res.status(200).json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
}

)


app.get("/date/:id",async(req,res)=>{
  try {
    const {id} = req.params
    const response = await Bookcars.findById(id)
    res.status(200).json({
      message: "Success",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
}
)





// Start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


// Connect to MongoDB
mongoose.connect("mongodb+srv://rent-a-car:rentacar@atlascluster.gyp46gp.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster", {
})
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("Error connecting to MongoDB:", error));
