//import Routes and Route from react-router-dom
import { Routes, Route } from 'react-router-dom';
//import the components
import Home from './markup/pages/Home'
import Login from './markup/pages/Login'
import AddEmployee from './markup/pages/Admin/AddEmployee'
import Header from './markup/components/Header/Header';
import "./App.css"
import Footer from './markup/components/Footer/Footer';




function App() {


  return (
    <>
    {/* header section */}
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-Employee" element={<AddEmployee />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
