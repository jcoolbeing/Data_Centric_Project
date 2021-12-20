const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName='lecturersDB'
const collName='lecturer'

var lecturersDB
var lecturers
//mongo --> express
MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then((client)=>{
    lecturerDB= client.db(dbName)
    lecturersDB.collection(collName)
})
.catch((error)=>{
    console.log(error)
})
// function to return all lecturers in database
var getLecturers = function(){
    return new Promise((resolve, reject)=>{
        var cursor = lecturers.find()
        cursor.toArray()
            .then((documents)=>{
                resolve(documents)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}
//exports
module.exports={ getLecturers }