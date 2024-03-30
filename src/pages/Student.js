import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

function Student() {

    const [loading, setLoading] = useState(true); //loading bootstrap spinner
    const [students, setStudents] = useState([]); //fetching data using api 

    //getting and setting data 
    useEffect(() => { //this is how we fetch api
        axios.get('http://react-laravel.test/api/students').then(res => {

            console.log(res);
            setStudents(res.data);
            setLoading(false);
        });
    }, [])

    //loading function spinner
    if (loading) {
        return (
            <Loader />
        );
    }

    //delete function
    const deleteStudent = (e, id) => {
        e.preventDefault();

        // Accessing the target element
        const thisClicked = e.currentTarget;

        // Change the text of the button to indicate deletion is in progress
        thisClicked.innerText = "Deleting...";

        // Send a DELETE request to the server to delete the student with the given ID
        axios.delete(`http://react-laravel.test/api/student/${id}/delete`)
            .then((response) => {
                console.log(response);

                // Find the closest <tr> (table row) element and remove it from the DOM
                thisClicked.closest("tr").remove();

                // Show an alert indicating successful deletion
                alert('Successfully deleted the Data!');
            })
            .catch(function (error) {
                if (error.response && error.response.status === 404) {
                    // Handle 404 error (Student Not Found)
                    console.log(error.response.data);
                    alert('User Not Found!');
                } else if (error.response && error.response.status === 500) {
                    // Handle 500 error (Internal Server Error)
                    console.log(error.response.data);
                    alert('An error occurred: ' + error.response.data);
                } else {
                    // Log other types of errors for debugging
                    console.error('Request failed:', error);
                }
            })
            .finally(() => {
                // Reset the button text after the operation is complete
                thisClicked.innerText = "Delete";
            });
    }



    //new student data creation
    var studentDetails = "";
    studentDetails = students.map((item, index) => {
        return ( //creating elements  for each item in array
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                    <Link to={`/student/${item.id}/edit`} className="btn btn-success">Edit</Link>
                </td>
                <td>
                    {/* <Link to={`/student/${item.id}/delete`} className="btn btn-danger">Delete</Link> */}
                    <div onClick={(e) => { deleteStudent(e, item.id) }} className="btn btn-danger">Delete</div>
                </td>
            </tr>
        )
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h4>Students List</h4>
                            <Link to="/student/create" className="btn btn-primary float-end">Add Student</Link>

                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Student;