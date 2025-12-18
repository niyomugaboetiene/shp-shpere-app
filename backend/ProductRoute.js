import ProductSchema from "./productSchema.js";
import express from "express"
import multer from "multer";
import userSchema from "./userSchema.js";
import { v2 as cloudinary } from "cloudinary";

const route = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const AdminCheck = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!req.session.user.isAdmin) {
          return res.status(403).json({ message: "Forbidden. Admins only." });
    }

    next();
};
const storage = multer.memoryStorage(); 
const uploads = multer({ storage });

route.post('/add', AdminCheck, uploads.single('image'), async(req, res) => {
    try {
        const { product_name, category, price, stock } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ message: 'Product image is required' });
        }
        
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;
        
        const cloudinaryResult = await cloudinary.uploader.upload(dataURI, {
            folder: 'ecommerce-app/products'
        });
        
        await ProductSchema.create({
            product_name, 
            category, 
            price: parseFloat(price), 
            stock: parseInt(stock), 
            image: cloudinaryResult.secure_url 
        });
        
        res.status(201).json({
            message: 'Product Added successfully',
            imageUrl: cloudinaryResult.secure_url
        });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({
            message: 'Server Error',
            error: err.message
        });
    }
});

route.get('/getProduct', async(req, res) => {
    try {
      const products = await ProductSchema.find();
      if (products.length > 0) {
        res.status(200).json({ message: 'Product in the Database', products });
      } else {
        res.status(404).json({message: 'error in fetching product'})
      }
    } catch (error) {
        res.status(500).json({message: 'Database error'})
    }
});

route.get('/getProduct/:product_id', async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await ProductSchema.findOne({ product_id: Number(product_id) });

    if (product) {
      res.status(200).json({ message: 'Product found', product });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
});


route.get('/best-sold', async(req, res) => {
    try {
      const products = await ProductSchema.find({ timesAddedToCart: { $gte: 5 }}).sort({ timesAddedToCart: -1 }).limit(8);
      if (products.length === 0) {
          return res.status(404).json({ message: 'No best sold products found.' });
      }
        res.status(200).json({ message: 'new Products in the Database', products });
      
    } catch (error) {
        res.status(500).json({message: 'Database error'})
    }
});

route.get('/newProducts', async(req, res) => {
    try {
      const products = await ProductSchema.find().sort({ date: -1 }).limit(12);
        res.status(200).json({ message: 'best sold Products in the Database', products });
      
    } catch (error) {
        res.status(500).json({message: 'Database error'})
    }
});

route.get('/women', async(req, res) => {
    try {
         const womemProduct =  await ProductSchema.find({ category: `Women's Fashion`});
         if (womemProduct.length === 0) {
            return res.status(404).json({ message: 'No womem  products found.' });
         }
         return res.status(200).json({message: 'women products', womemProduct});
    } catch (error) {        
        res.status(500).json({message: 'Database error'})
    }

})

route.get('/men', async(req, res) => {
    try {
         const MenProduct =  await ProductSchema.find({ category: `Men's Fashion`});
         if (MenProduct.length === 0) {
            return res.status(404).json({ message: 'No men  products found.' });
         }
         return res.status(200).json({message: 'men products', MenProduct});
    } catch (error) {        
        res.status(500).json({message: 'Database error'})
    }

})
route.get('/electronics', async(req, res) => {
    try {
         const ElectronicsProduct =  await ProductSchema.find({ category: `Electronics`});
         if (ElectronicsProduct.length === 0) {
            return res.status(404).json({ message: 'No Electronics products found.' });
         }
         return res.status(200).json({message: 'electronics products', ElectronicsProduct});
    } catch (error) {        
        res.status(500).json({message: 'Database error'})
    }

})

route.get('/lifestyle', async(req, res) => {
    try {
         const ElectronicsProduct =  await ProductSchema.find({ category: `Home & Lifestyle`});
         if (ElectronicsProduct.length === 0) {
            return res.status(404).json({ message: 'No Lifestyle products found.' });
         }
         return res.status(200).json({message: 'Lifestyle products', ElectronicsProduct});
    } catch (error) {        
        res.status(500).json({message: 'Database error'})
    }

})

