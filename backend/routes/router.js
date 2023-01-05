const express = require('express')
const router = new express.Router();
const users_input = require("../models/project.schema")
const datastore = require('../models/datastore.schema')

//.env
const Jwt = require('jsonwebtoken');
const jwtKey = "e-comm";


router.post('/register', async (req, res)=>{
    try{
        let user = new users_input(req.body);
        let result= await user.save();
        // res.send(result);
        result = result.toObject();
        delete result.password;
        // res.status(200).json(result);
        Jwt.sign({result}, jwtKey, {expiresIn: "2h"}, (error, token) => {
            if(error){
                res.send({result: "something went wrong, Please try after sometime"})
            }
            res.send({result, auth: token})
        })

    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.post("/login", async (req, res) => {
    // resp.send(req.body)
    // console.log(req.body);
    if (req.body.password && req.body.email) {

        let user = await users_input.findOne(req.body).select("-password");
        if (user) {
            // resp.send(user)
            Jwt.sign({user}, jwtKey, {expiresIn: "2h"}, (error, token)=>{
                if(error){
                    res.send({result:"something went wrong, Please try after something"})
                }
                res.send({user, auth: token})
            })
        }else{
            res.send({result:'This user Not Found in Data'})
        }
    }else{
        res.send({result:'This user Not Found in Data'})
    }
})

router.post("/add-product", verifyToken, async (req, res) => {
    try{
        let product = new datastore(req.body);
        let result = await product.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
    
});

router.get("/products", verifyToken, async (req, res) => {
    try {
        let products = await datastore.find();
        // resp.send(products)
        if(products.length > 0){
            // res.send(products);
            res.status(200).json(products);
        }else{
            res.send({result : "NO Products Found "})
        }
    } catch (error) {
        res.status(500).json(error.message);
    }

});

router.delete("/product/:id", verifyToken, async (req, res) =>{
    // resp.send(req.params.id);
    try {
        const result = await datastore.deleteOne({_id:req.params.id})
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/product/:id", verifyToken, async (req, res) =>{
    try {
        const result = await datastore.findOne({_id:req.params.id})
        // resp.send(result);
        if(result){
            res.status(200).json(result);
        }else{
            res.send({result: "No Record Found"})
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.put('/product/:id', verifyToken, async (req, res)=>{
    try {
        const result = await datastore.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/search/:key", verifyToken, async (req, res) => {
    try {
        let result = await datastore.find({
            "$or":[
                { name : {$regex : req.params.key}},
                { company : {$regex : req.params.key}},
                { category : {$regex : req.params.key}},
            ]
        });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error.message);
    }
});

function verifyToken (req, res, next){
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        Jwt.verify(token, jwtKey, (error, valid)=>{
            if(error){
                res.status(401).send({result:"Please provide token with header"})
            } else{
                next();
            }
        })
    } else {
        res.status(403).send({result:"Please add token with header"})
    }
}



module.exports = router;