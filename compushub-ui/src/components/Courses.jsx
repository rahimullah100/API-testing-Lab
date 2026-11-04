import { useEffect, useState } from "react";
import { getCourses, updateCourse, deleteCourse } from "../services/courseApi";

function Courses() {

    // Store courses received from Spring Boot
    const [courses, setCourses] = useState([]);

    // store the selected course for editing
    const [editingId, setEditingId] = useState(null);

    // store form values
    const[course, setCourse] = useState(
        {
            code: "",
            title: "",
            credits: ""
        }
    );
    // store feedback messaage
    const [message, setMessage] = useState("");
    const [error, setError]     = useState("");

    // load the courses when the componenet mounts
useEffect(() => {

    let active = true;

    const fetchCourses = async () => {
        try {
            const response = await getCourses();
            if(active){
                 setCourses(response.data);
            }}
            catch(err){
                if(active){
                    setError("Failed to load the course!");
                    console.error(err);
                }
            }  

        };

    fetchCourses();
    return () => {
        active = false;
    };
}, []);
// reload course after update or delete
 const loadCourses = async () =>{
    const response = await getCourses();
    setCourses(response.data);
 };
 // load selected course into the edit form
 const handleEdit = (selectedCourse) => {
    setEditingId(selectedCourse.id);
    setCourse({
        code: selectedCourse.id,
        title: selectedCourse.title,
        credits: selectedCourse.credits
    });
    setMessage("");
    setError("");
 };
 // update form state when input changes
 const handleChange = (event) =>{
    const {name, value} = event.target;
    setCourse((previous) => ({
            ...previous,
            [name]: value
        }));
 };
  // Send updated course to Spring Boot
  const handleUpdate = async (event) =>{
    event.preventDefault();
    const updatedCourse = {
            code: String(course.code).trim(),
            title: String(course.title).trim(),
            credits: Number(course.credits)
        };
        try {
            await updateCourse(editingId, updatedCourse);

            await loadCourses();

            setEditingId(null);
            setCourse({
                code: "",
                title: "",
                credits: ""
            });

            setError("");
            setMessage("Course updated successfully!");

        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Failed to update course."
            );
        }

  };
  // Delete selected course
   const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteCourse(id);

            await loadCourses();

            if (editingId === id) {
                setEditingId(null);
            }

            setError("");
            setMessage("Course deleted successfully!");

        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Failed to delete course."
            );
        }
    };


    return (
        <div className="container mt-4">

            <h2 className="text-center mb-4">
                Course Management
            </h2>

            {/* Success message */}
            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Edit form appears only in edit mode */}
            {editingId !== null && (
                <div className="card mb-4 shadow-sm">

                    <div className="card-header bg-warning">
                        <strong>Edit Course</strong>
                    </div>

                    <div className="card-body">

                        <form onSubmit={handleUpdate}>

                            <div className="row g-3">

                                <div className="col-md-3">
                                    <label className="form-label">
                                        Course Code
                                    </label>

                                    <input
                                        type="text"
                                        name="code"
                                        className="form-control"
                                        value={course.code}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-5">
                                    <label className="form-label">
                                        Course Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control"
                                        value={course.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-2">
                                    <label className="form-label">
                                        Credits
                                    </label>

                                    <input
                                        type="number"
                                        name="credits"
                                        className="form-control"
                                        value={course.credits}
                                        onChange={handleChange}
                                        min="1"
                                        required
                                    />
                                </div>

                                <div className="col-md-2 d-flex align-items-end">
                                    <button
                                        type="submit"
                                        className="btn btn-success w-100"
                                    >
                                        Update
                                    </button>
                                </div>

                            </div>

                            <button
                                type="button"
                                className="btn btn-secondary mt-3"
                                onClick={() => setEditingId(null)}
                            >
                                Cancel
                            </button>

                        </form>
                    </div>
                </div>
            )}

            {/* Course table */}
            <div className="table-responsive">

                <table className="table table-bordered table-hover text-center">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Credits</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {courses.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.code}</td>
                                <td>{item.title}</td>
                                <td>{item.credits}</td>

                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
}


export default Courses;