const { Sequelize, DataTypes } = require('sequelize')
const connectionConfig = require('../configuration/config')
const Campaign = require('./Campaigns')
const LookUpData = require('./LookUpData')


const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const CampaignMessageList = sequelize.define("CampaignMessageList" , {
    ListID : {
        type : DataTypes.INTEGER,
        primaryKey : true , 
        autoIncrement : true
    },
    ListName : {
        type : DataTypes.STRING(300),
        allowNull : false
    },
    From_Serial : DataTypes.INTEGER,
    To_Serial : DataTypes.INTEGER,
    From_Date : DataTypes.DATE,
    To_Date : DataTypes.DATE,
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

LookUpData.hasOne(CampaignMessageList, {
    foreignKey: {
        name: 'ListStatus_ID',
    }
})

Campaign.hasOne(CampaignMessageList, {
    foreignKey: {
        name: "CampaignID",
        allowNull: false
    },
    onDelete: "NO ACTION"
})


CampaignMessageList.sync()
.then(() => console.log("CampaignMessageList table Synced"))
.catch(err => console.log('error while syncing CampaignMessageList table ' + err))

module.exports = CampaignMessageList