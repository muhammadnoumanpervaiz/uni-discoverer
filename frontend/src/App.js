import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import UniversityDetail from "./components/UniversityDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
      <Route path="/university-detail" element={<UniversityDetail/>} />
    </Routes>
  );
}

export default App;
