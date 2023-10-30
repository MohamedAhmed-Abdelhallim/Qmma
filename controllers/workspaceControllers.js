const Workspace = require('../models/Workspace')

const create = async (req, res) => {
    try {
        const workspace = await Workspace.create(req.body)
        res.status(200).send(workspace)
    } catch (error) {
        let errorMessage = errorHandler(error)
        if (errorMessage) res.status(400).send(errorMessage)
        else res.sendStatus(500)
    }
}

const find = async(req,res) =>{
    try {
        const workspace = await Workspace.findByPk(req.params.workspaceID)
        if(workspace) res.status(200).send(workspace)
        else res.status(400).send("requested workspace is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res) =>{
    try {
        const workspaces = await Workspace.findAll()
        res.status(200).send(workspaces)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async(req,res) =>{
    try {
        if (!req.body.workspaceID) throw 3
        const workspace = await Workspace.destroy({
            where :{
                WorkspaceID : req.body.workspaceID
            }
        })
        if(workspace) res.status(200).send('workspace deleted')
        else res.status(400).send("the requested workspace is not exist")
    } catch (error) {
        if (error === 3) res.status(400).send("workspaceid is not defined")
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
    }
}

module.exports = {
    create,
    find,
    findAll,
    remove
}