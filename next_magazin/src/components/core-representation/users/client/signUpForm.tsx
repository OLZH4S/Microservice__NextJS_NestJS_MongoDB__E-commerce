'use client'


import { UserServiceInit } from "@/core/users/initialised/users.service.init"
import { formToObject, turnOnOrOffButton } from "@/lib/functions"
import { Path_Buyer_Login, Path_Seller_Login } from "@/lib/vars.paths"
import Link from "next/link"
import { useState, SetStateAction, Dispatch, FormEvent } from 'react'



async function onSubmitForm(e: FormEvent<HTMLFormElement>, setIsLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<string>>, setSignUpSuccess: Dispatch<SetStateAction<boolean>>) {
    e.preventDefault()

    setIsLoading(true)
    setError('')

    const target = e.target as HTMLFormElement

    turnOnOrOffButton(target.submitButton)

    const formObject = formToObject<any>(target)
    try {


        if (formObject.password !== formObject.password_confirmation) {
            return setError('Passwords do not match')
        }

        const res = await UserServiceInit.signup(formObject)

        if (!res.response.ok) {
            // @ts-ignore
            setError(res.data)
        } else {
            setSignUpSuccess(true)
        }
    } finally {
        turnOnOrOffButton(target.submitButton)
        setIsLoading(false)
    }




}


function whereToLink(isSeller: boolean) {
    if (isSeller) {
        return Path_Seller_Login
    } else {
        return Path_Buyer_Login
    }
}


export default function SignUpForm({ isSeller }: { isSeller: boolean }) {

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [signUpSuccess, setSignUpSuccess] = useState(false)

    if (signUpSuccess)
        return (
            <div className="h-[calc(100%-64px)] grid place-items-center">
                <div>
                    <div className="w-full text-center mb-5 text-2xl">Signup successfull!</div>

                    <Link href={isSeller ? Path_Seller_Login : Path_Buyer_Login} type='button' className="link text-center w-full mb-10">Now please login with you credentials</Link>
                </div>

            </div>
        )

    return (
        <>
            <div className="grid place-items-center h-[calc(100%-64px)] sm:max-w-2xl sm:m-auto">


                <form onSubmit={(e) => onSubmitForm(e, setIsLoading, setError, setSignUpSuccess)} className=" w-4/5">
                    <div className="w-full text-center mb-5 text-2xl">Please register first</div>

                    <Link href={whereToLink(isSeller)} type='button' className="link text-center w-full mb-10">Already have
                        an account?</Link>



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

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Confirm password</span>
                        </label>
                        <input name='password_confirmation'
                            type={showPassword ? 'text' : 'password'} required autoComplete=" new-password"
                            placeholder="Type here" className="input input-bordered w-full " />
                    </div>

                    <br />

                    <div className="form-control w-max">
                        <label className="cursor-pointer label">
                            <input onChange={() => setShowPassword(prev => !prev)} name="show" type="checkbox" className="checkbox checkbox-secondary" />
                            <span className="ml-4 label-text">Show password</span>
                        </label>
                    </div>


                    <input name='role' type="text" defaultValue={isSeller ? 'seller' : 'buyer'} className="sr-only" />



                    <div className="mt-5 text-error text-center text-ba">
                        {error}
                    </div>


                    <button name='submitButton' type='submit' className={"btn btn-primary mt-5 w-full " + (isLoading ? 'animate-pulse' : '')}>
                        Signup</button>


                </form >
            </div >
        </>
    )
}