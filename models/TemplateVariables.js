const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const Template = require('./Template')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const TemplateVaribles = sequelize.define("TemplateVaribles" , {
    VariableID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    VariableName : {
        type : DataTypes.STRING(300),
        allowNull : false
    },
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
    Description : DataTypes.INTEGER
},{
    timestamps : false
})

Company.hasOne(TemplateVaribles, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(TemplateVaribles, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(TemplateVaribles, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(TemplateVaribles, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

Template.hasOne(TemplateVaribles, {
    foreignKey: {
        name: "TemplateID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})



 
TemplateVaribles.sync()
.then(() => console.log("TemplateVaribles table Synced"))
.catch(err => console.log('error while syncing TemplateVaribles table ' + err))

module.exports = TemplateVaribles