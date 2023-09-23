import * as mongoose from "mongoose"


export const ProductSchema = new mongoose.Schema(
    {
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
    },
    { timestamps: true }
)
ProductSchema.index({ '$**': 'text' });