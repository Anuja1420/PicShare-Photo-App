const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


//PhotoModel Schema
const photoSchema = mongoose.model('photo',new mongoose.Schema({
    title : String,
    description : String,
    filename : String
}));


router.get('/',async(req,res)=>{
    const photos = await photoSchema.find();
    res.render('index',{photos});
});



// router.post('/delete/:id', async (req, res) => {

//     await photoSchema.findByIdAndDelete(req.params.id);

//     res.redirect('/');

// });


module.exports = router;

