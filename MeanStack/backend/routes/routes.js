const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;
const Employee = require('../models/employee.js');


// Get, Post, Put and Delete
// Base Path: https://localhost:3000/employees

// Get API
router.get('/', (req, res) => {
    Employee.find( (err, doc) =>{
        if(err){
            console.log('Error in Get Data' + err)
        }
        else{
            res.send(doc);
        }
    })
});


// Get Single Employee API
router.get('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        Employee.findById(req.params.id, (err, doc) =>{
            if(err){
                console.log('Error in Get Employee by ID' + err)
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});



// Post API
router.post('/', (req, res) => {
    let emp = new Employee({
        name : req.body.name,
        position : req.body.position,
        dept : req.body.dept
    });
    
    emp.save((err, doc) => {
        if(err){
            console.log('Error in post' + err)
        }
        else{
            res.send(doc);
        }
    })
});



// Put API
router.delete('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){

        let emp = {
            name : req.body.name,
            position : req.body.position,
            dept : req.body.dept
        };


        Employee.findByIdAndUpdate(req.params.id, {$set :emp}, {new:true}, (err, doc) =>{
            if(err){
                console.log('Error in Update Employee by ID' + err)
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});




// Delete API
router.delete('/:id', (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        Employee.findByIdAndRemove(req.params.id, (err, doc) =>{
            if(err){
                console.log('Error in Delete Employee by ID' + err)
            }
            else{
                res.send(doc);
            }
        });
    }
    else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});


module.exports = router;