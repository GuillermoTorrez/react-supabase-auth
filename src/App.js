import "./App.css";
import { useEffect } from "react";
import { supabase } from "./supabase/client";

import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { TaskContextProvider } from "./context/TaskContext";

function App() {
  const navigate = useNavigate();
  
  useEffect(() => {
      supabase.auth.onAuthStateChange((event, session) =>{
        if(!session){
          navigate('/login')
        } else{
          navigate('/')
        }
      })  

  }, [navigate])
  

  return (
    <div className="App">
      <TaskContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </TaskContextProvider>
    </div>
  );
}

export default App;
