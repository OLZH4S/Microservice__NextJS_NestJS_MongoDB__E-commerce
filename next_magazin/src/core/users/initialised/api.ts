
import { fetchResource } from "@/lib/fetcher";
import { PathApi_Login, PathApi_Logout, PathApi_Signup } from "@/lib/vars.paths";
import { CreateUserDto, LoginCredentials } from "../users.repository";
import { User } from "../users.model";

export async function signup(DATA: CreateUserDto) {
    const res = await fetchResource<User>(PathApi_Signup, {
        method: 'POST',
        body: JSON.stringify(DATA),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res
}


export async function login(DATA: LoginCredentials) {
    const res = await fetchResource<User>(PathApi_Login, {
        method: 'POST',
        body: JSON.stringify(DATA),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res
}


export async function logout() {
    const res = await fetchResource<User>(PathApi_Logout, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return res
}



