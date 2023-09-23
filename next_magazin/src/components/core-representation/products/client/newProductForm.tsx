'use client'


import { ProductServiceInit } from "@/core/products/initialised/products.service.init"
import { Product } from "@/core/products/products.model"
import { turnOnOrOffButton } from "@/lib/functions"
import { Path_Seller_Home } from "@/lib/vars.paths"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, SetStateAction, Dispatch, FormEvent } from 'react'



async function onSubmitForm(e: FormEvent<HTMLFormElement>, setIsLoading: Dispatch<SetStateAction<boolean>>, setError: Dispatch<SetStateAction<string>>, router: AppRouterInstance, PRODUCT?: Product) {
    e.preventDefault()

    setIsLoading(true)
    setError('')

    const target = e.target as HTMLFormElement

    turnOnOrOffButton(target.submitButton)

    const formData = new FormData(target)

    if (PRODUCT) {
        formData.append('_id', PRODUCT._id)
        formData.append('ownerId', PRODUCT.ownerId)

    }



    try {


        let res
        if (!PRODUCT) {
            res = await ProductServiceInit.create(formData)

        } else {
            res = await ProductServiceInit.update(formData)

        }

        if (!res.response.ok) {
            // @ts-ignore
            setError(JSON.stringify(res.data, null, 2))
        } else {
            router.refresh()
            router.back()
        }
    } finally {
        turnOnOrOffButton(target.submitButton)
        setIsLoading(false)
    }




}



export default function NewProductForm({ PRODUCT }: { PRODUCT?: Product }) {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    return (
        <>
            <div className="grid place-items-center h-[calc(100%-64px)] sm:max-w-2xl sm:m-auto">


                <form onSubmit={(e) => onSubmitForm(e, setIsLoading, setError, router, PRODUCT)} className=" w-4/5">




                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input name='name' required type="text"
                            placeholder="Type here" className="input input-bordered w-full " defaultValue={PRODUCT ? PRODUCT.name : ''} />
                    </div>

                    <br />

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea name='description' required
                            placeholder="Type here" className="input input-bordered w-full " defaultValue={PRODUCT ? PRODUCT.description : ''} />
                    </div>

                    <br />

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input name='price' required type="number"
                            placeholder="Type here" className="input input-bordered w-full " defaultValue={PRODUCT ? PRODUCT.price : ''} />
                    </div>

                    <br />

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Pick files</span>
                        </label>
                        <input name='pictures' type="file" multiple={true} accept="image/*" className="file-input file-input-bordered w-full " />
                    </div>






                    <div className="mt-5 text-error text-center text-ba">
                        {error}
                    </div>


                    <button name='submitButton' type='submit' className={"btn btn-primary mt-5 w-full " + (isLoading ? 'animate-pulse' : '')}>
                        Complete</button>



                    <Link href={Path_Seller_Home} type='button' className=" text-center w-full mt-10">Cancel</Link>

                </form >
            </div >
        </>
    )
}