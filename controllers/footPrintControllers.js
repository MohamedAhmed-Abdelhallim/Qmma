const FootPrint = require('../models/FootPrint')

const create = async(req,res)=>{
    try {
        const footPrint = await FootPrint.create(req.body)
        res.status(200).send(footPrint)
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else res.sendStatus(500)
    }
}

const find = async (req,res) =>{
    try {
        const footPrint = await FootPrint.findByPk(req.params.footPrintid)
        if(footPrint) res.status(200).send(footPrint)
        else res.status(400).send("requested footPrint is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const footPrints = await FootPrint.findAll()
        res.status(200).send(footPrints)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.footPrintID) throw 3
        const footPrint = await FootPrint.destroy({
            where : {
                ID : req.body.footPrintID
            }
        })
        if(footPrint) res.status(200).send('footPrint deleted')
        else res.status(400).send("the requested footPrint is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("footPrint is not defined")
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