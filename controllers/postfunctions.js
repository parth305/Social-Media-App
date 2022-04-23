const { validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");

const Post = require("../model/postmodel");
let getpost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0]
        });
    }
    try{
    let post=await Post.find(req.body);
    return res.status(200).json({success:true,data:post});
    }
    catch(error){
        res.status(401).json({success:false,msg:error.message});
    }
}

let addpost = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: errors.array()[0]
        });
    }
    try{
        // let post=req.body;
        let newpost=req.body
        console.log(newpost);
        let savedpost=new Post(newpost);
        await savedpost.save()
        res.status(200).json({success:true,msg:"post added",data:newpost})
    }catch(error){
        console.log("gheye");
        res.status(500).json({success:false,msg:error.message})
    }
}

let updatepost=async (req,res)=>{
    let {id:_id}=req.params;

    let post=req.body
    try{
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({success:false,data:"No post found"});

    let updatedpost=await Post.findByIdAndUpdate(_id,post,{new:true});
    res.status(200).json({success:true,data:updatedpost});
    }
    catch(error){
        res.status(500).json({success:false,data:"internal server error"})
    }
}

module.exports = { getpost, addpost,updatepost }