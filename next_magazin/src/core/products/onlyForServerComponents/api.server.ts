

import { fetchResource } from "@/lib/fetcher"
import { PathApi_Products, PathApi_Products_Direct } from "@/lib/vars.paths"
import { cookies } from 'next/headers'
import { Product } from "../products.model"
import { domain } from "@/lib/vars"





export async function findAllProductsOfSeller(LIMIT: number, OFFSET: number) {
    const cookie = cookies().get('connect.sid')
    const res = await fetchResource<Product[]>(domain + PathApi_Products + `?limit=${LIMIT}&offset=${OFFSET}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie?.name + '=' + cookie?.value
        }
    })
    return res
}


export async function findOneProductsOfSeller(_ID: string) {
    const cookie = cookies().get('connect.sid')
    const res = await fetchResource<Product>(domain + PathApi_Products + '/' + _ID, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie?.name + '=' + cookie?.value
        }
    })
    return res
}


export async function findAllProducts(LIMIT: number, OFFSET: number, SEARCH?: string) {
    const res = await fetchResource<Product>(domain + PathApi_Products_Direct + `?limit=${LIMIT}&offset=${OFFSET}&search=${SEARCH}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res
}