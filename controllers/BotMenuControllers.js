const BotMenu = require('../models/BotMenu')

const create = async(req,res)=>{
    try {
        const botMenu =  await BotMenu.create(req.body)
        res.status(200).send(botMenu) 
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
        const botMenu = await BotMenu.findByPk(req.params.botMenuid)
        if(botMenu) res.status(200).send(botMenu)
        else res.status(400).send("requested botMenu is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const botMenus = await BotMenu.findAll()
        res.status(200).send(botMenus)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.botMenuID) throw 3
        const botMenu = await BotMenu.destroy({
            where : {
                BotMenuID : req.body.botMenuID
            }
        })
        if(botMenu) res.status(200).send('botMenu deleted')
        else res.status(400).send("the requested botMenu is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("botMenu is not defined")
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