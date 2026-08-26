const categoryModel = require("../models/CategoryModel")

const createCategory = async(req,res)=>{

    //db.categories.inserOne
    try{

        const savedCategory = await categoryModel.create(req.body)
        res.json({
            message:"category saved !!",
            data:savedCategory
        })

    }catch(err){
        res.json({
            message:"error while saving category..",
            err:err
        })
    }
   
}

const getAllCategories = async(req,res)=>{


    try{

        const categories = await categoryModel.find()
        //if else
        if(categories.length>0){
           res.json({
            message:"categories fetched !!",
            data:categories
           }) 
        }
        else{
            res.json({
                message:"no category found.."
            })
        }
        

    }catch(err){
        res.json({
            message:"error while fetching category..",
            err:err
        })
    }


}

module.exports={
    createCategory,getAllCategories
}