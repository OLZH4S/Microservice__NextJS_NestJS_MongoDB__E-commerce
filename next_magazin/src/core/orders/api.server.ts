import { fetchResource } from "@/lib/fetcher"
import { PathApi_Orders } from "@/lib/vars.paths"
import { cookies } from 'next/headers'
import { domain } from "@/lib/vars"
import { Order } from "./order.model"





export async function findAllOrdersOfBuyer() {
    const cookie = cookies().get('connect.sid')
    const res = await fetchResource<Order[]>(domain + PathApi_Orders, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie?.name + '=' + cookie?.value
        }
    })
    return res
}