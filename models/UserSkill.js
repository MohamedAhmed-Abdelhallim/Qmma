const { Sequelize, DataTypes } = require('sequelize')
const Company = require('./Company')
const User = require('./User')
const Skill = require('./Skill')
const sequelize = new Sequelize("QmmaTechv2", "ali", "foo", {
    dialect: 'mssql',
    host: 'localhost',
    logging: false
})

const UserSkill = sequelize.define('UserSkill', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    skillLevel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
    Description: DataTypes.TEXT
}, {
    timestamps: false
})

Company.hasOne(UserSkill, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(UserSkill, {
    foreignKey: {
        name: 'UserID',
        allowNull: false
    },
    onDelete: "NO ACTION",
})

User.hasOne(UserSkill, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(UserSkill, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Skill.hasOne(UserSkill, {
    foreignKey: {
        name: "skillID",
        allowNull: false
    },
    onDelete: "NO ACTION",
})


UserSkill.sync({ alter: true })
    .then(() => console.log("UserSkill table Synced"))
    .catch(err => console.log('error while syncing UserSkill table ' + err))



module.exports = UserSkill