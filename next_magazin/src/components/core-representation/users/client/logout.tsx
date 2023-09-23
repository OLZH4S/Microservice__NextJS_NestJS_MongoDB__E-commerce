'use client'

import { UserServiceInit } from "@/core/users/initialised/users.service.init"
import { useRouter } from "next/navigation"



export function Logout() {

    const router = useRouter()

    async function logout() {
        await UserServiceInit.logout()
        router.refresh()

    }

    return (
       <button className="btn" onClick={logout}>Logout</button>
    )
}