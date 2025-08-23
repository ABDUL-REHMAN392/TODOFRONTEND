import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AppRoutes } from "./components/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />

        <ToastContainer position="top-center" autoClose={2000} />

        <AppRoutes />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
