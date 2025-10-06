import { Link } from "react-router"
import { useFetch } from "../Hooks/useFetch"
import { useEffect, useState } from "react"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { AddToWishList, findDB } from "../utility/localDb"

export default function Home() {
    const { loading, err, data } = useFetch('/furnitureData.json')
    const [dataset, setDataset] = useState(data)
    const [searchWord, setSearchWord] = useState('')
    const trimmed = searchWord.trim().toLowerCase();
    const localData = findDB('wishList')

    useEffect(() => {
        if (!loading) setDataset(data.filter(e => e.stock == true))
        if (err) console.error(err)
    }, [loading, err, data])

    useEffect(() => {
        if (trimmed) setDataset(data.filter((e) => e.name.trim().toLowerCase().includes(trimmed)))
        else setDataset(data.filter(e => e.stock == true));
    }, [trimmed, data])

    const handleClick = (i, n, type) => {
        if (type === "buy") {
            let identified = data.find(e => e.id == i)
            identified.stock = false
        } else {
            AddToWishList(i, n)
        }
        setDataset(data.filter(e => e.stock == true))
    }
    return (
        <main className="w-11/12 mx-auto my-8">
            <section className="w-full flex items-center justify-between gap-4 my-6">
                <h1 className="text-3xl font-bold">All Products <small>({dataset?.length})</small></h1>
                <form action="">
                    <input type="text" name="search" value={searchWord} onChange={e => setSearchWord(e.target.value)} placeholder="Search" className="w-fit bg-gray-200 rounded-md px-4 py-2" />
                </form>
            </section>
            {
                loading ?
                    <p>Loading...</p>
                    :
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-content-center gap-4">
                        {
                            dataset.length == 0 ?
                            <p className="text-center text-gray-400">There is no product in stock</p>
                            :
                            dataset.map(e => (
                                <span key={e.id} className="rounded-xl text-gray-800 shadow-md/80 shadow-gray-500 overflow-hidden">
                                    <img src={e.image} alt={e.name} className="aspect-square" />
                                    <div className="m-4 space-y-2">
                                        <strong className="text-lg">{e.name}</strong>
                                        <div className="flex my-2 text-sm font-medium justify-between gap-2">
                                            <p>{e.category}</p>
                                            <p>{e.material}</p>
                                        </div>
                                        <div className="flex my-2 text-sm font-medium justify-between gap-2">
                                            <p className="font-medium">Price : ${e.price}</p>
                                            <button onClick={() => handleClick(e.id, e.name, "wish")} className="cursor-pointer">
                                                {
                                                    localData.includes(e.id) ?
                                                        <FaHeart />
                                                        :
                                                        <FaRegHeart />
                                                }
                                            </button>
                                        </div>
                                        <p className="text-gray-500 text-sm font-semibold">{e.description}</p>
                                        <div className="flex justify-between gap-2">
                                            <button onClick={() => handleClick(e.id, e.name, "buy")} className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-md cursor-pointer hover:shadow shadow-gray-600 transition-all duration-300 transition-discrete">Buy now</button>
                                            <Link to='/details' state={e} className="italic">See details_</Link>
                                        </div>
                                    </div>
                                </span>
                            ))
                        }
                    </section>
            }
        </main>
    )
}