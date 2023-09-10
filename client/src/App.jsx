import { BrowserRouter, Navigate, Routes, Route }from "react-router-dom"
import RegisterPage from "../views/RegisterPage"
import LoginPage from "../views/LoginPage"
import ConvertPage from "../views/ConvertPage"
import DownloadsPage from "../views/DownloadsPage"
import RegisterPageES from "../views/RegisterPageES"
import LoginPageES from "../views/LoginPageES"
import ConvertPageES from "../views/ConvertPageES"
import DownloadsPageES from "../views/DownloadsPageES"
import '../public/styles.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConvertPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/downloads" element={<DownloadsPage/>}/>
        <Route path="/es" element={<ConvertPageES/>}/>
        <Route path="/es/login" element={<LoginPageES/>}/>
        <Route path="/es/register" element={<RegisterPageES/>}/>
        <Route path="/es/downloads" element={<DownloadsPageES/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
