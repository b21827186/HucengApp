import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./components/MainPage";
import RegisterScreen from "./components/RegisterScreen"
import LoginScreen from "./components/LoginScreen"
import AdminLogin from "./components/AdminLogin"
import AdminPanel from "./components/AdminPanel"


function App() {
  document.title = 'your title name';
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginScreen />}/>
          <Route path='/register' element={<RegisterScreen />}/>
          <Route path='/feed' element={<MainPage />}/>
          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admin/panel' element={<AdminPanel/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
