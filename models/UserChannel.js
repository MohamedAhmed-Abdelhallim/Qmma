const {Sequelize , DataTypes } = require('sequelize')
const Company = require('./Company')
const LookUpData = require('./LookUpData')
const connectionConfig = require('../configuration/config')
const User = require('./User')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const UserChannel = sequelize.define('UserChannel',{
    ID :{
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    LoginStatus : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    EnabledStatus : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    AutoAnswer :{
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    MaxInteractions : DataTypes.INTEGER,
    UpdateDate :DataTypes.DATE ,
    StatusID : DataTypes.INTEGER,
    CreationUserID : DataTypes.INTEGER,
    UpdateUserID : DataTypes.INTEGER,
},{
    timestamps : false
});

User.hasMany(UserChannel,{
    foreignKey :{
        name : "UserID",
        allowNull : false
    }
})

Company.hasMany(UserChannel,{
    foreignKey :{
        name : 'CompanyID'
    },
    onDelete : "NO ACTION"
})

LookUpData.hasOne(UserChannel,{
    foreignKey :{
        name : 'ChannelID'
    },
    onDelete : "NO ACTION"
})
UserChannel.belongsTo(LookUpData)

UserChannel.sync()
    .then(() => {
        console.log("UserChannel Table synced")
    }).catch((err) => console.log("error while syncing UserChannel table " + JSON.stringify(err)))

module.exports = UserChannel

