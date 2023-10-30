const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const Bot = require('./Bot')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const SubMenu = sequelize.define("SubMenu" , {
    SubMenuID : {
        type : DataTypes.INTEGER,
        primaryKey : true , 
        autoIncrement : true
    },
    ParentMenuID : DataTypes.INTEGER,
    Order : DataTypes.INTEGER,
    Active : DataTypes.BOOLEAN,
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
})

Company.hasOne(SubMenu, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(SubMenu, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(SubMenu, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(SubMenu, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

Bot.hasOne(SubMenu , {
    foreignKey: {
        name: "BotID"
    },
    onDelete: "NO ACTION"
})

SubMenu.sync()
.then(() => console.log("SubMenu table Synced"))
.catch(err => console.log('error while syncing SubMenu table ' + err))

module.exports = SubMenu