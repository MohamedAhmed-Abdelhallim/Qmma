const Header = require('../models/Header')

const create = async(req,res)=>{
    try {
        const header =  await Header.create(req.body)
        res.status(200).send(header) 
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
        const  header= await Header.findByPk(req.params.headerID)
        if(header) res.status(200).send(header)
        else res.status(400).send("requested header is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const header = await Header.findAll()
        res.status(200).send(header)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.headerID) throw 3
        const header = await Header.destroy({
            where : {
                HeaderID : req.body.headerID
            }
        })
        if(header) res.status(200).send('header deleted')
        else res.status(400).send("the requested header is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("header is not defined")
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