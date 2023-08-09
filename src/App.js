import Header from "./components/Header/Header";
import About from "./components/About/About";
import LandingPage from "./Screens/LandingPage/LandingPage";
import Signin from "./Screens/Signin/Signin";
import Register from "./Screens/Signup/Register";
import Products from "./Screens/Products/Products";
import Transaction from "./Screens/Transaction/Transaction";
import EmployeeScreen from "./Screens/Employee/EmployeeScreen";
import AdminDashboard from "./components/Dashboard/admin/AdminDashboard";
import GiftCard from "./Screens/GiftCard/GiftCard";
import Locker from "./Screens/Locker/Locker";
import CreditCard from "./Screens/CreditCard/CreditCard";
import AgriNews from "./Screens/News/AgriNews";
import IndianNews from "./Screens/News/IndianNews";
import Forecast from "./Screens/Weather/Forecast/Forecast";
import ContentWriter from "./Screens/Content/ContentWriter";
import Feed from "./Screens/Content/Feed";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Service/utilities/auth";
import { RequireAuth } from "./components/Service/utilities/RequireAuth";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loan from "./Screens/Loan/Loan";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />

        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route
            path="/products"
            element={
              <RequireAuth>
                <Products />
              </RequireAuth>
            }
          />
          <Route
            path="/transaction"
            element={
              <RequireAuth>
                <Transaction />
              </RequireAuth>
            }
          />
          <Route
            path="/employee"
            element={
              <RequireAuth>
                <EmployeeScreen />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/loan"
            element={
              <RequireAuth>
                <Loan />
              </RequireAuth>
            }
          />
          <Route
            path="/credit"
            element={
              <RequireAuth>
                <CreditCard />
              </RequireAuth>
            }
          />
          <Route
            path="/gift"
            element={
              <RequireAuth>
                <GiftCard />
              </RequireAuth>
            }
          />
          <Route
            path="/locker"
            element={
              <RequireAuth>
                <Locker />
              </RequireAuth>
            }
          />
          <Route
            path="/agriculture-news"
            element={
              <RequireAuth>
                <AgriNews />
              </RequireAuth>
            }
          />
          <Route
            path="/local-news"
            element={
              <RequireAuth>
                <IndianNews />
              </RequireAuth>
            }
          />
          <Route
            path="/weather"
            element={
              <RequireAuth>
                <Forecast />
              </RequireAuth>
            }
          />
          <Route
            path="/publish"
            element={
              <RequireAuth>
                <ContentWriter />
              </RequireAuth>
            }
          />
          <Route
            path="/feed"
            element={
              <RequireAuth>
                <Feed />
              </RequireAuth>
            }
          />
        </Routes>
        <About />
        <ToastContainer />
      </AuthProvider>
    </div>
  );
}

export default App;
