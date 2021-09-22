const db = require("../../Data/db-config");

function get() {
  return db("items as i")
    .leftJoin("markets as m", "i.market_id", "m.market_id")
    .select(
      "i.item_id",
      "m.market_id",
      "i.item_description",
      "i.item_name",
      "i.item_price"
    );
}
function add(item) {
    return db("items")
    .insert(item)
    .then(([item_id])=>{
        return db('items').where('item_id', item_id).first()
    })
}

module.exports = {
  get,
  add,
};
