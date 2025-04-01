const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const getUsers = async (req , res)=>{
    try{
        if(req.permission){
            const userDetails = await User.find({isAdmin:false})
            res.status(200).json({data:userDetails , status:true})
        }else{
            res.status(401).json({msg:"unauthorized user"})
        }
    }catch(e){
        res.status(500).json({msg:"Internal server error" ,  e})
    } 
}

const LoginUser = async  (req , res)=>{
    const {username , password} = req.body;
    console.log(username , password)
    try{
        if(!username || !password){
            throw new Error("All Fields are mandatory")
        }
        const userDetails = await User.findOne({username})
        
        if(!userDetails){
            return res.status(404).json({msg:"User not found" , status:true});
        }
        bcrypt.compare(password , userDetails.password , (err , result)=>{
            if(err) return res.status(401).json("Invalid credientials")
            if(result){
                jwt.sign({username:userDetails.username , isAdmin:userDetails.isAdmin} , process.env.SECRET_KEY, (err, token)=>{
                    if(err) return res.status(500).json({msg:"error in jwt token" ,err})
                        
                    res.status(200).json({jwtToken:token})
                })
            }
        })
    }catch(e){
        res.status(500).json({msg:"Internal server error" ,  e})
    }
   
}

const createUser = async (req , res)=>{
    const {username , email , password , isAdmin ,gender} = req.body ;
    console.log(req.body)
    try{
        if(!username || !email || !password){
            console.log("all fields are mandatory")
            throw new Error("All fields are mandatory")
        }

        const checkUser = await User.findOne({username})
        if(checkUser) return res.status(400).json({msg:"User already exists"})
        if(req.permission){
            bcrypt.hash(password , 10, (err , hashPassowrd)=>{
                const userDetails = new User({
                    username , email , password:hashPassowrd , isAdmin , gender
                })
                userDetails.save()
                return res.json({data:userDetails , status:true})
            })
        }else{
            res.status(401).json({msg:"unauthorized user"})
        }
        
    }catch(e){
        res.status(500).json({msg:"Internal server error" , e})
    }
}

const deleteUsers =  async (req  , res)=>{
    const id = req.params.id ;
    console.log(id)
    try{
        if(req.permission){
            const deleteUser = await User.deleteOne({_id:id})
            res.status(200).json({data:deleteUser , msg:"user succesfully deleted" , status:true})
        }else{
            res.status(401).json({msg:"unauthorized user"})
        }
    }catch(e){
        res.status(500).json({msg:"Internal server error" ,  e})
    }    
}

module.exports = {getUsers , LoginUser , createUser , deleteUsers}