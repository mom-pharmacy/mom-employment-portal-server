const Employee = require('../models/EmployeeDetailsModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const createEmployee = async(req, res) => {
    try{
        const {userId,technicalDesc, nonTechnicalDesc, review, extraCarricular, events, posted_linkedin} = req.body
        const dateNow =  new Date().toISOString().split("T")[0]
        const employee = new Employee({
            userId,
            technicalDesc,
            nonTechnicalDesc,
            review,
            extraCarricular,
            events,
            posted_linkedin,
            date:dateNow

        })
        await employee.save()
        res.status(201).json(employee)
    } catch(error){
        console.log("there is an error: ", error)
        res.status(500).json({message: 'Server error'})
    }
}

const getEmployees= async(req, res) => {
    try{
        const employee = await Employee.find()
        res.status(200).json(employee)
    }catch(error){
        console.error("There is an error:", error)
        res.status(500).json({message: "server error"})
    }
}

const singleEmployee = async(req, res) => {
    try{
        const employee = await Employee.findById(req.params.id)

        if(!employee){
            return res.status(404).json({message: "Employee not found"})
        }
        res.status(200).json(employee)
    }catch(error){
        console.log("there is an error", error)
        res.status(500).json({message:"server error"})
    }
}


const getUserLearnings = async (req, res) => {
    const { id, dateAdd } = req.params; 
    console.log(id, dateAdd);
  
    const dateAdded = dateAdd; 
    if (!dateAdded) {
      return res.status(400).send("Date is required");
    }
  
    try {
      
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      
      const filteredLearnings = user.learnings.filter(
        (learning) => learning.dateAdded === dateAdded
      );
  
      
      if (filteredLearnings.length === 0) {
        return res.status(404).send("No learnings found for the given date");
      }
      console.log(filteredLearnings);
  
      
      res.status(200).json(filteredLearnings);
    } catch (err) {
      console.error("Error fetching learnings:", err); 
      res.status(500).send("An error occurred while fetching learnings");
    }
  };

module.exports= {createEmployee, getEmployees, singleEmployee,getUserLearnings}