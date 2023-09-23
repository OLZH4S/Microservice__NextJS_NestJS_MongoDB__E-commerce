'use client'


import { UserServiceInit } from "@/core/users/initialised/users.service.init"
import { formToObject, turnOnOrOffButton } from "@/lib/functions"
import { Path_Buyer_Signup, Path_Home, Path_Seller_Home, Path_Seller_Signup } from "@/lib/vars.paths"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, SetStateAction, Dispatch, FormEvent } from 'react'



async function onSubmitForm(e: FormEvent<HTMLFormElement>, setIsLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<string>>, router: AppRouterInstance, isSeller: boolean) {
    e.preventDefault()

    setIsLoading(true)
    setError('')

    const target = e.target as HTMLFormElement

    turnOnOrOffButton(target.submitButton)

    const formObject = formToObject<any>(target)

    try {




        const res = await UserServiceInit.login(formObject)

        if (!res.response.ok) {
            // @ts-ignore
            setError(res.data)
        } else {
            if (isSeller)
                router.push(Path_Seller_Home)
            else
                router.push(Path_Home)
            router.refresh()
        }
    } finally {
        turnOnOrOffButton(target.submitButton)
        setIsLoading(false)
    }




}


function whereToLink(isSeller: boolean) {
    if (isSeller) {
        return Path_Seller_Signup
    } else {
        return Path_Buyer_Signup
    }
}


export default function LoginForm({ isSeller }: { isSeller: boolean }) {

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()


    return (
        <>
            <div className="grid place-items-center h-[calc(100%-64px)] sm:max-w-2xl sm:m-auto">


                <form onSubmit={(e) => onSubmitForm(e, setIsLoading, setError, router, isSeller)} className=" w-4/5">
                    <div className="w-full text-center mb-5 text-2xl">Login page</div>

                    <Link href={whereToLink(isSeller)} type='button' className="link text-center w-full mb-10">Don&apos;t have an account?</Link>



                    <br />

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Username</span>
                        </label>
                        <input name='username' required autoComplete="username" type="text"
                            placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <br />

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input name='password' type={showPassword ? 'text' : 'password'} required
                            autoComplete="new-password" placeholder="Type here"
                            className="input input-bordered w-full " />
                    </div>



                    <br />

                    <div className="form-control w-max">
                        <label className="cursor-pointer label">
                            <input onChange={() => setShowPassword(prev => !prev)} name="show" type="checkbox" className="checkbox checkbox-secondary" />
                            <span className="ml-4 label-text">Show password</span>
                        </label>
                    </div>




                    <div className="mt-5 text-error text-center text-ba">
                        {error}
                    </div>


                    <button name='submitButton' type='submit' className={"btn btn-primary mt-5 w-full " + (isLoading ? 'animate-pulse' : '')}>
                        Login</button>


                </form >
            </div >
        </>
    )
}