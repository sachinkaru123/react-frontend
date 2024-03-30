import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function StudentCreate() {

    const navigate= useNavigate(); //use for redirect back

    const [loading, setLoading] = useState(false);
    const [student, setStudent] = useState({
        name: '',
        email: '',
        phone: '',
        course: ''
    })

    const handleInput = (e) => {
        e.persist();
        setStudent({ ...student, [e.target.name]: e.target.value });
    }

    const saveStudent = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: student.name,
            email: student.email,
            phone: student.phone,
            course: student.course
        }

        axios.post("http://react-laravel.test/api/students/create", data).then((response) => {
            console.log(response);
            setLoading(false);
            alert('Estudante cadastrado com sucesso!');
            navigate('/students');
        })
            .catch(function (error) {

                if (error.response.status === 422) {
                    setLoading(false);
                    setInputErrorList(error.response.data.errors)
                }
                if (error.response.status === 500) {
                    setLoading(false);
                    alert('Something Went Wrong!');
                }
            });
    }


    const [inputErrors, setInputErrorList] = useState({});

    if (loading) {
        return (
            <Loader />
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h4>Create Student</h4>
                            <Link to="/students" className="btn btn-primary float-end">Back</Link>

                        </div>
                        <div className="card-body p-5">

                            <form onSubmit={saveStudent}>
                                <div className="form-group m-2">
                                    <label htmlFor="name">Student Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={student.name} className="form-control" id="name" placeholder="Enter Student Name" />
                                    <span className="text-danger">{inputErrors.name}</span>
                                </div>
                                <div className="form-group m-2">
                                    <label htmlFor="course">Course</label>
                                    <input type="text" name="course" className="form-control" onChange={handleInput} value={student.course} id="course" placeholder="Enter Course" />
                                    <span className="text-danger">{inputErrors.course}</span>
                                </div>

                                <div className="form-group m-2">
                                    <label htmlFor="Email">Email</label>
                                    <input type="email" name="email" className="form-control" onChange={handleInput} value={student.email} id="email" placeholder="Enter Email" />
                                    <span className="text-danger">{inputErrors.email}</span>
                                </div>

                                <div className="form-group m-2">
                                    <label htmlFor="Phone">Phone</label>
                                    <input type="text" name="phone" className="form-control" onChange={handleInput} value={student.phone} id="course" placeholder="Enter Phone" />
                                    <span className="text-danger">{inputErrors.phone}</span>
                                </div>

                                <button type="submit" className="btn btn-primary">Save Student</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentCreate;