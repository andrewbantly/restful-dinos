const express = require("express");
const router = express.Router();
const fs = require("fs")
router.use(express.urlencoded({extended:false}))

//FUNCTION 

// helper function to read the dino database
const readDinos = () => {
    // use the filesystem to read the dino json
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    // console.log(dinosaurs)
    // parse the raw json to js
    const dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData[0].name)
    // return the dino data
    return dinoData
}
// readDinos()



// routes
// GET /dinosaurs -- READ an array of dinos
router.get("/", (req, res) => {
    console.log(req.query)
    // res.send("READ array of dinos")
    let dinos = readDinos();

    // if the user has search, filter the dinos array
    if(req.query.dinoName) {
        dinos=dinos.filter(dino => {
            // compare lower case strings for case insensativity
            return dino.name.toLowerCase().includes(req.query.dinoName.toLowerCase())
        })
    }

    // res.send(dinos)
    res.render("dinosaurs/index.ejs", {
        //equal to { dinos: dinos }
        dinos
    })
})

// GET /dinosaurs/new -- show route for a form that posts to POST /dinosaurs
router.get("/new", (req, res) => {
    // res.send("show a form that will host a new dino")
    res.render("dinosaurs/new.ejs")
})

// POST /dinosaurs -- create a new dino in the database
router.post('/', (req, res) => {
    console.log(req.body)
    const dinos = readDinos();
    // push the dino from the req.body into the array json dinos
    dinos.push(req.body);
    // write the json file to save to disk
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinos))
    // tell the browser to redirect 
    res.redirect('/dinosaurs') // could also re route to '/dinosaurs/:id' (page isn't built at this moment)
    // do another GET request on a specific url  
    res.send("CREATE a new dino!")
})

// GET /dinosaurs/:id -- READ a single dino @ :id
router.get("/:id", (req, res) => {
    //read the dino json data
    const dinos = readDinos()
    // look up one dino using the req.params
    const foundDino = dinos[req.params.id]
    // render the details template
    res.render("dinosaurs/details.ejs", {
        dino: foundDino,
        id: req.params.id
    })
    // res.send("show details about dino: " + req.params.id)
})
























module.exports = router;