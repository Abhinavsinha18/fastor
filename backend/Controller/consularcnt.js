const user = require("../Model/studentmodel")
const asynchandler = require('express-async-handler')

const createUser =asynchandler(async(req, res) => {
    const email=req.body.email;
    const findUser=await user.findOne({email:email});
    if(!findUser){
      const newUser= await user.create(req.body);
      res.json(newUser);
    }else{
        throw new Error("User already exists")
    }
    })
  
  
  const getUser=asynchandler(async (req,res) => {
    try {
      const getalluser=await user.find();
      res.json(getalluser);
    } catch (error) {
      throw new Error(error)
    }
  })
   // get single user
    const getSingleUser=asynchandler(async (req,res) => {
      const {_id}=req.params
      validateMongoDbId(_id)
          try {
        const getuser=await user.findById(_id);
        res.json(getuser);
      } catch (error) {
        throw new Error(error)
      }
    })
  //delete user
  const deleteuser=asynchandler(async (req,res) => {
    try {
      const deluser=await user.findByIdAndDelete(req.params.id);
      res.json(deluser);
    } catch (error) {
      throw new Error(error)
    }
  })
  
  //update user
  const updateUser=asynchandler(async (req,res) => {
    try {
      const {_id}=req.user
      validateMongoDbId(_id);
      const updateuser=await user.findByIdAndUpdate(_id,{firstname:req?.body?.firstname,
      lastname:req?.body?.lastname,
      email:req?.body?.email,
      mobile:req?.body?.mobile},
      {new:true});
      res.json(updateuser);
    } catch (error) {
      throw new Error(error)
    }
  })
  //handle refresh token
  const handlerefreshtoken=asynchandler(async (req,res) => {
   const cookie=req.cookies;
   if(!cookie?.Token) throw new Error("Nahi chala");
   const Token= cookie.Token;
   jwt.verify(Token,process.env.JWT_SECRET,(err,decoded)=>{
    if(err) throw new Error("invalid token")
    const acessToken=genration(decoded.id);
    res.json({acessToken})
   });
  });
  

  
  
  
  // admin login funcanility
  const AdminLogincontroller=asynchandler(async (req, res) => {
    const {email,password}=req.body;
    
    const findAdmin=await user.findOne({email});
    if(findAdmin.Role!=="counselor") throw new Error(error)
  
    if(findAdmin && (await findAdmin.isPasswordMatched(password))){
      const Token=await refreshToken(findAdmin?._id);
       const updateuser=await user.findByIdAndUpdate(
        findAdmin.id,
        {
        Token:Token,
       },
       {new :true}
       );
       res.cookie("Token",Token,{
       httpOnly:true,
       maxAge : 3600000,
       });
          res.json({
      _id:findAdmin?._id,
      firstname:findAdmin?.firstname,
      lastname:findAdmin?.lastname,
      email:findAdmin?.email,
      mobile:findAdmin?.mobile,
      token:genration(findAdmin?._id),
     });
    }else{
      throw new Error("login not working")
    }
  });
  
  

  
  
  
  
  
  
  
  
  module.exports = {
    createUser,
    getUser,
    // Logincontroller,
    updateUser,
    getSingleUser,
    deleteuser,
    handlerefreshtoken,
    AdminLogincontroller,
  };