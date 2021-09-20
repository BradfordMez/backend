exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_id: 1,
          username: "VeganActivist",
          name: "",
          password: "ThisIsAPassword",
        },
        {
          user_id: 2,
          username: "SnackGuy",
          name: "Cameron Mann",
          password: "ThisIsAPassword",
        },
        {
          user_id: 3,
          username: "GeoffUsername",
          name: "Geoff Bezus",
          password: "ThisIsAPassword",
        },
      ]);
    });
};
