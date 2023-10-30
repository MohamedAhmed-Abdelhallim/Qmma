const Message = require('../models/Message')

const create = async(req,res)=>{
    try {
        const message =  await Message.create(req.body)
        res.status(200).send(message) 
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
        const  message= await Message.findByPk(req.params.messageID)
        if(message) res.status(200).send(message)
        else res.status(400).send("requested message is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const message = await Message.findAll()
        res.status(200).send(message)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.messageID) throw 3
        const message = await Message.destroy({
            where : {
                MessageID : req.body.messageID
            }
        })
        if(message) res.status(200).send('message deleted')
        else res.status(400).send("the requested message is not exist")
    } catch (error) {
        console.log(error)
        if (error === 3) res.status(400).send("message is not defined")
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