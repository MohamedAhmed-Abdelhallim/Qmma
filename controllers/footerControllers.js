const Footer = require('../models/Footer')

const create = async(req,res)=>{
    try {
        const footer =  await Footer.create(req.body)
        res.status(200).send(footer) 
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
        const  footer= await Footer.findByPk(req.params.footerID)
        if(footer) res.status(200).send(footer)
        else res.status(400).send("requested footer is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const footer = await Footer.findAll()
        res.status(200).send(footer)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.footerID) throw 3
        const footer = await Footer.destroy({
            where : {
                FooterID : req.body.footerID
            }
        })
        if(footer) res.status(200).send('footer deleted')
        else res.status(400).send("the requested footer is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("footer is not defined")
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