const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: Schema.Types.ObjectId, ref: 'name' },
    country: { type: Schema.Types.ObjectId, ref: 'Country' },
    city: { type: Schema.Types.ObjectId, ref: 'City' },
    insideId: String,
    street: String,
    build: String,
    postalCode: String,
    images: Array,
    description: String
}, {
    timestamps: true
})

module.exports = model('Hotel', schema)
