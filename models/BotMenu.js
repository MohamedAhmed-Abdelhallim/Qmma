const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const Bot = require('./Bot')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const BotMenu = sequelize.define("BotMenu" , {
    BotMenuID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    MenuNameAR : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    MenuNameEN : {
        type : DataTypes.STRING(100),
        allowNull : false
    },
    LangaugeID : DataTypes.INTEGER,
    ErrorMessageID : DataTypes.STRING(10),
    MenuOrder : DataTypes.INTEGER,
    Active : DataTypes.BOOLEAN,
    SubMenusActive : DataTypes.BOOLEAN,
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate: DataTypes.DATE,
    StatusID: DataTypes.INTEGER,
},{
    timestamps : false
})


Company.hasOne(BotMenu, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(BotMenu, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(BotMenu, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(BotMenu, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

Bot.hasOne(BotMenu , {
    foreignKey: {
        name: "BotID"
    },
    onDelete: "NO ACTION"
})

BotMenu.sync()
.then(() => console.log("BotMenu table Synced"))
.catch(err => console.log('error while syncing BotMenu table ' + err))

module.exports = BotMenu