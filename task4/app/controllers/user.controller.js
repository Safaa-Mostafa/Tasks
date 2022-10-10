const userModels =require("../database/models/user.model")
class user{
static register =async(req,res)=>{
    try{
const user = new userModels(req.body)
await user.save()
res.status(200).send({
    apiStatus:true,
    data:user,
    message:"user added successfully"
})
    }catch(e){ 
    res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
    })
    }
    }
static all =async(req,res)=>{
    try{
    const allusers = await userModels.find()
    res.status(200).send({
    apiStatus:true,
    data:allusers,
    message:"all data fetched"
})
    }catch(e){
    res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static single =async(req,res)=>{
    try{
    const user = await userModels.findById(req.params.id)
    res.status(200).send({
    apiStatus:true,
    data:user,
    message:"user"
})
    }catch(e){
    res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static delete =async(req,res)=>{
    try{
    const user = await userModels.findByIdAndDelete(req.params.id)
    res.status(200).send({
    apiStatus:true,
    data:user,
    message:"user"
})
    }catch(e){
    res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}

}

module.exports =user