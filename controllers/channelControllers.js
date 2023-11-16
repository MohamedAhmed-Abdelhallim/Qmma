const ld_lt_helpers = require('../helpers/lookupData_Table')

const findAll = async (req, res) => {
    try {
        let channels =await ld_lt_helpers.find_ld_linked_lt('Channel')
        res.status(200).send(channels)
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

const remove = async(req,res)=>{
    try {
        await  ld_lt_helpers.remove_ld(req.query.ChannelID)
        res.status(200).send('Channel deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}



module.exports = {
    findAll,
    remove
}