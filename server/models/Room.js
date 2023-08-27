const { Schema, model } = require('mongoose')

const schema = new Schema({
    room: Number,
    status: String,
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel' },
    images: Array,
    beds: Number,
    floor: Number,
    type: String
}, {
    timestamps: true
})

module.exports = model('Room', schema)
