// const express = require('express')
// const router = new express.Router();
// const users_input = require("../models/project.schema")


router.post('/register', async (req, res)=>{
    try{
        let user = new users_input(req.body);
        let result= await user.save();
        // res.send(result);
        result = result.toObject();
        delete result.password
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.post("/login", async (req, resp) => {
    // resp.send(req.body)
    console.log(req.body);
    if (req.body.password && req.body.email) {

        let user = await users_input.findOne(req.body).select("-password");
        if (user) {
            resp.send(user)
        }else{
            resp.send({result:'This user Not Found in Data'})
        }
    }else{
        resp.send({result:'This user Not Found in Data'})
    }
})



module.exports = router;