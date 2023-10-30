const UserSkill = require('../models/UserSkill')

const create = async(req,res) =>{
    try {
        const userSkill = await UserSkill.create(req.body)
        res.status(200).send(userSkill)
    } catch (error) {
        console.log("error while creating a new userSkill " + error)
        let errorMessage = errorHandler(error)
        res.status(400).send(errorMessage)
    }
}

const find = async(req,res)=>{
    try {
        const userSkill = await UserSkill.findByPk(req.params.userSkillID)
        if(userSkill) res.status(200).send(userSkill)
        res.status(400).send("requested user skill is deleted or not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const findAll = async(req,res)=>{
    try {
        const userSkills = await UserSkill.findAll()
        res.status(200).send(userSkills)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const remove = async(req,res) =>{
    try {
        const userSkill = await UserSkill.destroy({
            where :{
                id : req.body.id
            }
        })
        if(userSkill) res.status(200).send("user skill deleted")
        else res.status(400).send("the requested user skill is not exist")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

const errorHandler = (error) =>{
    if(error.hasOwnProperty('name') && error.name === 'SequelizeForeignKeyConstraintError')
            return 'Validation Error ,, one or more of the data dont exist'
}

module.exports = {
    create,
    find,
    findAll,
    remove
}