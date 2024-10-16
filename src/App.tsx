import { BrowserRouter, Route, Routes } from "react-router-dom";
import Provider from "./components/Provider";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <Provider>
      <div className="bg-black text-white min-h-screen">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
