
import { fetchResource } from "@/lib/fetcher";
import { Product } from "../products.model";
import { PathApi_Products } from "@/lib/vars.paths";

export async function create(FORMDATA: FormData) {
    const res = await fetchResource<Product>(PathApi_Products, {
        method: 'POST',
        body: FORMDATA,
    })
    return res
}

export async function update(FORMDATA: FormData) {
    const res = await fetchResource<Product>(PathApi_Products + '/' + FORMDATA.get('_id'), {
        method: 'PATCH',
        body: FORMDATA,
    })
    return res
}

export async function remove(ID: string) {
    const res = await fetchResource<Product>(PathApi_Products + '/' + ID, {
        method: 'DELETE',
    })
  
}







