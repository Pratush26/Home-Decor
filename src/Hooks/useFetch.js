import axios from "axios"
import { useState, useEffect } from "react"

export const useFetch = (url) => {
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    const [data, setData] = useState([])
    useEffect(() => {
        axios(url).then(res => setData(res.data)).catch(e => setErr(e)).finally(() => setLoading(false))
    }, [url])
    return { loading, err, data }
}