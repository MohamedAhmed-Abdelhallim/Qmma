const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

    const Bot = sequelize.define("Bot" , {
        BotID :{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        Order : DataTypes.INTEGER,
        BotLanguageID : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        BotNameAR : {
            allowNull : false,
            type :DataTypes.STRING(300),
            unique : true
        },
        BotNameEN : {
            type : DataTypes.STRING(300),
            allowNull : false,
            unique : true
        },
        LanguageKeywordsAR : DataTypes.STRING(300),
        LanguageKeywordsEN : DataTypes.STRING(300),
        LangaugeChangeMessageARID : DataTypes.INTEGER,
        LangaugeChangeMessageENID : DataTypes.INTEGER,
        BlockCustomersFromBotFlag : DataTypes.BOOLEAN,
        BlockCustomersFromBotMenuID : DataTypes.INTEGER,
        BlockCustomersFromCCFlag : DataTypes.BOOLEAN,
        BlockCustomersFromCCMenuID : DataTypes.INTEGER,
        BlockCustomersFromCampaignsFlag : DataTypes.BOOLEAN,
        BlockCustomersFromCampaignsKeywordsID : DataTypes.INTEGER,
        BlockActivationFromCampaignsMenuID : DataTypes.INTEGER,
        BlockDeActivationFromCampaignsMenuID : DataTypes.INTEGER,
        DescriptionAr : DataTypes.STRING(300),
        DescriptionEn : DataTypes.STRING(300),
        BotCode : DataTypes.STRING(300),
        EnableChatBotInactivityTime : DataTypes.BOOLEAN,
        InactivityTIme : DataTypes.INTEGER,
        CreationDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        UpdateDate: DataTypes.DATE,
        StatusID: DataTypes.INTEGER,
    } , {
        timestamps : false
    })

    Company.hasOne(Bot, {
        foreignKey: {
            name: 'CompanyID',
            allowNull: false
        }
    })
    
    User.hasOne(Bot, {
        foreignKey: {
            name: "CreationUserID",
            allowNull: false
        },
        onDelete: "NO ACTION"
    })
    
    User.hasOne(Bot, {
        foreignKey: {
            name: "UpdateUserID"
        },
        onDelete: "NO ACTION"
    })
    
    Workspace.hasOne(Bot, {
        foreignKey: {
            name: "WorkspaceID"
        },
        onDelete: "NO ACTION"
    })

    Bot.sync()
    .then(() => console.log("Bot table Synced"))
    .catch(err => console.log('error while syncing Bot table ' + err))

module.exports = Bot