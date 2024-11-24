exports.auth = async (req, res, next) => {
    try{
        const token = req.headers["authtoken"]
        if(!token){
            return res.status(401).send('No token')
        }
        const decoded = jwt.verify(token,'jwtsecret')
        console.log(decoded)
    } catch(err){
        console.log(err)
        res.send('Token Invalid').status(500)
    }
}