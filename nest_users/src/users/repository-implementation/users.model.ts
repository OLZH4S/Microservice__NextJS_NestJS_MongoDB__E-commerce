import * as mongoose from "mongoose"

export const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
    },
    { timestamps: true }
)

