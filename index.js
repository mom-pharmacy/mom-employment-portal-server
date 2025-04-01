const express = require('express');
const mongoose = require("mongoose")
const app = express();
require('dotenv').config();
const userRoutes = require('./routes/userRoutes')
const EmployeeRoutes = require('./routes/EmployeeRoutes')
const cors = require("cors")
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("DB connected successfully")
})
.catch(e=>{console.log("Error in DB" , e)})

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World! Akhila');
});

// routes
app.use("/api" , userRoutes)
app.use("/api" ,EmployeeRoutes)

app.listen(port, () => {
  console.log(`Server listening to you at http://localhost:${port}`);
});