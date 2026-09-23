
const roleModel = require("../models/RoleModel")

const createRole = async(req,res)=>{

    const savedRole = await roleModel.create(req.body)
    res.json({
        message:"role created",
        data:savedRole
    })
}

module.exports = {createRole}