const express=require('express');
const{ createUser, getUser, getSingleUser, deleteuser, updateUser, handlerefreshtoken, AdminLogincontroller} = require('../Controller/consularcnt');
const { authmidd, isAdmin } = require('../Middleware/authMidd');
const router=express.Router();
router.post("/register",createUser)
router.post("/admin",AdminLogincontroller)
router.get("/alluser",getUser);

router.get("/refresh",handlerefreshtoken);

router.get("/:id",authmidd,isAdmin,getSingleUser);
router.delete("/:id",deleteuser);
router.put("/update",authmidd,updateUser)

module.exports =  router;