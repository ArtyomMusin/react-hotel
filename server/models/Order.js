const { Schema, model } = require('mongoose')

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    room: { type: Schema.Types.ObjectId, ref: 'Room'},
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel'},
    country: { type: Schema.Types.ObjectId, ref: 'Country'},
    city: { type: Schema.Types.ObjectId, ref: 'City'},
    date: Number,
    name: String,
    tel: String
}, {
    timestamps: true
})

module.exports = model('Order', schema)
