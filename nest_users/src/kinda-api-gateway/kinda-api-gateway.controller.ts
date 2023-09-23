import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UploadedFiles, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UseInterceptors, Request, UseGuards, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { CreateProductDto, FindAllDto, Product, UpdateProductDto } from 'src/models.external/products.model';
import { firstValueFrom } from 'rxjs'
import { ApiTags, ApiBody, ApiConsumes, ApiQuery, ApiParam, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('kinda-api-gateway')
@Controller('kinda-api-gateway')
export class KindaApiGatewayController {
    constructor(
        @Inject('PRODUCTS_SERVICE') private clientProducts: ClientProxy,
        @Inject('ORDERS_SERVICE') private clientOrders: ClientProxy,

    ) { }


    @ApiCookieAuth('session')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'integer' },
                pictures: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
            required: ['name', 'description', 'price', 'pictures'],
        },
        required: true,
        description: 'Create a new product with images.',
    })
    @UseGuards(AuthenticatedGuard)
    @Post('products')
    @UseInterceptors(FilesInterceptor('pictures', 10))
    async uploadFilesAndPassValidation(
        @Request() req,
        @Body() body: Omit<CreateProductDto, 'ownerId'>,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: 'image' }),
                ]
            })
        )
        pictures: Express.Multer.File[],
    ) {
        // @ts-ignore
        body.ownerId = req.user._id

        const result = await firstValueFrom(this.clientProducts.send('createProduct', { body, pictures }))

        return result


    }



    @ApiCookieAuth('session')
    @ApiQuery({
        name: 'limit',
        type: Number,
        required: false,
        description: 'Limit the number of results to retrieve.',
    })
    @ApiQuery({
        name: 'offset',
        type: Number,
        required: false,
        description: 'Offset the results by a specified number.',
    })
    @UseGuards(AuthenticatedGuard)
    @Get('products')
    async findAllProductsForSeller(@Query() findAllDto: FindAllDto, @Request() req) {
        const payload = { ownerId: req.user._id, findAllDto }
        const result = await firstValueFrom(this.clientProducts.send('findAllProductsOfSeller', payload))
        return result
    }


    @ApiCookieAuth('session')
    @ApiParam({
        name: '_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the product.',
    })
    @UseGuards(AuthenticatedGuard)
    @Get('products/:_id')
    async findOneSellerProduct(@Param('_id') _id: string, @Request() req) {
        const payload = { _id, ownerId: req.user._id }
        const result = await firstValueFrom(this.clientProducts.send('findOneProduct', payload))
        return result
    }


    @ApiCookieAuth('session')
    @ApiParam({
        name: '_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the product to update.',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                description: { type: 'string' },
                pictures: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                price: { type: 'number' },
            },
        },
        required: false,
        description: 'Update a product with images.',
    })
    @UseGuards(AuthenticatedGuard)
    @Patch('products/:_id')
    @UseInterceptors(FilesInterceptor('pictures', 10))
    async updateUploadFilesAndPassValidation(
        @Request() req,
        @Body() body: UpdateProductDto,
        @UploadedFiles(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: 'image' }),
                ],
                fileIsRequired: false
            })
        )
        pictures: Express.Multer.File[],
    ) {
        // @ts-ignore
        body.ownerId = req.user._id

        const result = await firstValueFrom(this.clientProducts.send('updateProduct', { body, pictures }))

        return result


    }


    @ApiCookieAuth('session')
    @ApiParam({
        name: '_id',
        type: 'string',
        required: true,
        description: 'The unique identifier of the product to remove.',
    })
    @UseGuards(AuthenticatedGuard)
    @Delete('products/:_id')
    async removeSellerProduct(@Param('_id') _id: string, @Request() req) {
        const payload = { _id, ownerId: req.user._id }
        const result = await firstValueFrom(this.clientProducts.send('removeProduct', payload))
        return result
    }







    @ApiCookieAuth('session')
    @UseGuards(AuthenticatedGuard)
    @Get('orders')
    async findOrders(@Request() req) {
        const result = await firstValueFrom(this.clientOrders.send('findAllOrdersOfBuyer', req.user._id))
        return result
    }


    @ApiCookieAuth('session')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                _id: { type: 'string' },
                ownerId: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                pictures: {
                    type: 'array',
                    items: {
                        type: 'string',
                    },
                },
                price: { type: 'number' },
            },
        },
        required: false,
        description: 'Create an order with product details.',
    })
    @UseGuards(AuthenticatedGuard)
    @Post('orders')
    async createOrder(@Body() product: Product, @Request() req) {
        const payload = { creatorId: req.user._id, product: product }
        const result = await firstValueFrom(this.clientOrders.send('createOrder', payload))
        return result
    }







}




