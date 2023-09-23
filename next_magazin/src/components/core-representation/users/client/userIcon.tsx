

import { Logout } from "./logout"
import { checkUser } from "@/core/users/onlyForServerComponents/api.server"
import Link from "next/link"
import { Path_Buyer_Signup, Path_Seller_Signup } from "@/lib/vars.paths"

function signupLink(isSeller: boolean) {
    const link = isSeller ? Path_Seller_Signup : Path_Buyer_Signup
    return <Link href={link} ><button className="btn btn-primary w-full">Signup</button></Link>
}

export async function UserIcon({ isSeller }: { isSeller: boolean }) {

    const user = await checkUser()

    const noUser = user.data === 'Forbidden resource'

    function whatToShow() {
        if (!noUser) return <Logout />

        return signupLink(isSeller)
    }

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                {whatToShow()}


            </ul>
        </div>
    )
}