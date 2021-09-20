
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('markets').del()
    .then(function () {
      // Inserts seed entries
      return knex('markets').insert([
        {market_id: 1, market_name: 'WholerFoods', user_id: 1 },
        {market_id: 2, market_name: 'Not Walmart', user_id: 2 },
        {market_id: 3, market_name: 'Not Amazon', user_id: 3 }
      ]);
    });
};
