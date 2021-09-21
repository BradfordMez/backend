const router = require("express").Router();
const Items = require("./items-model");
const { restricted } = require('../middleware/user-middleware')
const itmid = require('../middleware/item-middleware')

router.get("/", (req, res, next) => {
  Items.get()
    .then((items) => {
      res.json(items);
    })
    .catch(next);
});
router.post("/", restricted, itmid.validateItem, (req, res, next) => {
    // console.log('this is postacallcal or whatever', req.body)
  Items.add(req.body)
    .then(addedItem => {
      res.status(201).json(addedItem);
    })
    .catch(next);
});
router.put('/:item_id', restricted, itmid.validateItem, (req, res, next)=>{
  //////////////////////////////////////////////////////////////
})



module.exports = router;
