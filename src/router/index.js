import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home'; //need to go back to one folder and  then add the pages folder. 
import About from '../pages/About';
import Contact from '../pages/Contact';
import Student from '../pages/Student';
import StudentCreate from '../pages/StudentCreate';
import StudentEdit from "../pages/StudentEdit";



function MyRouter() {

    return (
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about-us" element={<About />}></Route>
            <Route path="/contact-us" element={<Contact />}></Route>
            <Route path="/students" element={<Student />}></Route>
            <Route path="/student/create" element={<StudentCreate />}></Route>
            <Route path="/student/:id/edit" element={<StudentEdit />}></Route>
        </Routes>
    );
}

export default MyRouter;