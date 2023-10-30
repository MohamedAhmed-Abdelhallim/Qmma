const Role = require('../models/Role')

const create = async(req,res) =>{
    try {
        const role = await Role.create(req.body)
        res.status(200).send(role)
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else res.sendStatus(500)
    }
}

const find = async (req,res) =>{
    try {
        const role = await Role.findByPk(req.params.roleid)
        if(role) res.status(200).send(role)
        else res.status(400).send("requested role is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const roles = await Role.findAll()
        res.status(200).send(roles)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async (req,res) =>{
    try {
        if(!req.body.roleID) throw 3
        const role = await Role.destroy({
            where : {
                RoleID : req.body.roleID
            }
        })
        if(role) res.status(200).send('role deleted')
        else res.status(400).send("the requested role is not exist")
    } catch (error) {
        if (error === 3) res.status(400).send("role is not defined")
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