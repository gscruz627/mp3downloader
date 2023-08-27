import { BrowserRouter, Navigate, Routes, Route }from "react-router-dom"
import HomePage from "../views/HomePage"
import RegisterPage from "../views/RegisterPage"
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<loginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        {/*
        <Route path="/downloads" element={<UserDownloadsPage/>}/>
        <Route path="/convert" element={<NewConvertPage/>}/>
  -->*/}
      </Routes>
    </BrowserRouter>
  )
}

export default App
