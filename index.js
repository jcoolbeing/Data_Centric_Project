var express = require('express')
const { get } = require('express/lib/response')
var mySQLDAO = require('./DAO')
var MongoDAO = require('./mongoDAO')
var app = express()

//view engine
app.set('view engine', 'ejs')

//homepage
app.get('/', (req, res)=>{
    console.log("GET on /")
    res.sendFile(__dirname + "/views/homepage.html")
})

//module page
app.get('/listModules', (req, res)=>{
    console.log("GET on /listModules")
    res.sendFile(__dirname + "/views/listModules.html")
    //res.render("showModules")
    
    mySQLDAO.getModules()
    .then((result)=>{
        res.render('showModules', {modules:result})
    })
    .catch((error)=>{
        res.send(error)
    })
})

//module edit page
//takes you to edit page of the module selected
app.get('/module/edit/:mid', (req, res)=>{
    //console.log("GET on /module/edit/:mid")
    res.sendFile(__dirname + "/views/edit.html")
    mySQLDAO.getModule(req.params.module)
        .then((result)=>{
            res.send(result)
        })
        .catch((error)=>{
            res.send(error)
        })
})

// students page
app.get('/listStudents', (req, res)=>{
    //console.log("GET on /listStudents")
    res.sendFile(__dirname + "/views/listStudents.html")
    
    mySQLDAO.getStudents()
    .then((result)=>{
        res.render('showStudents', {students:result})
    })// let user know if attached to module
    .catch((error)=>{
        res.send("<h1>"+ req.params.sid + "cannot be deleted</h1>")
    })
})

//when delete is pressed in list
app.get('/students/delete/:sid',(req, res)=>{
    mySQLDAO.deleteStudent(req,params.student)
        .then((result)=>{
            res.send(result)
        })
        .catch((error)=>{
            res.send(error)
        })
})

// add student
app.get('/add/student', (req, res)=>{
    res.render("addStudent")
})

app.post('/add/student', (req, res)=>{
    res.send("Student post sent")
})

// Lecturer 
//lecturer page
app.get('/listLecturers', (req, res)=>{
    //console.log("GET on /listLecturers")
    res.sendFile(__dirname + "/views/listLecturers.html")
    //res.render("listLecturers")
    MongoDAO.getLecturers()
    .then((document)=>{
        res.send(document)
    })

    .catch((error)=>{
        res.send(error)
    })
})
// switches to add lecturer screen 
app.get('/addLecturer', (req, res)=>{
    res.render("addLecturer")
})
//post for add lecturer
app.post('/addLecturer', (req, res)=>{
    res.send("Lecturer post sent")
})


app.listen(3000, () => {
    // callback to console
    console.log("Connected to port: 3000")
})