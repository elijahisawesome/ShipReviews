const express = require('express');
const app = express();
const cors = require('cors');
const dotevn = require('dotenv');
dotevn.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//create
app.post('/insert', (request, response)=>{
    const {ship} = request.body;

    const db = dbService.getDbServiceInstance();
    const result = db.insertNewShip(ship);

    result
    .then(data => response.json({data: data}))
    .catch(e=>console.log(e))
});


//read
app.get(`/getShip/:ship`, (request, response)=>{

    const db = dbService.getDbServiceInstance();
    const result = db.getShip(request.params.ship);

    result
    .then(data=>{
        response.json({data:data})
    })
    .catch(e=>{console.log(e)})
})


//update



//delete



app.listen(process.env.PORT, ()=> console.log('app is running'));