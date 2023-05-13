const mongoose = require('mongoose')

module.exports = async () => {

    mongoose.connect(process.env.MONGO, {
        useNewUrlParser: true
    })
        .then(() => {
            console.log("Connected in the Database")
        })
        .catch((error) => {
            throw new Error("Error connecting to database: " + error)
        });

    mongoose.plugin(schema => {
        schema.pre('findOneAndUpdate', setRunValidators);
        schema.pre('updateMany', setRunValidators);
        schema.pre('updateOne', setRunValidators);
        schema.pre('update', setRunValidators);
    });
    
    function setRunValidators() {
        this.setOptions({ runValidators: true });
    }
}
