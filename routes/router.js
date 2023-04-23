const express = require("express");
const router = new express.Router();
const userdb = require("../models/userSchema.js");
const userImg = require("../models/imageSchema")
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate.js");
const nodemailer = require("nodemailer");
const jwt  = require("jsonwebtoken");
const multer = require("multer");
const moment = require("moment");

// const keysecret = process.env.SECRET_KEY
const keysecret = "mynameisramannagariamawebdeveloper";

// email config
const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

 // for user registration
 router.post("/register", async (req, res) => {

    const { username, email, password, cpassword, number } = req.body;
     try {
        const preuser = await userdb.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This Email is Already Exist" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and Confirm Password Not Match" })
        } else {
            const finalUser = new userdb({
                username, email, password, cpassword, number
            });
            // here password hasing
            const storeData = await finalUser.save();

            // console.log(storeData);
            res.status(201).json({ status: 201, storeData })
        }

    } catch (error) {
        res.status(422).json(error);
        console.log("catch block error");
    }
});

// user Login
 router.post("/login", async (req, res) => {
   const {email, password} = req.body;

   try {
    const userValid = await userdb.findOne({email})
    // console.log(userValid)
    if(userValid){
        const isMatch = await bcrypt.compare(password, userValid.password);
        if(!isMatch){
            res.status(422).json(({error:"invalid detail"}))
        }else{
            //token generate
            console.log(userValid)
            jwt.sign({_id:userValid._id}, keysecret, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send("Something went wrong")  
                }
                res.status(201).send({status:201, user:userValid, auth:token})
            })
        }
    }
   } catch (error) {
    console.log(error);
   }
});


// send email Link For reset Password
router.post("/sendpasswordlink",async(req,res)=>{
    console.log(req.body)

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await userdb.findOne({email:email});
        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},keysecret,{
            expiresIn:"120s"
        });
        
        const setusertoken = await userdb.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});

        if(setusertoken){
            const mailOptions = {
                from:"ramannagar08082000@gmail.com",
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 2 MINUTES http://localhost:3000/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Succsfully"})
                }
            })

        }

    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }

});

// verify user for forgot password time
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        console.log(verifyToken)

        if(validuser && verifyToken._id){
            res.status(201).json({status:201,validuser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});

// change password

router.post("/:id/:token",async(req,res)=>{
    const {id,token} = req.params;

    const {password} = req.body;

    try {
        const validuser = await userdb.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,keysecret);

        if(validuser && verifyToken._id){
            const newpassword = await bcrypt.hash(password,12);

            const setnewuserpass = await userdb.findByIdAndUpdate({_id:id},{password:newpassword});

            setnewuserpass.save();
            res.status(201).json({status:201,setnewuserpass})

        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    } catch (error) {
        res.status(401).json({status:401,error})
    }
})

//////////////////////////////////////////////////////////////////////////////////////////

const storage = multer.diskStorage({
    destination:(req, file, collback)=>{
        collback(null, "./uploads")
    },
    filename:(req, file, collback)=>{
        collback(null, `image-${Date.now()}. ${file.originalname}`)
    }
})

// const isImage = (req, file, collback)=>{
//     if(file.mimetype.startsWith("image")){
//         collback(null, true)
//     }else{
//         collback(new Error("only image is allowed"))
//     }
// }

const upload = multer({
    storage:storage
    // fileFilter:isImage
})

router.post("/imgupload", upload.array("products", 12), async (req, resp)=>{
    console.log(req.files);
    
    console.log(req.body)
    
    try {
        const date = moment(new Date()).format("YYYY-MM-DD")
        const result = await userImg.create({
            category:req.body.category,
            images:req.files,
            date:date
        })   
        if(result){
            resp.status(201).json({status:201, result})
        }else{
            resp.status(401).json({status:401, message:"fill all the data"})
        }
    } catch (error) {
        resp.status(401).json({status:401, message:"fill all the data"})
    }
})

module.exports = router;
