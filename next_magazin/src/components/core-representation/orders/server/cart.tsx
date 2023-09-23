import { findAllOrdersOfBuyer } from "@/core/orders/api.server"
import { Order } from "@/core/orders/order.model"
import { CheckoutButton } from "../client/checkoutButton"



export async function Cart() {

    let orders: Order[] = []

    const res = await findAllOrdersOfBuyer()

    if (res.response.ok) {
        orders = res.data as Order[]
    }



    let sum = 0

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    <span className="badge badge-sm indicator-item">{orders.length}</span>
                </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                    <span className="font-bold text-lg">{orders.length} Items</span>
                    {
                        orders.map(ii => {

                            sum += ii.product.price
                            return <span key={ii._id} className="grid grid-flow-col place-content-between gap-3">
                                <span>{ii.product.name}</span>
                                <span>{ii.product.price}</span>
                            </span>
                        })
                    }

                    <span className="text-info">Subtotal: {sum}</span>
                    <div className="card-actions">
                        <CheckoutButton />
                    </div>
                </div>
            </div>
        </div>
    )
}