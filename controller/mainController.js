




const mainController = {
    home: (req,res) => {
        res.render("home",{title:"ARTESMARIACE TEJIDOS"})
    },    
    
    contacto: (req,res) => {
        res.render("contacto",{title:"ARTESMARIACE TEJIDOS CONTACTO"})
    }    

}

module.exports = mainController;