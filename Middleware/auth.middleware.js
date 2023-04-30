const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(token){
          try {
                const decode = jwt.verify(token,"deepakpandey")
                if(decode){
                    req.body.authorID = decode.authorId
                    req.body.author=decode.author
                    
                    next()
                }else{
                    res.send({"msg" : "Login First"})
                }
            } catch (error) {
                res.send({"msg":"LOgin First"})
            }
        
    }
}

module.exports = auth