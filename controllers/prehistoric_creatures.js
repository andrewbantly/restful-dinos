const express = require("express");
const router = express.Router();
const fs = require("fs")
router.use(express.urlencoded({extended:false}));

//FUNCTION 
const readCreatures = () => {
    const prehistoricCreature = fs.readFileSync("./prehistoric_creatures.json");
    const creatureData = JSON.parse(prehistoricCreature);
    return creatureData;
}

// GET "/prehistoric_creatures" Index(READ) -- displays all prehistoric creates
router.get("/", (req, res) => {
    // res.send("Show all creature")
    const creatures = readCreatures()
    console.log(creatures)
    res.render("prehistoric_creatures/index.ejs", {
        creatures
    })
})

// GET "/prehistoric_creatures/new" New(READ) -- displays a form for adding a new prehistoric creature 
router.get("/new", (req, res) => {
    // res.send("form for adding new creature")
    res.render("prehistoric_creatures/new.ejs");
})

// POST "/prehistoric_creatures" Create -- creates a prehistoric creature with the POST payload data
router.post("/", (req, res) => {
    // res.send("create prehistoric creature with payload data")
    console.log(req.body)
    const creatures = readCreatures();
    creatures.push(req.body);
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creatures))
    res.redirect("/prehistoric_creatures")
})

// GET "/prehistoric_creatures/:id" Show(READ) -- displays the type and photo of a particular creature
router.get("/:id", (req, res) => {
    // res.send("display individual creature")
    const creatures = readCreatures();
    const foundCreature = creatures[req.params.id]
    res.render("prehistoric_creatures/details.ejs", {
        creature: foundCreature,
        id: req.params.id,
    })
})


module.exports = router;