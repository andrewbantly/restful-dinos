// require packages
const express = require("express");
//typically use a different database tool, not filesystem. Learning that later

// app config
const app = express()
const PORT = 8000
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}))



// CONTROLLERS
app.use("/prehistoric_creatures", require("./controllers/prehistoric_creatures"))
app.use("/dinosaurs", require("./controllers/dinosaurs"))

// GET / --index show route for the app
app.get("/", (req, res) => {
    // res.send("welcome to the dino API")
    res.render("index.ejs")
})


// listen on a port
app.listen(PORT, () => {
    console.log(`Dinos are real on port ${PORT} 🦖`)
})