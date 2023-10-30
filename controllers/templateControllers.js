const Template = require('../models/Template')

const create = async(req,res)=>{
    try {
        const template =  await Template.create(req.body)
        res.status(200).send(template) 
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
        const  template= await Template.findByPk(req.params.templateID)
        if(template) res.status(200).send(template)
        else res.status(400).send("requested template is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const template = await Template.findAll()
        res.status(200).send(template)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.templateID) throw 3
        const template = await Template.destroy({
            where : {
                TemplateID : req.body.templateID
            }
        })
        if(template) res.status(200).send('template deleted')
        else res.status(400).send("the requested template is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("template is not defined")
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