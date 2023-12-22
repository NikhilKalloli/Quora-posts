const exp = require("constants");
const express = require("express");
const app =express();
const port = 3000;
const path = require("path");
const {v4:uuidv4} = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public"))); 
app.use(methodOverride("_method"))


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// Usually we get data from databases but here we will use this array.
let posts = [
    {
        //Giving unique id using uuid pakage
        id:uuidv4(),
        username : "Nikhil",
        content: "I'm learning RESTful APIs",
    },

    {
        id:uuidv4(),
        username : "Harry",
        content: "I'm in Hogwarts",
    },

    {
        id:uuidv4(),
        username : "Lisa",
        content: "I'm enjoying in San Franisco",
    },
]



//Index route --> to get data for all posts
app.get("/posts", (req,res) =>{
    res.render("index.ejs", { posts });
});

//Create & New Route --> Creating new posts.
//The below route is to handle the form i.e. Display a form (Serve the form)
app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
})

//The below route is to handle the form data i.e. Add a new post
app.post("/posts",(req,res) =>{
    let {username, content } = req.body;
    let id = uuidv4();
    posts.push({id , username, content});
    res.redirect("/posts")
})


//The below route is to find a particular post in detail
app.get("/posts/:id",(req,res) =>{
  let {id} = req.params;
  let post = posts.find((p) => id===p.id); // Created a function to find the id in the array of posts and assigning it to a variable post
  //If id not found then make error.ejs and render it for that case

  res.render("show.ejs",{ post }); 
})

//Patch request to update the content
// HTML forms can only send get and post requests. We use a pakage called method-override to send patch requests from html forms. It basically overrides the request
app.patch("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id===p.id);
    post.content = newContent;
    // res.send("Patch request received");
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id===p.id);
    res.render("edit.ejs", { post });
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
     posts = posts.filter((p) => id!==p.id);
     res.redirect("/posts")
})

 app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
 });