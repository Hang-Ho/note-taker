console.log(__dirname)
var path = require("path");
var db = require("../db/db.json");
var id = db.length + 1;
var fs = require("fs");
function routes (app){
   app.get("/notes", function(req, res){
        res.sendFile(path.join(__dirname, "../public/notes.html"));
   })

   app.get("/api/notes", function(req, res){
     res.json(db)
   })

   app.post("/api/notes", function(req, res){
       var newNote = req.body;
       newNote.id = id++;
       db.push(newNote);
       console.log(db)
       fs.writeFile("./db/db.json", JSON.stringify(db), function(err) {
           if (err) {
               console.log(err);
           }
           res.json(db);
       } )
   })

   app.delete("/api/notes/:id", function(req, res) {
       var getId = parseInt(req.params.id);
    
    for (var i =0; i < db.length; i++){
        if (db[i].id === getId) {
            db.splice(i,1);
            break;
         }
    }
    fs.writeFile("./db/db.json", JSON.stringify(db), function(err){
        if(err){
            console.log(err);
        }
        res.json(db);
    })
   })

}
module.exports = routes;