const Chat = require("../models/chat")
const { Op } = require('sequelize');

exports.chats =async (req,res,next)=>{
    try{
        console.log("req body for chats ",req.body)
        await req.user.createChat({
            message:req.body.message,
            messageOwner:req.user.name,
            groupId:req.body.groupId,
            isImage:req.body.isImage
        })
        return true
    }catch(err){
        console.log("chat.js err", err)
        return false
    }
}

exports.getChats = async (req,res,next)=>{
    console.log("param ",req.params)
    try{
        let getChatFromId = req.params.id 
        let groupId = req.params.groupId

        console.log("getChatFromId12 : ",getChatFromId)
        let messages1 = await Chat.findAll({
            where: {
                id: {
                    [Op.gt]: getChatFromId
                },
                groupId:groupId
            },
            attributes: [
                "id",
                "message",
                "messageOwner",
                "isImage"
            ],
        });
        res.status(200).json({
            success:true,
            messages1
        })
    }catch(err){
        console.log("err while getting chats: ",err)
        res.status(500).json({
            success:false
        })
    }
}