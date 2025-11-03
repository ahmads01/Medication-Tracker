import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Sidebar from "./Component/Sidebar";
import Topbar from "./Component/Topbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <AppRoutes />
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
