const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
//dotenv.config();

const connection = mysql.createConnection({
    host:`/cloudsql/${process.env.DB_INSTANCE}`,
    user:process.env.DB_USER,
    //password:process.env.PASSWORD,
    database:process.env.DB_NAME,
    socketPath:`/cloudsql/${process.env.DB_INSTANCE}`
});

connection.connect((err) => {
    if(!!err){
        console.log(err.message);
    }
    console.log('db '+ connection.state);
});

class DbService {
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllData(){
        try{
            const response = await new Promise((resolve,reject)=>
            {
                const query = "SELECT * FROM names;";

                connection.query(query, (err, results)=>{
                    if(!!err) reject(new Error(err.message));
                    resolve(results);
                })
            })

            return response;
        }
        catch(e){
            console.log(e);
        }
    }

    async insertNewShip(ship){
        try{

            const insertID = await new Promise((resolve,reject)=>
            {
                const query = "INSERT INTO ships (Description, Port, Ship, User) VALUES (?,?,?,?);";

                connection.query(query, [ship.description, ship.port, ship.ship, ship.username], (err, result)=>{
                    if(!!err) reject(new Error(err.message));
                    resolve(result.insertId);
                })
            });
            return insertID;
        }
        catch(e){
            console.log(e);
        }
  
    }
    async getShip(ship){
        const intermediate = `'${ship}'`
        try{
            const response = await new Promise((resolve,reject)=>
            {
                const query = "SELECT * FROM `ships` WHERE `Ship` = " + intermediate;

                connection.query(query, (err, results)=>{
                    if(!!err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            
            return response;
        }
        catch(e){
            console.log(e);
        }
    }
    async loginAttempt(un, pw){
        try{
            const uni = `'${un}'`
            const pwi = `'${pw}'`
            const response = await new Promise((resolve, reject)=>{
                const query = "SELECT * FROM `users` WHERE `Username` = " + uni +"AND `Password` = " +pwi +";";

                connection.query(query, (err, results)=>{
                    if (!!err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return response;
        }
        catch{

        }
    }  
}

module.exports = DbService;