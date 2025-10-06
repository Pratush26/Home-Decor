import { useFetch } from "../Hooks/useFetch"

export default function Home () {
    const {loading, err, data} = useFetch('/furnitureData.json')
    console.log(data)
    return (
        <main>
            Home
        </main>
    )
}