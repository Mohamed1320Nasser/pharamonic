const { catchAsyncError } = require("../../utils/catchAsyncErr")

exports.create= (Model) =>{
    return catchAsyncError(async(req,res,next)=>{
        const Document = new Model(req.body)
        await Document.save
        res.json({message:"sucessful save",result:Document})
    })    
}
