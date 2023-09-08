import { BrowserRouter, Navigate, Routes, Route }from "react-router-dom"
import HomePage from "../views/HomePage"
import RegisterPage from "../views/RegisterPage"
import LoginPage from "../views/LoginPage"
import ConvertPage from "../views/ConvertPage"
import DownloadsPage from "../views/DownloadsPage"
import '../public/styles.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConvertPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/downloads" element={<DownloadsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
