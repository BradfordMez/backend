const db = require('../../Data/db-config')
const { restricted } = require('../middleware/user-middleware')

function get(){
    return db('markets as m')
    .leftJoin('users as u', 'm.user_id', 'u.user_id')
    .select('m.market_id', 'm.market_name', 'u.user_id')
}
async function getByMarketId(market_id){
    const response = await db('markets as m')
    .leftJoin('users as u', 'm.user_id', 'u.user_id')
    .leftJoin('items as i', 'm.market_id', 'i.market_id')
    .select('m.market_id', 'm.market_name', 'u.user_id', 'u.name', 'i.*')
    .where('m.market_id', market_id)

    const result = {
        market_id: response[0].market_id,
        market_name: response[0].market_name,
        user_id: response[0].user_id,
        name: response[0].name,
        items : response[0].item_id
            ? response.map((res)=>({
                item_id: res.item_id,
                item_name: res.item_name,
                item_description: res.item_description,
                item_price: res.item_price

            })) : [],
    }
    return result
}
function add(market){
    return db('markets')
    .insert(market)
    .then(([market_id])=>{
        return db('markets').where('market_id', market_id).first()
    })
}


module.exports = {
    get,
    getByMarketId,
    add
}