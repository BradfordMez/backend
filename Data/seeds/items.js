
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {item_id: 1, item_name: 'Granny Smith', item_description: 'Description would be here', item_price: '1.20', market_id: '1' },
        {item_id: 2, item_name: 'Cherry Tomatoes',  item_description: 'Description would be here', item_price: '.59', market_id: '1' },
        {item_id: 3, item_name: 'Chicken Breast', item_description: 'Description would be here', item_price: '3.50', market_id: '3' },
        {item_id: 4, item_name: 'WonderBread', item_description: 'Description would be here', item_price: '3.50', market_id: '2' },
        {item_id: 5, item_name: 'Lays', item_description: 'Description would be here', item_price: '5.24', market_id: '2' },
        {item_id: 6, item_name: 'Ham', item_description: 'Description would be here', item_price: '2.50', market_id: '3' },
        {item_id: 7, item_name: 'Natures Own', item_description: 'Description would be here', item_price: '3.00', market_id: '3' }
      ]);
    });
};
