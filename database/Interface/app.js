const express = require('express');
const app = express();
const router = require('./router');
const SQL = require('./router/SQLoperate')

//setup the sql connection
// SQL.runsql('SELECT now()').then((res)=>{
//     console.log(res);
// },(err)=>{
//     console.log(err);
// });

app.use(express.json());

app.get('/',(req,res)=>{res.json({test:"success"})});

app.use('/user',router.users);

app.use('/item',router.item);

app.listen(3001,()=>{console.log("server run at port 3001")});