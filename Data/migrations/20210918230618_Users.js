exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username").notNullable().unique();
      users.string("name");
      users.string("password").notNullable();
    })
    .createTable('markets', (markets)=>{
      markets.increments("market_id");
      markets.string("market_name").notNullable().unique()
      markets
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
    .createTable("items", (items) => {
      items.increments("item_id");
      items.string("item_name").notNullable();
      items.string("item_description").notNullable();
      items.decimal("item_price", 10, 2).notNullable();
      items
        .integer("market_id")
        .unsigned()
        .notNullable()
        .references("market_id")
        .inTable("markets")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    })
};

exports.down = function (knex) {
  return knex.schema
  .dropTableIfExists("items")
  .dropTableIfExists('markets')
  .dropTableIfExists("users");
};
