import { fetchResource } from "@/lib/fetcher"
import { PathApi_Orders } from "@/lib/vars.paths"
import { Order } from "./order.model"
import { Product } from "../products/products.model"





export async function createOrder(PRODUCT: Product) {
    const res = await fetchResource<Order>(PathApi_Orders, {
        cache: 'no-store',
        method: "POST",
        body: JSON.stringify(PRODUCT),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res
}


export async function removeOrder() {
    const res = await fetchResource<Order[]>(PathApi_Orders, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res
}