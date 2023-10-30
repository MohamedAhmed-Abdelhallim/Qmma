const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Campaign = require('./Campaigns')
const Template = require('./Template')


const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const CampaignTemplateVars = sequelize.define("CampaignTemplateVars" , {
    RecordID : {
        type : DataTypes.INTEGER,
        primaryKey :true , 
        autoIncrement : true
    },
    VarID : DataTypes.INTEGER,
    ReadFromID : DataTypes.INTEGER,
    Var_Value : DataTypes.STRING(300),
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

Template.hasOne(CampaignTemplateVars, {
    foreignKey: {
        name: 'TemplateID',
        allowNull: false
    }
})

Campaign.hasOne(CampaignTemplateVars, {
    foreignKey: {
        name: "CampaignID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

CampaignTemplateVars.sync()
.then(() => console.log("CampaignTemplateVars table Synced"))
.catch(err => console.log('error while syncing CampaignTemplateVars table ' + err))

module.exports = CampaignTemplateVars