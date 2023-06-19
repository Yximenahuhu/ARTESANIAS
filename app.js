const express = require("express");
const app = express();
const path = require("path");
const routerProducto = require("./router/productoRouter");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
 
app.use(express.static("public"));

app.set("view engine",
"ejs");
app.set("views", path.join(__dirname,
"views"));
app.use(express.static(path.join(__dirname,
"public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true
}));
app.use(methodOverride("_method-override")) // si  o si par eliminar  npm install method-override

//app.use(function(req,res,next) {	
//    res.locals.message;
//    res.locals.error = req.app.get("env")*** "development" ?err : {};
//    res.status(err.status || 500);
//    res.render("error");
//}
    

app.listen(3000,() => console.log("Servidor corriendo en el puerto 3000"))

app.use("/",routerProducto);

app.get("/", (req,res) => {
    res.render(__dirname + "/views/home.ejs");
})

module.exports = app;

