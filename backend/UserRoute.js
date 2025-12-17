import express, { json } from "express";
import multer from "multer";
import UserSchema from "./userSchema.js";
import bcrypt from "bcrypt";
import route from "./ProductRoute.js";
import { v2 as cloudinary } from "cloudinary";

const routes = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure multer for memory storage (no local disk storage)
const storage = multer.memoryStorage();
const uploads = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        // Convert buffer to base64
        const b64 = Buffer.from(fileBuffer).toString('base64');
        const dataURI = `data:image/jpeg;base64,${b64}`; // Adjust mime type as needed
        
        cloudinary.uploader.upload(dataURI, {
            folder: 'ecommerce-app/users',
            public_id: fileName.split('.')[0], // Remove extension
            overwrite: false
        }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
};

routes.post('/register', uploads.single('image'), async (req, res) => {
    try {
        const { user_name, password } = req.body;
        
        // Validation
        if (!user_name || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        
        if (!req.file) {
            return res.status(400).json({ message: 'Profile image is required' });
        }
        
        // Check if user exists
        const isExist = await UserSchema.findOne({ user_name });
        if (isExist) {
            return res.status(409).json({ message: 'Username already taken' });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Upload image to Cloudinary
        let cloudinaryResult;
        try {
            cloudinaryResult = await uploadToCloudinary(
                req.file.buffer,
                `${Date.now()}-${req.file.originalname}`
            );
        } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError);
            return res.status(500).json({ message: 'Failed to upload image' });
        }
        
        // Create user with Cloudinary URL
        await UserSchema.create({
            user_name,
            password: hashedPassword,
            image: cloudinaryResult.secure_url, // Cloudinary URL
            cloudinary_public_id: cloudinaryResult.public_id // Store public_id for future deletion
        });
        
        return res.status(201).json({ 
            message: 'User registered successfully',
            imageUrl: cloudinaryResult.secure_url
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Database error' });
    }      
});

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