const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: String,
    country: { type: Schema.Types.ObjectId, ref: 'Country' }
}, {
    timestamps: true
})

module.exports = model('City', schema)
