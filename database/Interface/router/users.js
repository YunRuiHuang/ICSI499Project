const express = require('express');
const router = express.Router();
const path = require('path');
const SQL = require('./SQLoperate')


function check_null(value){
    if(value === null){
        return "null"
    }else{
        return "'" + value + "'";
    }
}

// Add User
router.post("/new",(req,res)=>{
    if(!req.body.userName || !req.body.email || !req.body.location || !req.body.password){
        res.status(400).json({err:"missing not null value"});
    }else{
        var userData = {};
        userData.user_name = req.body.userName;
        userData.real_name = req.body.realName || null;
        userData.email = req.body.email;
        userData.location = req.body.location;
        userData.profile_img_id = req.body.profileImgId || null;
        userData.bio = req.body.bio || null;
        userData.password = req.body.password;
        userData.other_info = req.body.other || null;

        
        var sql = "INSERT INTO users(user_name,real_name, email, location, profile_img_id, bio, password, other_info ) VALUES (";
        sql = sql + check_null(userData.user_name) + ",";
        sql = sql + check_null(userData.real_name) + ",";
        sql = sql + check_null(userData.email) + ",";
        sql = sql + check_null(userData.location) + ",";
        sql = sql + ( userData.profile_img_id||"null" ) + ",";
        sql = sql + check_null(userData.bio) + ",";
        sql = sql + check_null(userData.password) + ",";
        sql = sql + check_null(userData.other_info) + ");";

        // console.log(sql);
        SQL.runsql(sql).then((result)=>{
            res.status(200).json(result);
        },(err)=>{
            res.status(400).json(err);
        })
        // res.json({userData,sql})
    }
});

// Delete User
router.delete("/:id",(req,res)=>{
    if(!req.body.userName || !req.body.email || !req.body.password){
        res.status(400).json({err:"missing not null value"});
    }else{
        var sql = "DELETE FROM users WHERE ";
        sql = sql + "user_id = " + req.params.id + " and ";
        sql = sql + "user_name = '" + req.body.userName + "' and ";
        sql = sql + "password = '" + req.body.password + "' and ";
        sql = sql + "email = '" + req.body.email + "';";

        SQL.runsql(sql).then((result)=>{
            res.status(200).json(result);
        },(err)=>{
            res.status(400).json(err);
        })
    }
});

// Edit User
router.put("/:id",(req,res)=>{
    if(!req.body.userName || !req.body.email || !req.body.location || !req.body.password){
        res.status(400).json({err:"missing not null value"});
    }else{
        var userData = {};
        userData.user_name = req.body.userName;
        userData.real_name = req.body.realName || null;
        userData.email = req.body.email;
        userData.location = req.body.location;
        userData.profile_img_id = req.body.profileImgId || null;
        userData.bio = req.body.bio || null;
        userData.password = req.body.password;
        userData.other_info = req.body.other || null;

        
        var sql = "UPDATE users SET ";
        sql = sql +"user_name ="+ check_null(userData.user_name) + ",";
        sql = sql +"real_name ="+ check_null(userData.real_name) + ",";
        sql = sql +"email ="+ check_null(userData.email) + ",";
        sql = sql +"location ="+ check_null(userData.location) + ",";
        sql = sql +"profile_img_id ="+ ( userData.profile_img_id||"null" ) + ",";
        sql = sql +"bio ="+ check_null(userData.bio) + ",";
        sql = sql +"other_info ="+ check_null(userData.other_info) + " WHERE ";
        sql = sql + "user_id = " + req.params.id + " AND password = " + check_null(userData.password) + ";";

        // console.log(sql);
        SQL.runsql(sql).then((result)=>{
            res.status(200).json(result);
        },(err)=>{
            res.status(400).json(err);
        })
        // res.json({userData,sql})
    }
});

// Search User (by id)
router.get("/id/:id",(req,res)=>{
    var sql = "select * from users where user_id = " + req.params.id + ";";
    SQL.runsql(sql).then((result)=>{
        res.status(200).json(result.rows[0]);
    },(err)=>{
        res.status(400).json(err);
    })
});

// Search User (by name)
router.get("/name",(req,res)=>{
    var sql = "select * from users where user_name = '" + req.body.userName + "';";
    SQL.runsql(sql).then((result)=>{
        res.status(200).json(result.rows);
    },(err)=>{
        res.status(400).json(err);
    })
});

// Check Password
router.get("/password/id/:id",(req,res)=>{
    var sql = "select * from users where user_id = '" + req.params.id + "' AND  password ='" + req.body.password + "';";
    SQL.runsql(sql).then((result)=>{
        if(result.rows[0]){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(203).json({result:"user or password error"});
        }
        
    },(err)=>{
        res.status(400).json(err);
    })

});

// Check Password (via email)
router.get("/password/email",(req,res)=>{
    var sql = "select * from users where email = '" + req.body.email + "' AND  password ='" + req.body.password + "';";
    console.log(sql);
    SQL.runsql(sql).then((result)=>{
        if(result.rows[0]){
            res.status(200).json(result.rows[0]);
        }else{
            res.status(203).json({result:"user or password error",SQL:sql});
        }
        
    },(err)=>{
        res.status(400).json(err);
    })

});

// Change Password
router.put("/password/:id",(req,res)=>{
    if(!req.body.newpassword || !req.body.oldpassword){
        res.status(400).json({err:"missing password"});
    }else{
        var sql = "UPDATE users SET password = '" + req.body.newpassword + "' WHERE user_id = '" + req.params.id + "' and password = '" + req.body.oldpassword + "';";
        SQL.runsql(sql).then((result)=>{
            res.status(200).json(result);
        },(err)=>{
            res.status(400).json(err);
        })
    }
    
});

// Set Item List
router.post("/:id/setList",(req,res)=>{
    if(!req.body.password){
        res.status(400).json({err:"missing password"});
    }else{
        var sql = "UPDATE users SET has_items_list = true WHERE user_id ='" + req.params.id + "' AND password = '" + req.body.password + "';";
        SQL.runsql(sql).then((result)=>{
            res.status(200).json(result);
        },(err)=>{
            res.status(400).json(err);
        })
    }
    

});

// check Item List
router.get("/:id/setList",(req,res)=>{
    var sql = "select user_id, has_items_list FROM users WHERE user_id = " + req.params.id + ";";
    SQL.runsql(sql).then((result)=>{
        res.status(200).json(result);
    },(err)=>{
        res.status(400).json(err);
    })
});

// Delete Item List
router.delete("/:id/setList",(req,res)=>{
    if(!req.body.password){
        res.status(400).json({err:"missing password"});
    }else{
        var sql = "UPDATE users SET has_items_list = false WHERE user_id ='" + req.params.id + "' AND password = '" + req.body.password + "';";
        SQL.runsql(sql).then((result)=>{
            res.status(200).json(result);
        },(err)=>{
            res.status(400).json(err);
        })
    }
});

module.exports=router;