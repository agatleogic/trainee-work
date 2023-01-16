import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Login from "./logRegComponent/Login";
import Ragister from "./logRegComponent/Ragister";
import ResetPass from "./logRegComponent/ResetPass";
import ForgetPass from "./logRegComponent/ForgetPass";
import Private from "./components/Private";
import Home from "./components/Home";

function App() {

  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>

            <Route  element={<Private />} >
            <Route path="/" element={<Home />} />

            </Route>

            <Route path="/register" element={<Ragister />} />
            <Route path="/login" element={<Login />} />            
            <Route path="/pass-reset" element={<ResetPass />} />            
            <Route path="/forgotpassword/:id/:token" element={<ForgetPass />} />            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

