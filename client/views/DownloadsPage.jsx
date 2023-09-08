import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { setDownloads } from '../store';
import { Link } from 'react-router-dom';

const DownloadsPage = () => {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;
    const downloads = useSelector((state) => state.downloads);
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)

    const getDownloads = async () => {
        const request = await fetch(`${SERVER_URL}/downloads/${user.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const requestJSON = await request.json()
        dispatch(setDownloads({ downloads: requestJSON }))
    }
    useEffect(() => {
        getDownloads();
    }, [])
    return (
        <>
            <Navbar />
            <div className="center-block">
                <h2>Previous URLs</h2>
                <br />
                <small>Will need to download again</small>
                <br />

                {downloads && (
                    downloads.map((download, i) => (
                        <div key={i} className="download-card">
                            <h4>{download.title}</h4>
                            <p>{download.author}</p>
                            <Link to={{
                                pathname: '/',
                                search: `?link=${download.url}`
                            }}><button className="btn blueBTN"><i className="fa-solid fa-download"></i></button></Link>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default DownloadsPage