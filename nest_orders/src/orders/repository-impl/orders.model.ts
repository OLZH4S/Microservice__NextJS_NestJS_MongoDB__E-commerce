import * as mongoose from "mongoose"


export const OrderSchema = new mongoose.Schema(
    {
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        product: {
            ownerId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            pictures: {
                type: [String],
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        }
    },
    { timestamps: true }
)
