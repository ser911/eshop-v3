const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        res.status(500).json({
            success: false
        })
    }
    res.send(categoryList);
})

router.get('/:id', async(req,res)=>{
    const category = await Category.findById(req.params.id);
    if(!category){
        res.status(500).json({message:'The given id is not valid'});
    }
    res.status(200).send(category);
})

router.post('/', async (req,res)=>{
    let category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
      m: req.body.m,
      w: req.body.w
    })
    category = await category.save();

    if(!category)
    return res.status(404).send('the category cannot be created');

    res.send(category);
})

router.put('/:id', async(req,res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
            m: req.body.m,
            w: req.body.w
        }
    )
    if(!category){

        return res.status(400).send('category could not be updated');
    }

    res.send(category)
})

router.delete('/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success: true, message: 'Category deleted'});
        }else{
            return res.status(404).json({success: false, message:'Category could not be deleted'});
        }
   }).catch(err=>{
       return res.status(400).json({success: false, error: err});
   })
})


module.exports = router;