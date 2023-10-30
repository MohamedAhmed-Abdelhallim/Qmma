const SubMenu = require('../models/SubMenu')

const create = async(req,res)=>{
    try {
        const subMenu =  await SubMenu.create(req.body)
        res.status(200).send(subMenu) 
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else {
            console.log(error)
            res.sendStatus(500)
        }
    }
}

const find = async (req,res) =>{
    try {
        const  subMenu= await SubMenu.findByPk(req.params.subMenuid)
        if(subMenu) res.status(200).send(subMenu)
        else res.status(400).send("requested subMenu is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const subMenus = await SubMenu.findAll()
        res.status(200).send(subMenus)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.subMenuID) throw 3
        const subMenu = await SubMenu.destroy({
            where : {
                SubMenuID : req.body.subMenuID
            }
        })
        if(subMenu) res.status(200).send('subMenu deleted')
        else res.status(400).send("the requested subMenu is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("subMenu is not defined")
        else res.status(500).send("Internal Server Error")
    }
}


const errorHandler = (error) => {
    if (error.hasOwnProperty('name') && error.name === 'SequelizeForeignKeyConstraintError')
        return 'Validation Error ,, one or more of the data dont exist'
    else if (error.hasOwnProperty('name') && error.name === 'SequelizeValidationError'){
            let ValidationErrorItem = error.errors[0]
            if (ValidationErrorItem.validatorKey === 'is_null'){
                return `${ValidationErrorItem.path} cannot be empty`
            }
    }else if(error.hasOwnProperty('name') && error.name === 'SequelizeUniqueConstraintError'){
            return `${error.errors[0].value} is already exist`
    }
}

module.exports = {
    create,
    find,
    findAll,
    remove
}