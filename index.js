var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '81.68.240.118',
    user: 'root',
    password: '111912Liubo',
    database: 'mobile'
});

connection.connect();

function api(sql,cb) {
    connection.query(sql, function (error, results, fields) {
        if (error) {throw error;}
        else cb(results)
    })
}


app.use(bodyParser.json());

app.get('/getData',  (req, res)=>{
    api('SELECT * from users',result=> {
        res.send(result);
    });
});

app.post('/addUser', (req,res)=> {
    const {name, password }= req.body
    api(`INSERT INTO users (name, password) VALUES ('${name}', '${password}')`,result=> {
        res.send('新增用户成功！');
    });
})
app.listen(3000);