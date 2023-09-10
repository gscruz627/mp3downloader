import React, { useEffect, useState } from 'react'
import NavbarES from '../components/NavbarES';
import "../public/styles.css"
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router';

const ConvertPageES = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const RAPID_KEY = import.meta.env.RAPID_KEY

  const link = searchParams.get('link');
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const user = useSelector((state) => state.user)
  const [currentURL, setCurrentURL] = useState(link ? link : "");
  const [alertFailed, setAlertFailed] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoAuthor, setVideoAuthor] = useState("");
  const [videoThumb, setVideoThumb] = useState("");
  const [displaySucess, setDisplaySuccess] = useState(false)

  // Iframe click detection
  const clearFields = () => {
    setVideoId("")
    setCurrentURL("")
    setVideoTitle("")
    setVideoAuthor("")
    setVideoThumb("")
  }
  const handleRequest = async () => {
    if (currentURL) {
      const infoRequest = await fetch(`https://youtube-mp3-download1.p.rapidapi.com/dl?id=${videoId}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPID_KEY,
          'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
        }
      })
      const infoParsed = await infoRequest.json()
      setVideoTitle(infoParsed["title"])
      setVideoAuthor(infoParsed["author"])
      setVideoThumb(infoParsed["thumb"])
    }
  }
  useEffect(() => {
      handleRequest();
  }, [videoId])

  const handlePOSTrequest = async () => {
    const postRequest = await fetch(`${SERVER_URL}/newdownload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        title: videoTitle,
        download_author: videoAuthor,
        url: currentURL
      })
    })

    const postParsed = await postRequest.json()
    if (postParsed) {
      setDisplaySuccess(true)
      setTimeout(() => {
        setDisplaySuccess(false)
      }, 5000)
    } else {
      alert("Error en la Base de datos, tu descarga es correcta solo no esta salvada en tu cuenta")
    }
  }
  useEffect(() => {
    if(user){
      if(currentURL){
        handlePOSTrequest();
      }
    }
  }, [videoAuthor])

  const handleConvert = async () => {
    if (currentURL.startsWith("https://youtube.com/watch?v=") || currentURL.startsWith("https://www.youtube.com/watch?v=" || currentURL.startsWith("youtube.com/watch?v=") || currentURL.startsWith("www.youtube.com/watch?v="))) {
      setVideoId(currentURL.substring(currentURL.indexOf("=") + 1, currentURL.length))
      if (videoId.includes("&")) {
        setVideoId(videoId.substring(videoId[0], videoId.indexOf("&")))
      }
    } else {
      setAlertFailed(true)
      setCurrentURL("")
      setTimeout(() => {
        setAlertFailed(false)
      }, 7000)
    }

  }
  return (
    <>
      <NavbarES />
      <div className="center-block">
        <p style={{display: displaySucess ? "block" : "none", color: "green"}}>Guardado en tu cuenta correctamente</p>
        <h1>Convierte y Descarga un link de Youtube</h1>
        <input type="text" value={currentURL} onChange={(event) => setCurrentURL(event.target.value)} />
        <button className="btn blueBTN" onClick={() => handleConvert()}>Convertir</button>
        <br />
        <h4 style={{ display: alertFailed ? "block" : "none", textAlign: "center", margin: "1rem auto", color: "red" }}>No se pudo encontrar el video, intente el link completo, (ejemplo: https://youtube.com/ ... )</h4>
        <h4 style={{ display: videoId ? "block" : "none", textAlign: "center", margin: "1rem auto" }}>Convertido correctamente!, dale click al boton de abajo para descargar</h4>
        <div style={{ visibility: videoId ? "visible" : "hidden" }}>
          <iframe id="mp3iframe" rel='nofollow' style={{ width: "300px", height: "60px", border: "0", display: "block" }} src={`https://apiyt.com/iframe/?vid=${videoId}&color=2DB94D&utm_source=api`}></iframe>
        </div>
        <div id="video-card">
          <img src={videoThumb} width="200px" />
          <div>
            <h3>{videoTitle}</h3>
            <p>{videoAuthor}</p>
          </div>
        </div>
        <br /><br />
        <button className="btn blueBTN" onClick={() => clearFields()}>VACIAR LINK</button>
        <br /><br />
        <p style={{ display: videoTitle ? "block" : "none" }}>No es el video correcto? <b style={{ color: "purple", cursor: "pointer" }} onClick={() => clearFields()}>Intenta de nuevo</b></p>
      </div>
    </>
  )
}

export default ConvertPageES