const connectionConfig = require('../configuration/config')
const {Sequelize , DataTypes } = require('sequelize')

const sequelize = new Sequelize(connectionConfig.database,
    connectionConfig.username, connectionConfig.password, connectionConfig.options)

const queryInterface = sequelize.getQueryinterface();

try{
    queryInterface.changeColumn('LookUpData','LookupDataID' , {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    })
}catch(err){
    console.log('error while updating LookUpData columns')
}
