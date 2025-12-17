import express from "express"
import mongoose from "mongoose";
import ProductRoute from "./ProductRoute.js"
import UserRoute from "./UserRoute.js";
import nodemailer  from "nodemailer"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();
import session  from "express-session";


const app = express();
app.use('/Product_Image', express.static("Product_Image"));
app.use('/User_Image', express.static("User_Image"));
import MongoStore from "connect-mongo";

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use(session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: 'sessions'
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24, 
    }
}));

app.use('/product', ProductRoute);
app.use('/user', UserRoute);

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected successfully');
}).catch((error) => {
    console.error(`Error: ${error}`);
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send message.");
  }
});

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))