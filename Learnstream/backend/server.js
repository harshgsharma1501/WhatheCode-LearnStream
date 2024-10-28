require('dotenv').config()

const  express = require('express')
const app = express()
const mongoose = require("mongoose")
const userTeacherRouter= require(`./routes/teachersauth`)
const userStudentRouter= require(`./routes/studentsauth`)

//middleware
app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next();
})

app.use('/user/teacher',userTeacherRouter);
app.use('/user/student',userStudentRouter);

mongoose.connect(process.env.MONGO_URI).then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log(`connected to db and listening on port ${process.env.PORT}` )
        })
    }
).catch(
    (error)=>{
        console.log('error');
    }
)