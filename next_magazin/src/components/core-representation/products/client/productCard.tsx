'use client'

import { createOrder } from "@/core/orders/api";
import { ProductServiceInit } from "@/core/products/initialised/products.service.init";
import { Product } from "@/core/products/products.model";
import { Path_Buyer_Signup, Path_Seller_EditProduct } from "@/lib/vars.paths";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { useRouter } from "next/navigation";


async function addToCart(PRODUCT: Product, router: AppRouterInstance) {

    const res = await createOrder(PRODUCT)
    if ([403, 401].includes(res.response.status)) {
        router.push(Path_Buyer_Signup)
    }
    router.refresh()

}


export default function ProuctCard({ ITEM, isSeller = false }: { ITEM: Product, isSeller?: boolean }) {
    const router = useRouter()


    async function deleteProduct(_id: string) {
        await ProductServiceInit.remove(_id)
        router.refresh()
    }

    return (
        <>
            <div className="card w-full bg-base-100 shadow-xl p-10">
                <figure>
                    <div className="aspect-video w-full carousel carousel-vertical">

                        {ITEM.pictures.map((ii, ind) =>
                            <div key={ITEM._id + ind} className="carousel-item h-full ">
                                <img className="w-full object-cover" src={ii} />

                            </div>)}

                    </div>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{ITEM.name}</h2>
                    <p >{ITEM.description}</p>
                    <div className="badge badge-outline">${ITEM.price}</div>
                    <div className="mt-4 card-actions grid place-items-center  grid-flow-col gap-8 ">
                        {isSeller ?
                            <>
                                <button className="btn w-full" onClick={() => deleteProduct(ITEM._id)}>Delete</button>
                                <Link href={Path_Seller_EditProduct + '/' + ITEM._id} className="w-full">
                                    <button className="btn btn-primary  w-full">Update</button>
                                </Link>
                            </>
                            :
                            <>

                                <button className="btn btn-primary" onClick={() => addToCart(ITEM, router)}>Add to cart</button>
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}



