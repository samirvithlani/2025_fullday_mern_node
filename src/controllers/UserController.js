//usermodel require
const userModel = require("../models/UserModel");
const mailSend = require("../utils/MailUtils");
const uploadtoCloud = require("../utils/CloudinaryUpload");
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const secret = "royal"


//db.users

const getAllUsers = async (req, res) => {
  //db.users.find()
  const users = await userModel.find();
  res.json({ message: "get all users..", data: users });
};
const getUserById = async (req, res) => {
  //req.params
  const id = req.params.id;

  //const foundUser = await userModel.find({_id:id})
  //const foundUser = await userModel.findOne({_id:id})
  const foundUser = await userModel.findById(id);
  if (foundUser) {
    res.json({
      message: "user found",
      data: foundUser,
    });
  } else {
    res.json({
      message: "user not found",
    });
  }
};

//req.query

const searchUser = async (req, res) => {
  const data = req.query; //{josn object}
  console.log(data);
  res.json({ data: data });
};

// const createUser = async(req,res)=>{
//     //req.params :id
//     //req.query = ?&
//     //req.body : POST,PUT,DELETE
//     console.log("req body",req.body)
//     //db.users.insertOne(req.body)
//     //userModel.insertOne(req.body)
//     const savedUser = await userModel.insertOne(req.body) //-->
//     res.json({message:"user created",data:savedUser})
// }

// const createUser = async (req, res) => {
//   try {
//     console.log("req file..",req.file) //meta data
//     // const savedUser = await userModel.insertOne(req.body);
//     const savedUser = await userModel.insertOne({...req.body,profilepicUrl:req.file.path});
//     //mailSend(req.body.email,"","")
//     res.json({
//       message: "user saved!!",
//       data: savedUser,
//     });
//   } catch (err) {
//     res.json({ err: err });
//   }
// };

// const createUser = async (req, res) => {
//   try {
//     console.log("req file..",req.file) //meta data
//     // const savedUser = await userModel.insertOne(req.body);
//     //cloud..
//     const cloundinaryresponse = await uploadtoCloud(req.file.path)
//     console.log("cloudinary response..",cloundinaryresponse)

//     //const savedUser = await userModel.insertOne({...req.body,profilepicUrl:req.file.path});
//     const savedUser = await userModel.insertOne({...req.body,profilepicUrl:cloundinaryresponse.secure_url});
//     //mailSend(req.body.email,"","")
//     res.json({
//       message: "user saved!!",
//       data: savedUser,
//     });
//   } catch (err) {
//     res.json({ err: err });
//   }
// };

const createUser = async (req, res) => {
  try {
    // console.log("Req body",req.body)
    console.log("req file..", req.files);

    // const u = req.files.map((file) => uploadtoCloud(req.file.path));
    const u = await Promise.all(
      req.files.map((file) => uploadtoCloud(file.path)),
    );
    //console.log("u....",u[0].secure_url);
    const urls = u.map((url)=>url.secure_url)
    console.log("urls...",urls)

    const hashedPassword = bcrypt.hashSync(req.body.password,10)

    const savedUser = await userModel.insertOne({...req.body,profilepicUrl:u[0].path,ProfileThumb:u,password:hashedPassword});
    
    //await mailSend(req.body.email, "Testing royal", "hi someone from me");
    res.json({
      message:"user saved",
      data:savedUser
    })
  } catch (err) {
    console.log(err)
    res.json({ err: err });
  }
};

const deleteUser = async (req, res) => {
  try {
    //const deletedUser = userModel.deleteOne({_id:ObjectId(req.params.id)})
    const id = req.params.id;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).json({
        message: "user deleted.",
        date: deletedUser,
      });
    } else {
      res.status(404).json({
        message: "user not found to delete",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error while deleting user",
      err: err,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    //const data = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).json({
        message: "user updated",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        message: "user not found to update",
      });
    }
  } catch (err) {
    res.status(500).json({
      err: err,
    });
  }
};
const createMultipuleusers = async(req,res)=>{

  res.json({message:"ok"})

}


const loginUser = async(req,res)=>{

    const foundUserFromEmail = await userModel.findOne({email:req.body.email})
    if(foundUserFromEmail){

        if(bcrypt.compareSync(req.body.password,foundUserFromEmail.password)){

          //token generation..
          //const token = jwt.sign(foundUserFromEmail.toObject(),secret)
          const token = jwt.sign({id:foundUserFromEmail._id},secret)


            res.status(200).json({
              message:"user login success",
              data:token
            })
        }
        else{
          res.status(401).json({
            message:"invalid credentials."
          })
        }

    }
    else{
      res.status(404).json({
        message:"user not found"
      })
    }


}


module.exports = {
  getAllUsers,
  getUserById,
  searchUser,
  createUser,
  deleteUser,
  updateUser,
  createMultipuleusers,
  loginUser
};
