const fs = require("fs");
const path = require("path");
const productosFilePath = path.join(__dirname,
"../data/productos.json");
const productos = JSON.parse(fs.readFileSync(productosFilePath,
"utf-8"));

const productosController = {
    home: (req,res) => {
        res.render("home",
        {productos
        })
    },
    
    list: (req,res) => {
        res.render("products/list",
        {productos
        })
    },
    create: (req,res) => {
        res.render("products/creacionProd");
    },

    stock: (req,res) => {
        const newProduct = {
            id: productos.length + 1,    
            ...req.body,   
            imagen:req.body.imagen,           
            articulo:req.body.articulo,
            modelo:req.body.modelo,
            descripcion:req.body.descripcion,
            precio:req.body.precio
        }
        productos.push(newProduct);
        //fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "))
        res.redirect("../products/list");

    },
    
    detail: (req, res) => {
		let idProduct = req.params.id;
		let product = productos.find(product => product.id == idProduct)
	    res.render("products/detail",
        {id:product.id,product
        })
    },
     delete: (req, res) => {
		let idProduct = req.params.id;
		let product = productos.find(product => product.id == idProduct)
	    res.render("products/delete",
        {id:product.id,product
        })
    },   
    destroy: (req, res) => {
		let id = req.params.id 
		let finalProducts = productos.filter(producto => producto.id != id) 

  		fs.writeFileSync(productosFilePath, JSON.stringify(finalProducts,
        null,
        " "));                  
        res.redirect("/products/list");        
        location.reload();
    },

    editProd: (req,res)=>{
   
     let producto = JSON.parse(fs.readFileSync(path.resolve(__dirname,
        "../data/productos.json")));
     const ProId = req.params.id;
     let editProduct= producto.find(producto=> producto.id == ProId);
     res.render(path.resolve(__dirname,
        "../views/products/edicionProd"),
        {editProduct
        });
    },

   update: (req,res) =>{
    let productoUpd = JSON.parse(fs.readFileSync(path.resolve(__dirname,
        "../data/productos.json")));
    req.body.id = req.params.id;
    let ProductosUpdate = productoUpd.map(productoUd =>{
        if(productoUd.id == req.body.id){
            return productoUd = req.body;
            }
        return productoUd;
        })
    let ActualizarPro = JSON.stringify(ProductosUpdate,
        null,
        2);
    fs.writeFileSync(path.resolve(__dirname,
        "../data/productos.json"),ActualizarPro)
    res.redirect("/products/list");
    },
}



module.exports = productosController;