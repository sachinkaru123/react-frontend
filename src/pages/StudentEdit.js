import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";

function StudentEdit() {

    let { id } = useParams(); //getting id
    const navigate = useNavigate(); //use for redirect back


    // console.log(id);
    const [loading, setLoading] = useState(true);
    const [student, setStudent] = useState({})

    const handleInput = (e) => {
        e.persist();
        setStudent({ ...student, [e.target.name]: e.target.value });
    }


    const updateStudent = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: student.name,
            email: student.email,
            phone: student.phone,
            course: student.course
        }

        //update function
        axios.put(`http://react-laravel.test/api/student/${id}/edit`, data).then((response) => {
            console.log(response);
            setLoading(false);
            alert('Successfuly Updated the Data!');
            navigate('/students');
        })
            .catch(function (error) {

                if (error.response.status === 404) {
                    setLoading(false);
                    alert('User Not Found!');
                }
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

    useEffect(() => { //this is how we fetch api
        axios.get(`http://react-laravel.test/api/student/${id}/edit`).then(res => {

            console.log(res);
            setStudent(res.data);
            setLoading(false);
        })
            .catch(function (error) {

                if (error.response.status === 404) {
                    setLoading(false);
                    alert('User Not Found!');
                }
                if (error.response.status === 422) {
                    setLoading(false);
                    setInputErrorList(error.response.data.errors)
                }
                //for try catch in laravel
                if (error.response && error.response.status === 500) {
                    console.log(error.response.data); // Log the error message received from the backend
                    alert('An error occurred: ' + error.response.data); // Display the error message to the user
                } else {
                    console.error('Request failed:', error); // Log other types of errors for debugging
                }
            });
    }, [id]);

    const [inputErrors, setInputErrorList] = useState({});

    if (loading) {
        return (
            <Loader />
        );
    }


    //check is there is a student or not
    if(Object.keys(student).length === 0){
        return(
            <div className="container">
                <h3>No Such Student</h3>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Student</h4>
                            <Link to="/students" className="btn btn-primary float-end">Back</Link>

                        </div>
                        <div className="card-body p-5">

                            <form onSubmit={updateStudent}>
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

                                <button type="submit" className="btn btn-primary">Update Student</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentEdit;