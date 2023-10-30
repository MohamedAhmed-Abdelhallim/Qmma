const TemplateVars = require('../models/TemplateVariables')

const create = async(req,res)=>{
    try {
        const templateVars =  await TemplateVars.create(req.body)
        res.status(200).send(templateVars) 
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
        const  templateVars= await TemplateVars.findByPk(req.params.templateVarsID)
        if(templateVars) res.status(200).send(templateVars)
        else res.status(400).send("requested templateVars is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const templateVars = await TemplateVars.findAll()
        res.status(200).send(templateVars)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.templateVarsID) throw 3
        const templateVar = await TemplateVars.destroy({
            where : {
                VariableID : req.body.templateVarsID
            }
        })
        if(templateVar) res.status(200).send('templateVar deleted')
        else res.status(400).send("the requested templateVar is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("templateVar is not defined")
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