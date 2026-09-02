const productModel =  require("../models/ProductModel")

const createProduct = async(req,res)=>{

    try{

        const savedProduct = await productModel.create(req.body)
        res.status(201).json({
            message:"product created",
            data:savedProduct
        })

    }catch(err){
        res.json({
            message:"error while creating product",
            err:err
        })
    }

}

const getAllProducts = async(req,res)=>{

    try{

        const products = await productModel.find().populate("categoryId")
        if(products.length>0){
            res.json({
                message:"products fetched ",
                data:products
            })
        }
        else{
            res.json({
                message:"product not found ",
                
            })
        }

    }catch(err){
        console.log(err)
        res.json({
            message:"error while fetching products",
            err:err
        })
    }

}

const updateStockStatus = async(req,res)=>{

    try{

        
        const update2 = await productModel.updateMany({stock:{$gte:10}},{$set:{stockStatus:"available"}})
        const update3 = await productModel.updateMany({stock:{$lt:10}},{$set:{stockStatus:"low"}})
        const update1 = await productModel.updateMany({stock:0},{$set:{stockStatus:"out of stock"}})

        res.status(200).json({
            message:"stock status updated..",
        })    


    }catch(err){

        res.status(500).json({
            message:"error while updating stock"
        })

    }


}

module.exports = {
    createProduct,getAllProducts,
    updateStockStatus
}