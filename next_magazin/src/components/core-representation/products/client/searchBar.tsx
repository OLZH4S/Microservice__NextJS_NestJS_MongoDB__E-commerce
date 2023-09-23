'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'




export default function SearchBar() {

    const router = useRouter()

    function doOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const target = e.target as HTMLFormElement

        router.push(`/?page=1&search=${target.search.value}`)
        router.refresh()
    }

    return (
        <form onSubmit={doOnSubmit}>
            <div className="form-control">
                <div className="input-group">
                    <input name='search' type="text" placeholder="Search…" className="input input-bordered" />
                    <button className="btn btn-square" type='submit'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                </div>
            </div>
        </form>
    )
}