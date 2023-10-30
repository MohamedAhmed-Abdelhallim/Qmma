const TemplateButton = require('../models/TemplateButton')

const create = async(req,res)=>{
    try {
        const templateButton =  await TemplateButton.create(req.body)
        res.status(200).send(templateButton) 
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
        const  templateButton= await TemplateButton.findByPk(req.params.templateButtonID)
        if(templateButton) res.status(200).send(templateButton)
        else res.status(400).send("requested templateButton is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const templateButtons = await TemplateButton.findAll()
        res.status(200).send(templateButtons)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.templateButtonID) throw 3
        const templateButton = await TemplateButton.destroy({
            where : {
                ButtonID : req.body.templateButtonID
            }
        })
        if(templateButton) res.status(200).send('templateButton deleted')
        else res.status(400).send("the requested templateButton is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("templateButton is not defined")
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