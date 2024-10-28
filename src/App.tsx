import { BrowserRouter, Route, Routes } from "react-router-dom";
import Provider from "./components/Provider";
import Home from "./pages/Home";
import Header from "./components/Header";
import MyCourses from "./pages/MyCourses";
import Subscription from "./pages/Subscription";
import Form from "./pages/Form";
import Course from "./pages/Course";
import ChapterForm from "./pages/ChapterForm";

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
            <Route path={"/course/:id"} element={<Course />} />
            <Route path={"/course/chapter-form"} element={<ChapterForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
