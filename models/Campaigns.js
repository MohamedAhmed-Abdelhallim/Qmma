const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Company = require('./Company')
const User = require('./User')
const Workspace = require('./Workspace')
const Template = require('./Template')
const LookUpData = require('./LookUpData')
const Team = require('./Team')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const Campaign = sequelize.define("Campaign" , {
    CampaignID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    CampaignName : {
        type : DataTypes.STRING(300),
        allowNull : false
    },
    ShortCode : DataTypes.STRING(300),
    WorkFlowID : DataTypes.INTEGER,
    BatchRecords : DataTypes.INTEGER,
    ScheduleID : DataTypes.INTEGER,
    CampaignDescription : DataTypes.TEXT,
    CampaignLink : DataTypes.STRING(300),
    CampaignDiscountCode : DataTypes.STRING(300),
    CampaignStatusID : DataTypes.INTEGER,
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

Company.hasOne(Campaign, {
    foreignKey: {
        name: 'CompanyID',
        allowNull: false
    }
})

User.hasOne(Campaign, {
    foreignKey: {
        name: "CreationUserID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

User.hasOne(Campaign, {
    foreignKey: {
        name: "UpdateUserID"
    },
    onDelete: "NO ACTION"
})

Workspace.hasOne(Campaign, {
    foreignKey: {
        name: "WorkspaceID"
    },
    onDelete: "NO ACTION"
})

Template.hasOne(Campaign, {
    foreignKey: {
        name: "TemplateID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

Team.hasOne(Campaign, {
    foreignKey: {
        name: "AssignedTeamID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})

LookUpData.hasOne(Campaign, {
    foreignKey: {
        name: "CampaignTypeID"
    },
    allowNull : false,
    onDelete: "NO ACTION"
})



 
Campaign.sync()
.then(() => console.log("Campaign table Synced"))
.catch(err => console.log('error while syncing Campaign table ' + err))

module.exports = Campaign

