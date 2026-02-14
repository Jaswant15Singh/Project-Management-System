const pg=require("pg");
const pool=new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:"project_management",
    password:"password",
    port:5432
}); 
module.exports=pool;