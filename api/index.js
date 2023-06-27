//jshint esversion:6
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const dbconnection = async ()=>{
  try{
      const conn = await mongoose.connect("mongodb+srv://harshith:Harshit30***@cluster0.31pzqin.mongodb.net/?retryWrites=true&w=majority");
      console.log(conn.connection.host);
  }
  catch(err)
  {
    console.log(err);
  }
}

dbconnection();

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String

});


const item=mongoose.model("item",itemSchema);

const saveInDB = async () => {
  // const item=mongoose.model("item",itemSchema);

  const item1= new item({
   name:"Welcome to your Todolist"
  });
  const item2= new item({
    name:"Hit the + button to add a new item."
  });
  const item3= new item({
   name:"Hit this to delete an item."
  });

  const defaultitems=[item1,item2,item3];
  let data1 = await item.find({})
  if(data1.length===0){ 
    let data=await item.insertMany(defaultitems);
    if(data.acknowledged)
    {
        console.warn("data is inserted")
    }
  }
}
saveInDB();
  
app.get("/", async (req, res) => {
  let result = await item.find({});
  
  res.render("list", {listTitle: "Today", newListItems: result});

});

app.post("/", function(req, res){

  const itemname= req.body.newItem;

  const itm=new item({
    name: itemname
  });
  itm.save();
  res.redirect("/");
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
