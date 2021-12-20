// put this seperate to keep inde.js cleaner and to add encapsulation

var mysql = require('promise-mysql')

var pool
mysql.createPool({
    connectionLimit : 3,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'collegeDB - no COLLATE'
})
.then((result)=>{
    pool=result
})
.catch((error)=>{
    console.log("Error")
});

// MODULE
// function to display all modules
var getModules = function(){
    return new Promise((resolve, reject)=>{
        pool.query('select * from module')
            .then(()=>{
                resolve(result)
            })
            .catch(()=>{
                reject(error)
            })
        })
    }
// function to select 1 module
    var getModule = function(){
        return new Promise((resolve, reject)=>{
            pool.query('select * from module where mid = ' + mid)
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }

//STUDENTS
// function to display students in
var getStudents = function(){
    return new Promise((resolve, reject)=>{
        pool.query('select * from student')
            .then(()=>{
                resolve(result)
            })
            .catch(()=>{
                reject(error)
            })
        })
    }

    // function that deletes the selected student from database
    var deleteStudent = function(sid){
        return new Promise((resolve, reject)=>{
            pool.query('delete * from module where sid = ' + sid)
            .then((result)=>{
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
        })
    }


//exports
    module.exports = { getModules, getModule, getStudents, deleteStudent }