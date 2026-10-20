import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const initialStudents = [
  { id: 101, name: "Ritika", major: "Computer Science", year: 2, gpa: 3.8 },
  { id: 102, name: "Ekta", major: "Computer Science", year: 2, gpa: 3.8 },
  { id: 103, name: "Sara", major: "Computer Science", year: 2, gpa: 3.8 },
  { id: 104, name: "Ali", major: "Computer Science", year: 2, gpa: 3.8 },
  { id: 105, name: "Hina Malik", major: "Software Engineering", year: 3, gpa: 3.6 },
  { id: 106, name: "Usman Tariq", major: "Data Science", year: 1, gpa: 3.4 },
  { id: 107, name: "Ayesha Noor", major: "Information Technology", year: 4, gpa: 3.9 },
  { id: 108, name: "Bilal Ahmed", major: "Computer Science", year: 3, gpa: 3.2 },
  { id: 109, name: "Zara Iqbal", major: "Software Engineering", year: 2, gpa: 3.7 },
  { id: 110, name: "Hamza Ali", major: "Data Science", year: 4, gpa: 3.5 },
  { id: 111, name: "Noor Fatima", major: "Computer Science", year: 1, gpa: 3.9 },
  { id: 112, name: "Daniyal Khan", major: "Information Technology", year: 3, gpa: 3.3 },
];

const PER_PAGE = 4;

function AppNavbar({ search, setSearch }) {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container">
        <a className="navbar-brand" href="#">StudentPortal</a>
        <ul className="navbar-nav me-auto flex-row gap-3">
          {["Dashboard", "Students", "Courses", "Reports"].map((l) => (
            <li className="nav-item" key={l}>
              <a className="nav-link small" href="#">{l}</a>
            </li>
          ))}
        </ul>
        <div className="d-flex gap-2">
          <input
            className="form-control form-control-sm"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary btn-sm">Search</button>
        </div>
      </div>
    </nav>
  );
}

function Breadcrumbs() {
  return (
    <nav aria-label="breadcrumb" className="bg-dark rounded px-3 py-2 mt-2">
      <ol className="breadcrumb mb-0">
        <li className="breadcrumb-item"><a href="#" className="text-light">Home</a></li>
        <li className="breadcrumb-item"><a href="#" className="text-light">Students</a></li>
        <li className="breadcrumb-item active text-white" aria-current="page">Directory</li>
      </ol>
    </nav>
  );
}

function StudentCard({ student, onDelete }) {
  const [views, setViews] = useState(0);
  const [showDetails, setShowDetails] = useState(true);

  return (
    <div className="card h-100 shadow-sm">
      <div
        className="bg-secondary bg-opacity-25 d-flex justify-content-center align-items-end"
        style={{ height: 110, overflow: "hidden" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="#9aa0a6">
          <circle cx="40" cy="28" r="16" />
          <ellipse cx="40" cy="78" rx="30" ry="24" />
        </svg>
      </div>

      <div className="card-body">
        <h6 className="card-title">{student.name}</h6>

        {showDetails && (
          <div className="small mb-2">
            <div>ID: {student.id}</div>
            <div>Major: {student.major}</div>
            <div>Year: {student.year}</div>
            <div>GPA: {student.gpa}</div>
          </div>
        )}

        <div className="small text-muted mb-2">Profile views: {views}</div>

        <div className="d-flex flex-wrap gap-1">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => setViews(views + 1)}
          >
            View Profile
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(student.id)}
          >
            Delete
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, setPage }) {
  return (
    <nav className="d-flex justify-content-center my-3">
      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <li key={n} className={`page-item ${page === n ? "active" : ""}`}>
            <button className="page-link" onClick={() => setPage(n)}>{n}</button>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-dark text-light mt-4 py-4">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h6>Links</h6>
            <div className="small">Home</div>
            <div className="small">Computer Science</div>
            <div className="small">Courses</div>
            <div className="small">Reports</div>
          </div>
          <div className="col-6">
            <h6>Contact Info</h6>
            <div className="small">Contact Us</div>
            <div className="small">+1: 123 456 7890</div>
            <div className="small">info@studentportal.com</div>
          </div>
        </div>
        <hr />
        <div className="text-center small">© 2026 StudentPortal. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default function App() {
  const [students, setStudents] = useState(initialStudents);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [alertMsg, setAlertMsg] = useState("Student records have been successfully updated.");

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    setAlertMsg("Student deleted successfully.");
  };

  const handleAdd = () => {
    const nextId = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 101;
    setStudents([
      ...students,
      { id: nextId, name: `New Student ${nextId}`, major: "Computer Science", year: 1, gpa: 3.0 },
    ]);
    setAlertMsg("New student added successfully.");
  };

  return (
    <>
      <AppNavbar search={search} setSearch={(v) => { setSearch(v); setPage(1); }} />

      <div className="container">
        <Breadcrumbs />

        <div className="d-flex justify-content-between align-items-center border-bottom py-2 my-2">
          <h4 className="mb-0">Student Directory</h4>
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>
            Add New Student
          </button>
        </div>

        <div className="row g-3">
          {visible.length === 0 && (
            <p className="text-center text-muted">No students found.</p>
          )}
          {visible.map((s) => (
            <div className="col-12 col-sm-6 col-lg-3" key={s.id}>
              <StudentCard student={s} onDelete={handleDelete} />
            </div>
          ))}
        </div>

        <Pagination page={currentPage} totalPages={totalPages} setPage={setPage} />

        {alertMsg && (
          <div className="alert alert-info alert-dismissible" role="alert">
            {alertMsg}
            <button type="button" className="btn-close" onClick={() => setAlertMsg("")} />
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
