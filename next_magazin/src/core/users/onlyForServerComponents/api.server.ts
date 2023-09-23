import { fetchResource } from "@/lib/fetcher"
import { domain } from "@/lib/vars"
import { PathApi_CheckUser } from "@/lib/vars.paths"
import { cookies } from "next/headers"
import { User } from "../users.model"



export async function checkUser() {
    const cookie = cookies().get('connect.sid')
    const res = await fetchResource<User>(domain + PathApi_CheckUser, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookie?.name + '=' + cookie?.value
        }
    })
    return res
}