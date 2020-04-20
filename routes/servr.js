var express = require("express");
var router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-01.cleardb.net',
  user: 'b8ab33556c107e',
  password: 'cff81462',
  database: 'heroku_bd8223b30a738b5'
});

connection.connect(err => {
    if (err){
        return err;
    }
});

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get("/product", function(req, res) {
const q1 = 'SELECT * FROM student'
connection.query(q1, (err,rows) => {
  if(err) {
      return res.send(err)
  }
  else {
      return res.json({
          data: rows
      })
  }
    });
})

 router.get("/course", function(req, res) {
 const q2 = 'SELECT * FROM course'
 connection.query(q2, (err,rows) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: rows
            })
        }
          });   
    
})

router.get("/enrollment", function(req, res) {
  const q3 = 'SELECT * FROM enrollment'
  connection.query(q3, (err,rows) => {
    if(err) {
        return res.send(err)
    }
    else {
        return res.json({
            data: rows
        })
    }
      });
    })
router.get("/product/add", function(req, result) {
const {nam, major} = req.query;
var studt = [[nam, major]];
connection.query('INSERT INTO student (STUDENTNAME, MAJOR) VALUES ?', [studt], (err, res) => {
  if(err){
    throw err;
  } 
  else{
    return  result.json({
        data: res.insertId
    })
  }
  
 
});
        
    })
router.get("/course/add", function(req, result) {
const {DEPTCODE, COURSENUM, TITLE, CREDITHOURS} = req.query;
var thecourse = [[DEPTCODE, COURSENUM, TITLE, CREDITHOURS]];
connection.query('INSERT INTO course (DEPTCODE,COURSENUM,TITLE,CREDITHOURS) VALUES ?', [thecourse], (err, res) => {
  if(err){
    throw err;
  } 
  else{
    return  result.json({
        data: res.insertId
    })
  }
  
 
});
        
    })
router.get("/enrollment/add", function(req, result) {
const {SID, DEPTCODE, COURSENUM} = req.query;
var thenrol = [[SID, DEPTCODE, COURSENUM]];
connection.query('INSERT INTO enrollment (SID, DEPTCODE, COURSENUM) VALUES ?', [thenrol], (err, res) => {
        if(err){
          throw err;
        } 
        else{
          return  result.json({
              data: res.insertId
          })
        }
        
       
      });
              
          })
router.get("/enrollment/search", function(req, res) {
const {namee} = req.query;
var thenam = [[namee]];
const q4 = 'SELECT * FROM enrollment WHERE SID = (SELECT STUDENTID FROM student WHERE STUDENTNAME = ?)'
connection.query(q4, [thenam], (err, rows) => {
  if(err) {

    return res.send(err)
}
else {
    return res.json({
        data: rows
    })
}
  });
})
router.get("/course/search", function(req, res) {
const {DPTC} = req.query;
var DPT = [[DPTC]];
  const q5 = 'SELECT * FROM course where DEPTCODE=?'
  connection.query(q5,[DPT], (err,rows) => {
    if(err) {
      return res.send(err)
  }
  else {
      return res.json({
          data: rows
      })
  }
    });
  })


//SELECT * FROM heroku_bd8223b30a738b5.course where DEPTCODE=234;
//SELECT * FROM enrollment WHERE SID = (SELECT STUDENTID FROM student WHERE STUDENTNAME = 'SARAH');

module.exports = router;