import React from 'react'
import { ShoppingCart, User } from 'lucide-react'
function Header() {
    return (
        <div className="md:hidden flex justify-between fixed py-5 left-1 right-1 backdrop-blur-2xl">
            <div>
                <p className="text-2xl font-bold">MarketPro</p>
            </div>
            <div className="px-1 w-20 h-10 flex gap-6 rounded-full items-center bg-blue-100 text-blue-500">
                            <User className=" w-6" />
                            <ShoppingCart className="mr-1 w-6" />
            </div>
        </div>
    )
}

export default Header
