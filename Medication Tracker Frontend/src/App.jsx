import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./Component/Navbar"; 



function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        {/*All Routes Will be here */}
      </Routes>
    </Router>
  );
}

export default App;
