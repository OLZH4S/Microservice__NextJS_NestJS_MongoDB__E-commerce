import { uploadImagesAndReturnArrayOfUrls } from "./fetchImages/fetchImages";
import { Product } from "./products.model";
import { CreateProductDto, FindAllDto, FindAllDtoWithSearch, IProductsRepository, UpdateProductDto } from "./products.repository";

export class ProductsService {
    constructor(private productsRepository: IProductsRepository) { }



    findAllSeller(ownerId: string, findAllDto?: FindAllDto): Promise<{ data: Array<Product>, count: number }> {
        return this.productsRepository.findAllSeller(ownerId, findAllDto)
    }

    findAll(findAllDtoWithSearch?: FindAllDtoWithSearch): Promise<{ data: Array<Product>, count: number }> {
        return this.productsRepository.findAll(findAllDtoWithSearch)
    }

    findOne(_id: string, ownerId: string): Promise<Product> {
        return this.productsRepository.findOne(_id, ownerId)
    }

    async create(createProductDto: CreateProductDto, pictures): Promise<Product> {
        const picturesUrls = await uploadImagesAndReturnArrayOfUrls(pictures)
        // @ts-ignore
        createProductDto.pictures = picturesUrls
        return this.productsRepository.create(createProductDto)
    }

    async update(updateProductDto: UpdateProductDto, pictures): Promise<Product> {
        if (pictures.length) {
            const picturesUrls = await uploadImagesAndReturnArrayOfUrls(pictures)
            updateProductDto.pictures = picturesUrls
        }
        return this.productsRepository.update(updateProductDto)
    }

    remove(_id: string, ownerId: string): Promise<void> {
        return this.productsRepository.remove(_id, ownerId)
    }
}