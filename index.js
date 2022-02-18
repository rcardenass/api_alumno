const express = require('express');
const app = express();

//Settings
app.set('port',process.env.PORT || 5000);

//Middlewares
app.use(express.json());

//Routes
app.get('/',function(req,res){
    res.json({
        'status':true,
        'content':'Bienvenido a mi API'
    })
})

const cn = require('./database');

app.get('/alumno',function(req,res){
    cn.query('select * from alumno',(err,rows,fields)=> {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
})

app.post('/alumno',function(req,res){
    const {nombres,apellidos,dni} = req.body;
    const query = 'insert into alumno(nombres,apellidos,dni) values(?,?,?)';
    
    cn.query(query,[nombres,apellidos,dni],(err,rows,fields)=>{
        if(!err){
            res.json({
                'status':true,
                'content':'employed inserted'
            })
        }
        else{
            console.log(err);
        }
    })
})

app.put('/alumno/:id',function(req,res){
    const {nombres,apellidos,dni} = req.body;
    const {id} = req.params;
    const query = `update alumno set
                  nombres=?,apellidos=?,dni=? where id=?`

    cn.query(query,[nombres,apellidos,dni,id],
        (err,rows,fields)=>{
        if(!err){
            res.json({
                'status':true,
                'content':'Employee Updated'
            })
        }else{
            console.log(err);
        }
    })
})

app.delete('/alumno/:id',function(req,res){
    const {id} = req.params;
    const query = `delete from alumno 
                    where id=?`

    cn.query(query,[id],
        (err,rows,fields)=>{
        if(!err){
            res.json({
                'status':true,
                'content':'Employee Deleted'
            })
        }else{
            console.log(err);
        }
    })
})



//Server
app.listen(app.get('port'),() =>{
    console.log(`Server running at http://localhost:${app.get('port')}`);
})