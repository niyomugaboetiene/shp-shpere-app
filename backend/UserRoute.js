import express, { json } from "express";
import multer from "multer";
import UserSchema from "./userSchema.js";
import bcrypt from "bcrypt";
import route from "./ProductRoute.js";
const routes = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'User_Image/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // * to avoid duplicates
    }
})  

const uploads = multer({ storage });

routes.post('/register', uploads.single('image'), async(req, res) => {
    try {
    const { user_name, password, image } = req.body;
    const isExist = await UserSchema.findOne({ user_name });
        

    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const ImagePath = req.file ? req.file.path : null;
   
    if (!user_name || !password || !ImagePath) {
        res.status(400).json({ message: 'Missing dependecies' });
    }
    if (isExist) {
        return res.status(409).json({ message: 'username already taken' });
    }
        await UserSchema.create({
            user_name, password: hashedPassword, image: ImagePath
        });
        
        return res.status(201).json({ message: 'User registered successfully' });
    } catch(error) {
         res.status(500).json({message: 'Database error'});
    }      
})
routes.post('/login', async (req, res) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).json({ message: "Missing username or password" });
    }

    try {
        const user = await UserSchema.findOne({ user_name });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        req.session.user = {
            user_id: user.user_id,
            user_name: user.user_name,
            isAdmin: user.isAdmin,
            image: user.image
        };

        res.status(200).json({ message: "Login successfully", user: req.session.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


routes.get('/userInfo', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ userInfo: req.session.user })
    }
    return res.status(401).json("Not logged in")
});


routes.post('/logout', async(req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        console.log('Logged out')
    })
});

routes.post('/cart/add', async(req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Login first' });

    const { product_id, quality } = req.body;
    const user = await UserSchema.findOne({ user_id: req.session.user.user_id });

    const existing = user.cart.find(p => p.product_id === product_id);

    if (existing) {
        existing.quality += quality;
    } else {
        user.cart.push({ product_id, quality });
    }

    await user.save();
    res.status(200).json({ message: "Added to cart", cart: user.cart });
});

export default routes;