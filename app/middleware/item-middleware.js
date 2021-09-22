const db = require("../../Data/db-config");

const validateItem = (req, res, next) => {
  const { item_name, item_description, item_price } = req.body;
  console.log(req.body)
  if (!item_name || typeof item_name !== "string" || !item_name.trim()) {
    next({ status: 400, message: "item name is a required string" });
  }
  if (
    !item_description ||
    typeof item_description !== "string" ||
    !item_description.trim()
  ) {
    next({ status: 400, message: "item description is a required string" });
  }
  if (!item_price) {
    next({ status: 400, message: "item price is required" });
  }
  next();
};


module.exports = {
    validateItem
}
