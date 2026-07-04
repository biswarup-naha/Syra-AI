import "../styles/globals.css";
import Form from "./components/Form";
import Interview from "./components/Interview";
import Result from "./components/Result";
import { Toaster } from "sonner";
import {BrowserRouter, Routes, Route} from "react-router";

export function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/interview/:id" element={<Interview />} />
        <Route path="/result/:id" element={<Result />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
}

export default App;
