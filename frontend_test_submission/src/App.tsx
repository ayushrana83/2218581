import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import Statitics from "./Components/Statitics";

function App() {
  return (
    <div style={{backgroundColor:"white"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/statitics" element={<Statitics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
