function Dashboard() {
    return (
        <div>
            <h2>University Management System</h2>

            <p className="text-muted">
                Manage courses, students, sections,
                registrations, waitlists, and requests.
            </p>

            <div className="row mt-4">

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                Courses
                            </h5>

                            <p className="card-text">
                                Create and manage university courses.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                Students
                            </h5>

                            <p className="card-text">
                                View and manage student records.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">
                                Registrations
                            </h5>

                            <p className="card-text">
                                Manage student course registrations.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;