const express = require('express');
const router = express.Router();
const mysqlCon = require('../server/services/database');

router.post('/search', (req,res,next) => {
  const value1 = req.body.searchValue1;
  const value2 = req.body.searchValue2;
  var searchQuery = "SELECT id,license,route,start,end,time_format(time,'%h:%i %p') time,type,seats FROM trips WHERE start LIKE ? AND end LIKE ? ORDER BY time;";
  
  mysqlCon.connection.query(searchQuery,[
            ("%"+value1.toString()+"%"),
            ("%"+value2.toString()+"%")
        ],(error,results,fields) => {
    if (error) {
      console.log('Error: '+error);
    }
    else if(results.length === 0) {
      console.log('Cannot find the route');
      return res.json({success: false, output: 'Cannot find the route'});
    }
    else {
      console.log(results);

      return res.json({success:true,output: results})
    }
  });
});

router.post('/new',(req,res,next) => {
    // var id = req.body.id;
    var license = req.body.license;
    var route = req.body.route;
    var start = req.body.start;
    var end = req.body.end;
    var type = req.body.type;
    var time = req.body.time;
    var seats = req.body.seats;

    var checkQuery = "SELECT * FROM trips WHERE route = ? AND start = ? AND end = ? AND type = ? AND time = ? AND seats = ?;";

    var insertQuery = "INSERT INTO trips(license,route,start,end,time,type,seats) VALUES(?,?,?,?,?,?,?);";



    mysqlCon.connection.query(checkQuery,[
              route.toString(),
              start.toString(),
              end.toString(),
              type.toString(),
              time.toString(),
              seats.toString()
          ],(error,results,fields) => {
      if(error){
        console.log('Error: '+error);
        res.json({success:false, output: "Failed"});
      }
      else{
        if(results.length > 0){
          console.log('Trip already exists');
          res.json({success: false, output: "Exists"});
        }
        else{
          mysqlCon.connection.query(insertQuery,[
                                license.toString(),
                                route.toString(),
                                start.toString(),
                                end.toString(),
                                time.toString(),
                                type.toString(),
                                seats.toString()
                            ],(error,results,fields) => {
            if(error) throw error;
            console.log('Successful');
            res.json({success:true, output: "Successful"});
          })
        }
      }
    });



});



module.exports = router;








// router.get('/results',(req,res,next) => {
//   res.json({data: req.data})
// });
