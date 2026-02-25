import mongoose from "mongoose";

const userAuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    token: {
        type: String
    }
});

const UserAuth = mongoose.model('UserAuth', userAuthSchema);

export default UserAuth;
