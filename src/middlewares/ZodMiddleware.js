const zodMiddleware = (schema)=>(req,res,next)=>{

    //schema == userVldationschema
    try{

        schema.parse(req.body) //--->catch
        next()
    }catch(err){
        res.status(400).json({
            message:"invalid request",
            err:err
        })
    }

}
module.exports = zodMiddleware