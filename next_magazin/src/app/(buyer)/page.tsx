import ProductsList from "@/components/core-representation/products/server/productsList";
import { Suspense } from "react";
import Loading from "../seller/loading";
import { redirect } from "next/navigation";
import SearchBar from "@/components/core-representation/products/client/searchBar";


export default function Home({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    if (!searchParams.page)
        redirect('/?page=1')



    return (
        <>


            <div className="grid place-items-center">
                <SearchBar />
            </div>

            <Suspense fallback={<Loading />}>
                <ProductsList isSeller={false} PAGE={+searchParams.page} SEARCH={searchParams.search as string} />
            </Suspense>
        </>
    )
}
