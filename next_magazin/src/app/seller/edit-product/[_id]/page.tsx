import NewProductForm from "@/components/core-representation/products/client/newProductForm"
import { findOneProductsOfSeller } from "@/core/products/onlyForServerComponents/api.server"
import { Product } from "@/core/products/products.model"


export default async function Page({ params }: { params: { _id: string } }) {

    const product = (await findOneProductsOfSeller(params._id)).data as Product

    return (
        <>

            <NewProductForm PRODUCT={product} />

        </>
    )
}