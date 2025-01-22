//import Routes and Route from react-router-dom
import { Routes, Route } from 'react-router-dom';
//import the components
import Home from './markup/pages/Home'
import Login from './markup/pages/Login'
import AddEmployee from './markup/pages/Admin/AddEmployee'



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/add-Employee" element={<AddEmployee />} />
      </Routes>
    </>
  )
}

export default App
