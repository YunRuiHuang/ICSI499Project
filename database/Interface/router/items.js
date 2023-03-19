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

// Add Item
router.post("/:userId",(req,res)=>{
    if(!req.body.itemName || !req.body.itemLocation){
        res.status(400).json({err:"missing not null value"});
    }else{
        var sql = "INSERT INTO items(user_id, item_name,item_keywords, item_location, item_description, item_img_id, other_info) VALUE (";
        sql = sql + check_null(req.params.userId) + ",";
        sql = sql + check_null(req.body.itemName) + ",";
        sql = sql + check_null(req.body.itemKeywords) + ",";
        sql = sql + check_null(req.body.itemLocation) + ",";
        sql = sql + check_null(req.body.itemDescription) + ",";
        sql = sql + check_null(req.body.itemImgId) + ",";
        sql = sql + check_null(req.body.other) + ");";

        SQL.runsql(sql).then((result)=>{
            
            if(!req.body.itemKeywords || !result.rows.insertId){
                res.status(203).json({status:"success add item, fail to add key or not key"});
                
            }else{
                const insert = "INSERT INTO keyword_map(keyword,item_id) VALUE (";
                var sqllist = [];
                for (var i = 0; i < req.body.itemKeywords.length; i++){
                    let newsql = insert + check_null(req.body.itemKeywords[i]) + "," + result.rows.insertId + ");";
                    sqllist.push(SQL.runsql(newsql));
                }
                Promise.all(insert).then(
                    (resu)=>{
                        res.status(200).json({itemId:result.rows.insertId,resu});
                    }
                ).catch(
                    (err)=>{
                        res.status(203).json({status:"success add item, fail to add key",err});
                    }
                )
                    
            }
            

        },(err)=>{
            res.status(400).json(err);
        })

    }



});

// Delete Item
router.delete("/:itemId",(req,res)=>{
    var sql = "DELETE FROM items WHERE item_id =" + req.params.itemId + ";";
    SQL.runsql(sql).then((result)=>{
        sql = "DELETE FROM keyword_map WHERE item_id =" + req.params.itemId + ";";
        SQL.runsql(sql).then((result)=>{
            res.status(200).json(result);
        },(err)=>{
            res.status(400).json(err);
        })
    },(err)=>{
        res.status(400).json(err);
    })
});

// Edit Item
router.put("/:itemId",(req,res)=>{
    if(!req.body.userId ||!req.body.itemName || !req.body.itemLocation){
        res.status(400).json({err:"missing not null value"});
    }else{
        var sql = "UPDATE items SET ";
        sql = sql +"item_name ="+ check_null(req.body.itemName) + ",";
        sql = sql +"item_keywords ="+ check_null(req.body.itemKeywords) + ",";
        sql = sql +"item_location ="+ check_null(req.body.itemLocation) + ",";
        sql = sql +"item_description ="+ check_null(req.body.itemDescription) + ",";
        sql = sql +"item_img_id ="+ check_null(req.body.itemImgId) + ",";
        sql = sql +"other_info ="+ check_null(req.body.other) + " WHERE ";
        sql = sql + "user_id = " + req.body.userId + " AND item_id = " + req.params.itemId + " ;";
        SQL.runsql(sql).then((result)=>{

            sql = "DELETE FROM keyword_map WHERE item_id =" + req.params.itemId + ";";
                SQL.runsql(sql).then((result)=>{
                    if(!req.body.itemKeywords){
                        res.status(200).json(result);
                    }else{
                        const insert = "INSERT INTO keyword_map(keyword,item_id) VALUE (";
                        var sqllist = [];
                        for (var i = 0; i < req.body.itemKeywords.length; i++){
                            let newsql = insert + check_null(req.body.itemKeywords[i]) + "," + req.params.itemId + ");";
                            sqllist.push(SQL.runsql(newsql));
                        }
                        Promise.all(insert).then(
                            (resu)=>{
                                res.status(200).json({status:"success edit item and keyword"});
                            }
                        ).catch(
                            (err)=>{
                                res.status(203).json({status:"success edit item, fail to edit key",err});
                            }
                        )
                    }
                },(err)=>{
                    res.status(400).json(err);
                })
        
        },(err)=>{
            res.status(400).json(err);
        })
    }
});

// Search Item (by user)
router.get("/userid/:userId",(req,res)=>{
    var sql = "SELECT * FROM items WHERE user_id = " + req.params.userId + ";";
    SQL.runsql(sql).then((result)=>{
        res.status(200).json(result);
    },(err)=>{
        res.status(400).json(err);
    })
});

// Search Item (by id)
router.get("/itemid/:itemId",(req,res)=>{
    var sql = "SELECT * FROM items WHERE item_id = " + req.params.itemId + ";";
    SQL.runsql(sql).then((result)=>{
        res.status(200).json(result);
    },(err)=>{
        res.status(400).json(err);
    })
});

// Search Item (by name)
router.get("/name",(req,res)=>{
    var sql = "SELECT * FROM items WHERE item_name = " + check_null(req.body.itemName) + ";";
    SQL.runsql(sql).then((result)=>{
        res.status(200).json(result);
    },(err)=>{
        res.status(400).json(err);
    })
});

// Search Item (by keyword)
router.get("/keyword",(req,res)=>{
    if(!req.body.itemKeywords){
        req.status(400).json({err:"missing keywords"});
    }else{
        var sql = "select item_id,count(item_id) as times from keyword_map WHERE keyword =" + check_null(req.body.itemKeywords[0]);

        for(var i = 1; i < req.body.itemKeywords.length;i++){
            sql = sql + " OR keyword =" + check_null(req.body.itemKeywords[i]);
        }
        sql = sql + " GROUP BY item_id;";

        SQL.runsql(sql).then((result)=>{
            res.status(200).json(result);
        },(err)=>{
            res.status(400).json(err);
        })


    }
    
});

module.exports=router;