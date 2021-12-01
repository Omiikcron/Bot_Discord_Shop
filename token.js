const mongo = require('./mongo')
const profileSchema = require('./shemas/profile-schema')

const tokenCache = {} 

module.exports = (client) => { }

module.exports.addToken = async (guildId, userId, dbToken, numberToken) => {
    return await mongo().then(async (mongoose) => {
        try {

                const a = await profileSchema.findOneAndUpdate(
                    {
                        guildId,
                        userId,
                    },
                    {
                        guildId,
                        userId,

                        $inc: {
                            [dbToken]: numberToken,
                        },

                    },
                    {
                        upsert: true,
                        new: true,
                    }
                    
            )
            return a[dbToken]

            console.log(dbToken)

        } finally {
            mongoose.connection.close()
        }
    })
}

module.exports.getToken = async (guildId, userId, dbToken) => {

    return await mongo().then(async (mongoose) => {
        try {
            console.log('Running findOne()')

            const result = await profileSchema.findOne(
                {
                    guildId,
                    userId,
                })

            console.log("dbToken", dbToken)

            if (result[dbToken] > 0) {
                myTok = result[dbToken]
                console.log(result)
                console.log("dbToken",dbToken)
                console.log("result[dbToken]", result[dbToken])
                return myTok
            } else {
                console.log('apa')
                console.log(result)
                return 0
            }

        } finally {
            mongoose.connection.close()
        }
    })
}