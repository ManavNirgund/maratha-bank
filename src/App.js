import "./App.css";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import LandingPage from "./Screens/LandingPage/LandingPage";
import Signin from "./Screens/Signin/Signin";
import Register from "./Screens/Signup/Register";
import Products from "./Screens/Products/Products";
import Transaction from "./Screens/Transaction/Transaction";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/Service/utilities/auth";
import { RequireAuth } from "./components/Service/utilities/RequireAuth";

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
          {/* <Route
            path="/loan"
            element={
              <RequireAuth>
                <Loan />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/credit"
            element={
              <RequireAuth>
                <CreditCard />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/gift"
            element={
              <RequireAuth>
                <GiftCard />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/locker"
            element={
              <RequireAuth>
                <Locker />
              </RequireAuth>
            }
          ></Route> */}
        </Routes>
        <About />
      </AuthProvider>
    </div>
  );
}

export default App;
