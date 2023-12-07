import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let tasks = [];

app.get("/", (req, res) => {
    let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options);

    res.render("index.ejs" ,{
        currentDay: day,
        newListItems: tasks
    });
});

app.post("/", (req, res)=> {
    let task = req.body["task"];
    tasks.push({task, completed: false});
    res.redirect("/");
});


app.listen(port, () =>{
    console.log(`server running on port ${port}.`);
});