route.get('/toy', async(req, res) => {
    try {
         const ToysProduct =  await ProductSchema.find({ category: `Baby's & Toys`});
         if (ToysProduct.length === 0) {
            return res.status(404).json({ message: 'No Toys products found.' });
         }
         return res.status(200).json({message: 'Toys products', ToysProduct});
    } catch (error) {        
        res.status(500).json({message: 'Database error'})
    }

})
route.get('/health', async(req, res) => {
    try {
         const ToysProduct =  await ProductSchema.find({ category: `Heath & Beauty`});
         if (ToysProduct.length === 0) {
            return res.status(404).json({ message: 'No Toys products found.' });
         }
         return res.status(200).json({message: 'Toys products', ToysProduct});
    } catch (error) {        
        res.status(500).json({message: 'Database error'})
    }

});

route.put('/update/:product_id', AdminCheck, uploads.single("image"), async(req, res) => {
    try {
        const { product_id } = req.params;
        const { product_name, category, price, stock } = req.body;

        const newData = {};

        if (product_name) newData.product_name = product_name;
        if (category) newData.category = category;
        if (price) newData.price = price;
        if (stock) newData.stock = stock;
        if (req.file) newData.image = req.file.path; 
        

        const product  = await ProductSchema.findOneAndUpdate(
            { product_id: Number(product_id) },
            { $set: newData },
            { new: true }
        );  

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Database error", error: error.message });
    }
});

route.put('/updates/:product_id',  async(req, res) => {
    try {
        const { product_id } = req.params;
        const { quality } = req.body;

       if (!req.session.user || !req.session.user.user_id) {
              return res.status(404).json({ message: 'User not logged in' });
       }

       const user_id = req.session.user.user_id;
       const user = await userSchema.findOne({ user_id });

       if (!user) {
        return res.status(404).json({ message: 'User not found' });
       }

       const cartItem = user.cart.find(item => item.product_id === Number(product_id));

       if (!cartItem) {
        return res.status(404).json({ error: 'Product not found' });
       }

       cartItem.quality = quality;
       await user.save();

       return res.status(200).json({
        message: 'Cart updated successfully',
        cart: user.cart
       })
    } catch (error) {
        console.error("Update Cart Error:", error);
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

route.delete('/delete/:product_id', AdminCheck, async(req, res) => {
    try {
        const { product_id } = req.params;

        const product  = await ProductSchema.findOneAndDelete(
            { product_id: product_id },
        );  

        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
         console.error(error);
         res.status(500).json({ message: "Database error", error: error.message });
    }
});

route.post('/cart/add/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;
    const { quality } = req.body;

    if (!req.session.user || !req.session.user.user_id) {
      return res.status(401).json({ message: "User not logged in" });
    }
    const user_id = req.session.user.user_id;
    console.log("user session", user_id);

    const user = await userSchema.findOne({ user_id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const product = await ProductSchema.findOne({ product_id: Number(product_id) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.timesAddedToCart += 1;
    await product.save();

    const existingItem = user.cart.find(item => item.product_id === Number(product_id));

    if (existingItem) {
      existingItem.quality += quality || 1;
    } else {
      user.cart.push({ product_id: Number(product_id), quality: quality || 1 });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });

  } catch (error) {
    console.error("Add to Cart Error:", error);
    res.status(500).json({ message: "Database error", error: error.message });
  }
});

route.get('/cart', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Login first' });
        }

        const user = await userSchema.findOne({ user_id: req.session.user.user_id });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const cartWithDetails = await Promise.all(
            user.cart.map(async (item) => {
                const product = await ProductSchema.findOne({ product_id: item.product_id });
                return {
                    product_id: item.product_id,
                    quality: item.quality,
                    product_name: product?.product_name || 'Unknown',
                    price: product?.price || 0,
                    image: product?.image || '',
                };
            })
        );

        res.status(200).json({ cart: cartWithDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

route.post('/cart/remove', async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({ message: 'Login first' });
        }

        const { product_id } = req.body;
        const user = await userSchema.findOne({ user_id: req.session.user.user_id });
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.cart = user.cart.filter(item => item.product_id !== product_id);

        await user.save();
        res.status(200).json({ message: 'Removed from cart', cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Database error', error: error.message });
    }
});

route.get('/search', async (req, res) => {
  try {
    const { query, category } = req.query; 

    let searchFilter = {};

    if (query) {
      searchFilter.$or = [
        { product_name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }, 
      ];
    }

    if (category) {
      searchFilter.category = { $regex: category, $options: 'i' };
    }

    const products = await ProductSchema.find(searchFilter);

    res.status(200).json({
      message: 'Search result',
      products,
      total: products.length,
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
});

export default route;