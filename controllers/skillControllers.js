const Skill = require('../models/Skill')

const create = async (req, res) => {
    try {
        const skill = await Skill.create(req.body)
        res.status(200).send(skill)
    } catch (error) {
        let errorMessage = `error while creating a new skill ,, ${errorHandler(error)}`
        console.log(errorMessage)
        res.status(500).send(errorMessage)
    }
    
}

const find = async (req, res) => {
    await Skill.findByPk(req.params.skillID)
        .then(data => res.status(200).send(data))
        .catch(err => {
            console.log("error while finding the requested skill " + err)
            res.status(500).send("error")
        })
}

const findAll = async (req, res) => {
    try {
        const skills = await Skill.findAll()
        res.status(200).send(skills)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }

}

const remove = async(req,res) =>{
    try{
        const skill = await Skill.destroy({
            where :{
                SkillID : req.body.skillID
            }
        })
        console.log(skill)
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.status(500).send("error")
    }
}

const errorHandler = (error)=>{
    console.log(error.errors[0].type)
    if( error.hasOwnProperty(errors) && error.errors[0].type === 'unique violation'){
        return `${error.errors[0].value} is already cretaed`
    }
    return ""
}

module.exports = {
    create,
    find,
    findAll,
    remove
}