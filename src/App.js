import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";
import LogInForm from "./Components/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/" element={<LogInForm />} />
      </Routes>
    </>
  );
}

export default App;
