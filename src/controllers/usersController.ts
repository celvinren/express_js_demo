const db = require('../config/database');

async function getUsers(req:any,res: any) {
    console.log('GET /users');
    console.log(req.user);
    try {
        const result = await db.query('SELECT id, firstname, lastname, email FROM users');
        const userList = result.rows;

        // console.log(result);
        res.json(userList);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error while getting current time");
    }
}
  
async function getUser(req:any,res: any) {
    console.log('GET /users');
    try {
        const result = await db.query('SELECT id, firstname, lastname, email FROM users where id = $1', [req.params.id]);
        const user = result.rows;

        // console.log(result);
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error while getting current time");
    }
}

export {
    getUser, getUsers
};
  