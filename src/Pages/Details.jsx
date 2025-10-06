import { useLocation } from "react-router";

export default function ProductDetails() {
    const d = useLocation()
    const e = d.state;
    const handleClick = (n) => {
        console.log(n)
    }
    return (
        <main className="m-8 grid grid-cols-2 gap-2 items-center justify-items-center">
            <div className="w-full h-[70vh] flex items-center justify-center p-4">
                <img src={e.image} alt={e.name} className="h-full rounded-xl shadow-md shadow-gray-500" />
            </div>
            <div className="m-4 space-y-2">
                <strong className="text-3xl">{e.name}</strong>
                <p className="text-gray-700 text-sm my-3 font-semibold">{e.description}</p>
                <div className="flex flex-col my-2 text-sm font-medium gap-2">
                    <p>Category : {e.category}</p>
                    <p>Dimensions : {e.dimensions}</p>
                    <p>Material : {e.material}</p>
                    <p>Price : ${e.price}</p>
                </div>
                <button onClick={() => handleClick(e.name)} className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-md cursor-pointer hover:shadow shadow-gray-600 transition-all duration-300 transition-discrete">Buy now</button>
            </div>
        </main>
    )
}