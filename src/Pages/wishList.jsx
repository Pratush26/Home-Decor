import { Link } from "react-router"
import { useFetch } from "../Hooks/useFetch"
import { useEffect, useState } from "react"
import { AddToWishList, findDB } from "../utility/localDb"

export default function WishListPage() {
  const { loading, err, data } = useFetch('/furnitureData.json');
  const [dataset, setDataset] = useState([]);
  const [localData, setLocalData] = useState(() => findDB('wishList')); // initial

  useEffect(() => {
    if (!loading) {
      setDataset(data.filter(e => localData.includes(e.id)));
    }
    if (err) console.error(err);
  }, [loading, err, data, localData]);

  const handleClick = (i, n) => {
    AddToWishList(i, n);
    setLocalData(findDB('wishList'));
  };

  return (
    <main className="w-11/12 mx-auto my-8">
      <h1 className="text-3xl font-bold my-3">
        WishList <small>({dataset.length})</small>
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="grid grid-cols-1 place-content-center gap-4">
          {dataset.length === 0 ? (
            <p className="flex items-center text-gray-400 justify-center min-h-[60vh]">
              Nothing found in your wishList
            </p>
          ) : (
            dataset.map((e) => (
              <span
                key={e.id}
                className="rounded-xl flex items-center justify-between gap-2 text-gray-800 shadow-md/80 shadow-gray-500"
              >
                <img
                  src={e.image}
                  alt={e.name}
                  className="h-30 rounded-xl m-2 aspect-square"
                />
                <div className="m-4 space-y-2 w-full">
                  <strong className="text-lg">{e.name}</strong>
                  <div className="flex my-2 text-sm font-semibold px-2 justify-between gap-2">
                    <Link to="/details" state={e} className="italic">
                      See details_
                    </Link>
                    <p>Price : ${e.price}</p>
                  </div>
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => handleClick(e.id, e.name)}
                      className="px-4 py-2 bg-gray-800 text-white text-xs font-bold rounded-md cursor-pointer hover:shadow shadow-gray-600 transition-all duration-300 transition-discrete"
                    >
                      Buy now
                    </button>
                    <button
                      onClick={() => handleClick(e.id, e.name)}
                      className="cursor-pointer px-4 py-2 rounded-lg bg-gray-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </span>
            ))
          )}
        </section>
      )}
    </main>
  );
}
