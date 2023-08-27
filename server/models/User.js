const { model, Schema } = require('mongoose')

const schema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    ordered: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
    role: String,
    tel: String,
    login: String
}, {
    timestamps: true
})

module.exports = model('User', schema)
