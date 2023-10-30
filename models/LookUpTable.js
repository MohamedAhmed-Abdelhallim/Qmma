const {Sequelize , DataTypes} = require('sequelize')
const Company = require('./Company')
const User = require('./User')

const sequelize = new Sequelize("QmmaTechv2" , "ali" , "foo" , {
    dialect : 'mssql',
    host : 'localhost'
}) 

const lookUpTable = sequelize.define("lookUpTable" , {
    LookupTableID : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    LookupTableNameArabic : DataTypes.STRING(300),
    LookupTableNameEnglish : DataTypes.STRING(300),
    Description : DataTypes.TEXT,
    CreationDate : DataTypes.DATE,
    UpdateDate : DataTypes.DATE,
    StatusID : DataTypes.STRING(300),
})

Company.hasOne(lookUpTable , {
    foreignKey:"CompanyID",
    as : "companyID",
    onDelete : "NO ACTION"
})

lookUpTable.belongsTo(User,{
    foreignKey : {
        name : "CreatedBY",
        allowNull : false
    },
    as : "createdByUser"
})

User.hasOne(lookUpTable,{
    foreignKey :{
        name : "UpdatedByUserD",
    },
    onDelete : "NO ACTION"
})

lookUpTable.sync()
    .then(() => console.log("lookUpTable synced"))
    .catch(err =>{
        console.log("lookUpTable error while syncing" + err)
    })


module.exports = lookUpTable