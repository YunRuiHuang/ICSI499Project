const mysql = require('mysql2');
const config = require('../config/database.json')

// create the connection to database
let pool = mysql.createPool(config.connection);

async function runsql(sql){
    
    return new Promise((resolve, reject)=>{
      pool.getConnection((err,connection)=>{
        if(err){
          connection.release();
          reject(err);
        } 
        connection.query(sql,(err,rows)=>{
          connection.release();
          if(err) reject(err);
          resolve({rows:rows});
        })
      })
      // con.query(sql, (err, result) =>{
      //   if(err) reject('err');
      //   resolve(result);
      // })
    })
}

function creatTable(){
    const table1 = runsql(config.usertable[0]);
    const table2 = runsql(config.itemtable[0]);
    const table3 = runsql(config.keywordmaptable[0]);
    Promise.all([table1,table2,table3]).then((res)=>{
        const alter = [];
        for(i=1;i<config.usertable.length;i++){
            alter.push(runsql(config.usertable[i]));
        }
        for(i=1;i<config.itemtable.length;i++){
            alter.push(runsql(config.itemtable[i]));
        }
        for(i=1;i<config.keywordmaptable.length;i++){
            alter.push(runsql(config.keywordmaptable[i]));
        }
        Promise.all(alter).then((res)=>{
            console.log("successful creat table and alter")
        }).catch((err)=>{
            console.log("creat table success, but add alter fail")
            console.log(err)
        })
    }).catch((err)=>{
        console.log("creat table fail");
        console.log(err);
    })


}

pool.getConnection((err,connection)=>{
    if(err){
      // connection.release();
      console.log("fail to connect")
    } 
    connection.query("USE data",(err,res)=>{
      connection.release();
      if(err){
        runsql("CREATE DATABASE data").then((res)=>{
            console.log("creat database success");
            let newconnect = config.connection;
            newconnect.database = "data";
            const connection = newconnect;
            pool = mysql.createPool(connection);
            creatTable();
        },(err)=>{
            console.log("creat database fail");
        })
      }
      if(res){
        console.log("use database data");
        let newconnect = config.connection;
        newconnect.database = "data";
        const connection = newconnect;
        pool = mysql.createPool(connection);
      }
    })
})

// export the executeQuery function so other code can use it
module.exports = { runsql };
