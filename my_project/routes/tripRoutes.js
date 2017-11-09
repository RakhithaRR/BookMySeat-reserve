const express = require('express');
const router = express.Router();
const mysqlCon = require('../server/services/database');

router.post('/search', (req,res,next) => {
  const value = req.body.searchValue;
  var searchQuery = "SELECT id,license,route,start,end,time_format(time,'%h:%i %p') time,type,seats FROM trips "
                    + "WHERE start = '" + value.toString() + "' "
                    + "OR end = '" + value.toString() + "' "
                    + "ORDER BY time;";

  mysqlCon.connection.query(searchQuery, (error,results,fields) => {
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

    var checkQuery = "SELECT * FROM trips WHERE "
                      // + "license = '" + id.toString() + "' "
                      + "route = '" + route.toString() + "' "
                      + "AND start = '" + start.toString() + "' "
                      + "AND end = '" + end.toString() + "' "
                      + "AND type = '" + type.toString() + "' "
                      + "AND time = '" + time.toString() + "' "
                      + "AND seats = '" + seats.toString() + "';";

    var insertQuery = "INSERT INTO trips(license,route,start,end,time,type,seats)" +
                      " VALUES("
                      // + "'" + id.toString() + "',"
                      + "'" + license.toString() + "',"
                      + "'" + route.toString() + "',"
                      + "'" + start.toString() + "',"
                      + "'" + end.toString() + "',"
                      + "'" + time.toString() + "',"
                      + "'" + type.toString() + "',"
                      + "'" + seats.toString() + "'"
                      +");";



    mysqlCon.connection.query(checkQuery, (error,results,fields) => {
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
          mysqlCon.connection.query(insertQuery,(error,results,fields) => {
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
