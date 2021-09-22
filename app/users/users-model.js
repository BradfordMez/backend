const db = require("../../Data/db-config");

function findBy(filter) {
  return db("users as u").where(filter).first();
}
function findById(id) {
  return db("users").where("user_id", id).first();
}
async function add(user) {
  const [user_id] = await db("users").insert(user);
  return findById(user_id);
}
function update(id, changes) {
  return db("users")
    .where("user_id", id)
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}
function get() {
  return db("users");
}
module.exports = {
  findBy,
  add,
  findById,
  update,
  get,
};
