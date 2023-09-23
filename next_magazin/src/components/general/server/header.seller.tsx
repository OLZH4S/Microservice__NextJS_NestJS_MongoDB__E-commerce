import { Path_Home, Path_Seller_Home } from "@/lib/vars.paths";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/app/seller/loading";
import { UserIcon } from "@/components/core-representation/users/client/userIcon";

export default function HeaderSeller() {

    return (
        <div className="navbar backdrop-blur-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href={Path_Home}>Homepage</Link></li>
                        <li><Link href={Path_Seller_Home}>Become a seller</Link></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link href={Path_Home} className="btn btn-ghost normal-case text-xl">magazIN</Link>
            </div>
            <div className="navbar-end">





                <Suspense fallback={<Loading />} >
                    <UserIcon isSeller={true} />
                </Suspense>


            </div>
        </div>




    )
}
