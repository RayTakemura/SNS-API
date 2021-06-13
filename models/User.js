const { Schema, model } = require('mongoose');
const { schema } = require('../../../../canvas work/18/pizza-hunt/models/Pizza');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'Username is required!',
            trim: true
        },
        email: {
            type: String,
            require: 'Email address is required',
            match: /^[a-z._-]+@[a-z._-]+\.(com|net|edu|org)$/,
            unique: true
        },
        friends: [UserSchema]
        //thoughts
        
    }
);

const User = model('User', UserSchema);

module.exports = User;