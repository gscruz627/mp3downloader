import { BrowserRouter, Navigate, Routes, Route }from "react-router-dom"
import { useSelector } from "react-redux"
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
  const isAuth = useSelector((state) => state.token)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConvertPage/>}/>
        <Route path="/login" element={ isAuth ? <Navigate to="/"/> : <LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/downloads" element={isAuth ? <DownloadsPage/> : <Navigate to="/"/>}/>
        <Route path="/es" element={<ConvertPageES/>}/>
        <Route path="/es/login" element={isAuth ? <Navigate to="/es"/> :<LoginPageES/>}/>
        <Route path="/es/register" element={isAuth ? <Navigate to="/es"/> :<RegisterPageES/>}/>
        <Route path="/es/downloads" element={isAuth ? <DownloadsPageES/> : <Navigate to="/es"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
