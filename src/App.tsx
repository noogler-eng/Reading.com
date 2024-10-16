import { BrowserRouter, Route, Routes } from "react-router-dom";
import Provider from "./components/Provider";
import Home from "./pages/Home";
import Header from "./components/Header";
import MyCourses from "./pages/MyCourses";
import Subscription from "./pages/Subscription";
import Form from "./pages/Form";

function App() {
  return (
    <Provider>
      <div className="bg-black text-white min-h-screen">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/my-courses"} element={<MyCourses />} />
            <Route path={"/my-courses/form"} element={<Form />} />
            <Route path={"/subscribe"} element={<Subscription />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
