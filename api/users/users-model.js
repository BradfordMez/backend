const db = require('../../Data/db-config');

function findBy(filter){
    return db('users as u')
    .where(filter)
    .first()
}
function findById(user_id){
    return db('users').where({user_id}).first()
}
async function add(user){
    const [user_id] = await db('users').insert(user)
    return findById(user_id)
}
module.exports = {
    findBy,
    add,
}