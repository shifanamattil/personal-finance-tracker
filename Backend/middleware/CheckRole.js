const checkRole=(role)=>{
    return async(req,res,next)=>{
        if(roles.includes(req.user.roles)){
            next()
        }else{
            res.status(401).json({message:"acces denied"})
        }
    }
}
module.exports=checkRole