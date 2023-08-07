var knex = require("../database/connection");
var bcrypt = require("bcrypt");

// Service
class User {

    async findAll() {
        try {
            var result = await knex.select(["id", "email", "role", "name"]).table("users");
            return result;
        }catch(e) {
            console.log();
            return [];
        }
    }


    async findById(id) {
        try {
            var result = await knex.select(["id", "email", "role", "name"]).where({id:id}).table("users");
            
            if(result.length > 0) {
                return result[0];
            } else return undefined;

        }catch(e) {
            console.log();
            return undefined;
        }
    }


    async new(email, password, name) {
        try {

            var hash = await bcrypt.hash(password,10);
            
            await knex.insert({email, password:hash,name, role:0}).table("users");
            
        }catch(e) {
            console.log(e);
        }
    }

    async findEmail(email) {

        try {
            var result = await knex.select("*").from("users").where({email:email});
            
            //array
            if(result.length > 0) {
                return true;
            }else return false;
            
        }catch(e) {
            console.log(e);
            return false;
        }
    }
 





}

module.exports = new User();