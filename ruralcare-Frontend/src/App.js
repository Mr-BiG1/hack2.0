// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Register from "./pages/Register";
// import ChatPage from "./pages/ChatPage"; 
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Home from "./Home"; 
// import "./App.css"; 

// function App() {
//   return (
//     <Router>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container">
//           <Link className="navbar-brand" to="/">RuralCare</Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav ml-auto">
//               <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="container mt-5">
//         <Routes>
//         <Route path="/" element={<Home />} /> {/* Home Page */}
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./Home";
import "./App.css";

// Protected Route Component: Ensures user is logged in before accessing a page
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">RuralCare</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/chat">Chat</Link></li> {/* Chat in Nav */}
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/chat" element={<ProtectedRoute element={<ChatPage />} />} /> {/* Chat Protected */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
