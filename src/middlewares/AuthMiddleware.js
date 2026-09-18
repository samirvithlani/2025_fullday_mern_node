const jwt = require("jsonwebtoken")
const secret = "royal"

const authMiddleware =(req,res,next)=>{

      //req.headers
      //eg: Bearer jbsakhasiumahsumhashsiuhissauiasnius
      var token = req.headers.authorization
      if(token){
        //check Bearer protocol
        if(token.startsWith("Bearer ")){
            //remove Bearer from 
            //Bearer jbsakhasiumahsumhashsiuhissauiasnius
            //[Bearer,asnsjamiojsjasilasjklsamnlkas]
            token = token.split(" ")[1]
            //now verify token with jwt
            try{

                jwt.verify(token,secret)
                //if token can not verify it will throw exception and go to catch block
                //if token can  verify will send to next
                next() // it will go to controller

            }catch(err){
                res.status(401).json({
                    message:"invalid token",
                    err:err
                })
            }


        }else{
            res.status(401).json({
                message:"token is not Bearer token"
            })
        }


      }else{
        res.status(401).json({
            message:"token is missing"
        })
      }


}

module.exports = authMiddleware