const {Sequelize,DataTypes} = require('sequelize')
const Company = require('./Company')
const User = require('./User')
const sequelize = new Sequelize("QmmaTechv2" , "ali" , "foo" , {
    dialect : 'mssql',
    host : 'localhost',
    logging : false
})

const Skill = sequelize.define("Skill" , {
    SkillID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    SkillName : {
        type : DataTypes.STRING(300),
        allowNull : false,
        unique : true
    },
    Description : DataTypes.TEXT,
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate :DataTypes.DATE ,
    StatusID : DataTypes.INTEGER,
})

Company.hasOne(Skill,{
    foreignKey :{
        name : "CompanyID",
        allowNull : false
    }
})

User.hasOne(Skill,{
    foreignKey :{
        name : "CreatedByUerID",
        allowNull : false
    },
    onDelete  :"NO ACTION"
})

User.hasOne(Skill , {
    foreignKey : "UpdatedByUserD",
    onDelete : "NO ACTION"
})

Skill.sync()
    .then(() => console.log("Skill table Synced"))
    .catch(err => console.log('error while syncing Skill table ' + err))

module.exports = Skill