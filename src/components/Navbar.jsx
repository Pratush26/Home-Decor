import { Link } from "react-router";

export default function Navbar () {
    return (
        <nav className="w-5/6 mx-auto py-4 flex items-center justify-between gap-4">
            <Link to='/' className="text-2xl font-bold" >Home Decor</Link>
            <Link to='/wishlist' className="" >Wish List</Link>
        </nav>
    )
}