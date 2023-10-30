const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Campaign = require('./Campaigns')
const CampaignMessageList = require('./CampaignMessageList')


const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const CampaignResult = sequelize.define("CampaignResult" , {
    RecordID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    TempRecordID : DataTypes.INTEGER,
    BuisnessNumber : DataTypes.INTEGER,
    CustomerID : DataTypes.INTEGER,
    CustomerPhone : DataTypes.STRING(20),
    MessageBody : DataTypes.TEXT,
    ScheduleDate : DataTypes.DATE,
    SentDate : DataTypes.DATE,
    DelieveryDate : DataTypes.DATE,
    ReadDate : DataTypes.DATE,
    DelieveryStatusID : DataTypes.INTEGER,
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

CampaignMessageList.hasOne(CampaignResult, {
    foreignKey: {
        name: 'List_ID',
    }
})

Campaign.hasOne(CampaignResult, {
    foreignKey: {
        name: "CampaignID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})

CampaignResult.sync()
.then(() => console.log("CampaignResult table Synced"))
.catch(err => console.log('error while syncing CampaignResult table ' + err))

module.exports = CampaignResult