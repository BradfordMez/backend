const router = require("express").Router();
const Markets = require("./markets-model");
const {restricted } = require('../middleware/user-middleware')

router.get("/",  (req, res, next) => {
  Markets.get()
    .then((markets) => {
      res.json(markets);
    })
    .catch(next);
});
router.get("/:market_id", (req, res, next)=>{
  const { market_id } = req.params

  Markets.getByMarketId(market_id)
    .then(market=>{
      res.json(market)
    })
    .catch(next)
})
router.post('/', restricted, (req, res, next)=>{
  Markets.add(req.body)
    .then(addedMarket=>{
      res.status(201).json(addedMarket);
    })
    .catch(next)
})

module.exports = router;
