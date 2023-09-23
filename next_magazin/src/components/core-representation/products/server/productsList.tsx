


import ProuctCard from "@/components/core-representation/products/client/productCard"
import { findAllProducts, findAllProductsOfSeller } from "@/core/products/onlyForServerComponents/api.server"
import { Product } from "@/core/products/products.model"
import { Path_Home, Path_Seller_Home, Path_Seller_Signup } from "@/lib/vars.paths"
import Link from "next/link"
import { redirect } from 'next/navigation'


function routeSolver(isSeller: boolean, PAGE: number, SEARCH?: string) {
    if (isSeller) {
        return Path_Seller_Home + `?page=${PAGE}`
    } else {
        if (SEARCH) {
            return Path_Home + `?page=${PAGE}` + `&search=${SEARCH}`
        } else {
            return Path_Home + `?page=${PAGE}`
        }
    }
}

export default async function ProductsList({ isSeller, PAGE, SEARCH }: { isSeller: boolean, PAGE: number, SEARCH?: string }) {
    const limit = 5
    const offset = PAGE - 1

    let res

    if (isSeller) {
        res = await findAllProductsOfSeller(5, offset) as { data: { data: Array<Product>, count: number }, response: Response }
    } else {
        res = await findAllProducts(5, offset, SEARCH) as { data: { data: Array<Product>, count: number }, response: Response }
    }



    if (!res.response.ok)
        return redirect(Path_Seller_Signup)

    const numberOfPages = Math.ceil(res.data.count / limit)
    const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1)

    return (
        <>

            {
                res.data.data.map((ii) =>
                    <ProuctCard key={ii._id} ITEM={ii} isSeller={isSeller} />
                )
            }

            <div className="grid place-items-center pb-10 max-w-full overflow-auto">
                <div className="join">
                    {
                        pages.map((ii, ind) => {

                            return (
                                <Link key={'pages' + ind} href={routeSolver(isSeller, ii, SEARCH)}>
                                    <button

                                        className={"join-item btn " + (PAGE === ii ? 'btn-active' : '')}
                                    >{ii}</button>
                                </Link>)

                        })
                    }
                </div >
            </div>

        </>
    )
}



