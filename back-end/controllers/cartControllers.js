const cartSchema=require('../model/cart')
const productSchema=require('../model/product')

// Get cart by userId
const getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("User ID:", userId);
        const cart = await cartSchema.findOne({ userId }).populate("items.productId");

        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        res.status(200).json({ msg: 'User Cart', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error retrieving cart' });
    }
};




const addItemToCart = async (req, res) => {
  const { productId, quantity,supplements } = req.body;
  const { userId } = req.params;

  try {
      // Step 1: Fetch the product details using the productId
      const product = await productSchema.findById(productId);
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      // Step 2: Find the user's cart
      let cart = await cartSchema.findOne({ userId });

      // If the user doesn't have a cart, create one
      if (!cart) {
          cart = new cartSchema({ userId, items: [] });
      }
    
      // Step 3: Check if the item already exists in the cart
   const existingItem = cart.items.find(item => {
  const itemSupplementsIds = (item.supplements || []).map(s => s._id.toString()).sort();
  const newSupplementsIds = (supplements || []).map(s => s._id.toString()).sort();
  console.log("summplements 1", JSON.stringify(itemSupplementsIds))
   console.log("summplements 2", JSON.stringify(newSupplementsIds))
   console.log(" item.productId.toString(", item.productId.toString())
     console.log("productId.toString(",productId)

  return (
     item.productId.toString() === productId.toString() && 
    JSON.stringify(itemSupplementsIds) === JSON.stringify(newSupplementsIds)
  );
});
    console.log("exusiting item ",existingItem)
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
         
          cart.items.unshift({
              productId: product._id, 
              quantity,
               supplements: supplements || []
          });
      }

      // Step 4: Save the updated cart
      await cart.save();

      // Step 5: Send the updated cart back as the response
      res.json({ cart });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        console.log("User ID:", userId, "Product ID:", productId);

        let cart = await cartSchema.findOne({ userId });

        if (!cart) return res.status(404).json({ msg: 'Cart not found' });
        
        cart.items = cart.items.filter(item =>
           {console.log("item.id", item._id.toString()) ;
           return item._id.toString() !== productId });

        await cart.save();
        res.status(200).json({ msg: 'Item removed from cart', cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error removing item from cart' });
    }
};


// Clear the cart
const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("User ID:", userId);

        let cart = await cartSchema.findOne({ userId });

        if (!cart) return res.status(404).json({ msg: 'Cart not found' });

        cart.items = [];
        await cart.save();

        res.status(200).json({ msg: 'Cart cleared', cart });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error clearing cart' });
    }
};



// Update the quantity of an item in the cart
const updateQuantityItemCart = async (req, res) => {
  const { userId, productId } = req.params;
  const { newQuantity } = req.body; // Receive the updated quantity

  try {
      // Step 1: Fetch the user's cart
      let cart = await cartSchema.findOne({ userId }).populate("items.productId");

      if (!cart) {
          return res.status(404).json({ msg: 'Cart not found' });
      }

      // Step 2: Find the item in the cart and update the quantity
      const existingItem = cart.items.find(item => item.productId._id.toString() === productId);

      if (!existingItem) {
          return res.status(404).json({ msg: 'Item not found in cart' });
      }
  
      // Step 3: Update the quantity (ensure it stays within the stock limits)
      existingItem.quantity = Math.max(1, Math.min(newQuantity,existingItem.productId.stock));

      // Step 4: Save the updated cart
      await cart.save();

      res.status(200).json({ msg: 'Quantity updated', cart });
  } catch (error) {
      console.log(error);
      res.status(500).json({ msg: 'Error updating quantity' });
  }
};


module.exports = { getCartByUserId, addItemToCart, removeItemFromCart, clearCart,updateQuantityItemCart };