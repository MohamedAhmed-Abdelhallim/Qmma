const {Sequelize , DataTypes } = require('sequelize')
const Company = require('./Company')
const connectionConfig = require('../configuration/config')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const User = sequelize.define("User" , {
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement : true
    },
    WorkSpaceID: DataTypes.INTEGER,
    NameArabic: DataTypes.STRING(300),
    NameEnglish: DataTypes.STRING(300),
    UserName: {
        type : DataTypes.STRING(300),
        allowNull :false,
        unique : true
    },
    UserPassword: {
        type : DataTypes.STRING(300),
        allowNull : false
    },
    NationalID: DataTypes.STRING(50),
    StaffID: DataTypes.INTEGER,
    ProfileLanguageID: DataTypes.INTEGER,
    DefaultRoleID: DataTypes.INTEGER, //lookup data
    UserMail: {
        type: DataTypes.STRING(300),
        validate: {
            isEmail: true
        }
    },
    UserPhone: DataTypes.STRING(300),
    isAdmin : DataTypes.BOOLEAN,
    CreationDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    UpdateDate :DataTypes.DATE ,
    StatusID : DataTypes.INTEGER,
    CanSeeContactNumber : DataTypes.BOOLEAN,
    CreationUserID : DataTypes.INTEGER,
    UpdateUserID : DataTypes.INTEGER
},{
    timestamps : false
})

Company.hasOne(User,{
    foreignKey :{
        name : "CompanyID",
        allowNull : false
    }
})

User.sync()
    .then(() => {
        console.log("User Table synced")
    }).catch((err) => console.log("error while syncing users table " + JSON.stringify(err)))

module.exports = User
