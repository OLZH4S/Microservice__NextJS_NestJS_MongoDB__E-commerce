

import ProductsList from "@/components/core-representation/products/server/productsList"
import { Path_Seller_AddProduct, Path_Seller_Home, } from "@/lib/vars.paths"
import Link from "next/link"
import { Suspense } from 'react'
import Loading from "./loading"
import { redirect } from "next/navigation"





export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    if (!searchParams.page)
        redirect(Path_Seller_Home + '?page=1')


    return (
        <>

            <Link href={Path_Seller_AddProduct} className="w-full grid place-items-center py-10"> <button className="btn btn-primary">add new product</button></Link>

            <Suspense fallback={<Loading />} >
                <ProductsList isSeller={true} PAGE={+searchParams.page} />

            </Suspense>


        </>
    )
}



