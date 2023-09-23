import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { CreateProductDto, FindAllDto, FindAllDtoWithSearch, IProductsRepository, UpdateProductDto } from "core/products/products.repository";
import { Product } from "core/products/products.model";

@Injectable()
export class ProductsRepositoryImpl implements IProductsRepository {
    constructor(@InjectModel('product') private readonly productModel: Model<Product>) { }

    async onModuleInit() {
        try {
            const jsonData = DATA;

            for (let ii of jsonData) {
                const res = await new this.productModel(ii).save();
            }
        } catch (error) {
            throw error;
        }
    }

    create(createProductDto: CreateProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
    }

    async findAll(findAllDtoWithSearch: FindAllDtoWithSearch): Promise<{ data: Array<Product>, count: number }> {

        if (findAllDtoWithSearch.search === 'undefined') {
            findAllDtoWithSearch.search = undefined
        }

        const query = {}
        if (findAllDtoWithSearch.search) {
            query['$or'] = [
                { name: { $regex: findAllDtoWithSearch.search, $options: 'i' } },
                { description: { $regex: findAllDtoWithSearch.search, $options: 'i' } },
            ]

        }
        const data = await this.productModel
            .find(query)
            .skip(findAllDtoWithSearch.limit * findAllDtoWithSearch.offset)
            .limit(findAllDtoWithSearch.limit)
            .sort({ updatedAt: -1 })
            .exec();

        const count = await this.productModel.count(query)

        return { data, count }
    }

    async findAllSeller(ownerId: string, findAllDto: FindAllDto = { limit: 10, offset: 0 }): Promise<{ data: Array<Product>, count: number }> {

        const data = await this.productModel
            .find()
            .where('ownerId').equals(ownerId)
            .skip(findAllDto.limit * findAllDto.offset)
            .limit(findAllDto.limit)
            .exec();

        const count = await this.productModel
            .count({ ownerId })


        return { data, count }
    }

    findOne(_id: string, ownerId: string): Promise<Product> {
        return this.productModel
            .findById(_id)
            .where('ownerId').equals(ownerId)
            .exec();
    }

    async update(updateProductDto: UpdateProductDto): Promise<Product> {
        const updated = await this.productModel
            .findByIdAndUpdate(updateProductDto._id, { $set: updateProductDto }, { new: true })
            .where('ownerId').equals(updateProductDto.ownerId)
            .exec();
        return updated
    }

    remove(_id: string, ownerId: string): Promise<void> {
        // @ts-ignore
        return this.productModel
            .findByIdAndRemove(_id)
            .where('ownerId').equals(ownerId)
            .exec();
    }
}




const DATA = [
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Luxury Leather Handbag",
        "description": "A beautifully crafted luxury leather handbag, perfect for any occasion. This handbag features a spacious interior, elegant design, and high-quality leather that will last for years.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 19999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Smart Home Security Camera",
        "description": "Ensure the safety of your home with this advanced smart home security camera. It offers high-definition video recording, motion detection, and remote access via a mobile app.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 7999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Vintage Vinyl Record Player",
        "description": "Experience the nostalgic joy of vinyl with this vintage vinyl record player. It comes with built-in speakers, a headphone jack, and a stylish retro design.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 14999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Digital Drawing Tablet",
        "description": "Unleash your creativity with this digital drawing tablet. It offers a responsive touchscreen, pressure sensitivity, and compatibility with popular design software.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 8999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Gourmet Chocolate Assortment",
        "description": "Indulge in a decadent assortment of gourmet chocolates. This collection includes a variety of flavors and textures, making it a perfect gift for any chocolate lover.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 2999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Wireless Bluetooth Speaker",
        "description": "Enjoy your favorite music on the go with this portable wireless Bluetooth speaker. It offers rich, high-quality sound and a long-lasting battery for hours of entertainment.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 5999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Designer Wristwatch",
        "description": "Elevate your style with this designer wristwatch. It features a sleek stainless steel band, precision quartz movement, and a striking design that will catch everyone's attention.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 9999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a02",
        "name": "Professional Camera Kit",
        "description": "Capture breathtaking moments with this professional camera kit. It includes a high-resolution camera, a variety of lenses, and accessories for both beginners and experts.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 21999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a02",
        "name": "Stylish Laptop Bag",
        "description": "Carry your laptop in style with this stylish laptop bag. It offers ample storage space, padded compartments for protection, and a fashionable design that complements any outfit.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 6999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a02",
        "name": "Smart Fitness Tracker",
        "description": "Achieve your fitness goals with this smart fitness tracker. It tracks your steps, heart rate, sleep quality, and more, helping you stay healthy and active.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 4999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a03",
        "name": "Portable Espresso Machine",
        "description": "Enjoy espresso on the go with this portable espresso machine. It's compact, easy to use, and perfect for coffee lovers who can't do without their daily espresso shot.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 7999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Luxury Leather Handbag",
        "description": "A beautifully crafted luxury leather handbag, perfect for any occasion. This handbag features a spacious interior, elegant design, and high-quality leather that will last for years.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 19999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Smart Home Security Camera",
        "description": "Ensure the safety of your home with this advanced smart home security camera. It offers high-definition video recording, motion detection, and remote access via a mobile app.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 7999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Vintage Vinyl Record Player",
        "description": "Experience the nostalgic joy of vinyl with this vintage vinyl record player. It comes with built-in speakers, a headphone jack, and a stylish retro design.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 14999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Digital Drawing Tablet",
        "description": "Unleash your creativity with this digital drawing tablet. It offers a responsive touchscreen, pressure sensitivity, and compatibility with popular design software.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 8999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Gourmet Chocolate Assortment",
        "description": "Indulge in a decadent assortment of gourmet chocolates. This collection includes a variety of flavors and textures, making it a perfect gift for any chocolate lover.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 2999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Wireless Bluetooth Speaker",
        "description": "Enjoy your favorite music on the go with this portable wireless Bluetooth speaker. It offers rich, high-quality sound and a long-lasting battery for hours of entertainment.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 5999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a01",
        "name": "Designer Wristwatch",
        "description": "Elevate your style with this designer wristwatch. It features a sleek stainless steel band, precision quartz movement, and a striking design that will catch everyone's attention.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 9999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a02",
        "name": "Professional Camera Kit",
        "description": "Capture breathtaking moments with this professional camera kit. It includes a high-resolution camera, a variety of lenses, and accessories for both beginners and experts.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 21999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a02",
        "name": "Stylish Laptop Bag",
        "description": "Carry your laptop in style with this stylish laptop bag. It offers ample storage space, padded compartments for protection, and a fashionable design that complements any outfit.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 6999
    },
    {
        "ownerId": "613a48c0eabbe9b0f48c9a02",
        "name": "Smart Fitness Tracker",
        "description": "Achieve your fitness goals with this smart fitness tracker. It tracks your steps, heart rate, sleep quality, and more, helping you stay healthy and active.",
        "pictures": [
            'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg', 'https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg', 'https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg'
        ],
        "price": 4999
    }
]