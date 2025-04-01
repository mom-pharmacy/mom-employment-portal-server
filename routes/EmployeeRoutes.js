const express = require('express')
const router = express.Router()
const employeeController = require("../controllers/employeeControllers")


// get, post, put/putch, delete

router.post('/employeeDetails/:id', employeeController.createEmployee)
router.get('/employeeDetails', employeeController.getEmployees)
router.get('/emplyee/:id', employeeController.singleEmployee)
router.get('/learnings/:id',employeeController.getUserLearnings)

module.exports = router