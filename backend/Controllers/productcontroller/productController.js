const products = require('../../Models/temperature/productModel')

// post done
exports.product = async (req, res) => {
  try {
      const producted = new products(req.body);
      await producted.save();
      res.status(201).json({ message: 'Product created successfully', product: producted });
  } catch (err) {
      res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};
// get done
exports.list = async(req, res) => {
  try{  
    // code
    const producteds = await products.find({}).exec();
    res.send(producteds);

  } catch(err) {
    // error
    console.log(err);
    res.status(500).send('Get Error')
  }
  
}
// patch
exports.update = async(req, res) => {
  try{
    const id = req.params.id
    const updated = await products.findOneAndUpdate({_id:id}, 
    req.body , { new:true }).exec();
    res.send(updated);

  } catch(err) {
    console.log(err);
    res.status(500).send('Patch Error');
  }
}
// delete
exports.remove = async(req, res) => {
  try{

  } catch(err) {
    console.log(err);
    res.status(500).send('Delete Error');
  }
}
