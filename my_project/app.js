const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysqlCon = require('./server/services/database');
const router = express.Router();


var app = express();
const port = 3000;

const tripRoutes = require('./routes/tripRoutes');

mysqlCon.connection.connect((err) => {
  if(err){
    console.log('Error: ', err);
  }
  else{
    console.log('Connected to MySQL database.');
  }
});

app.use(bodyParser.json());
app.use(cors());
app.use(tripRoutes);

app.listen(port, () => {
  console.log('Connected to port: ',port);
});



router.get('/results',(req,res,next) => {
  res.json({data: req.data})
});

module.exports = router





// app.post('/search', (req,res,next) => {
//   const value = req.body.searchValue;
//   var searchQuery = "SELECT * FROM trips WHERE license = '" + value.toString() + "'";
//
//   mysqlCon.connection.query(searchQuery, (error,results,fields) => {
//     if (error) {
//       console.log('Error: '+error);
//     }
//     else if(results.length === 0) {
//       console.log('Cannot find the route');
//       return res.json({success: false, output: 'Cannot find the route'});
//     }
//     else {
//       console.log(results);
//       return res.json({success:true,output: results})
//     }
//   });
// });
