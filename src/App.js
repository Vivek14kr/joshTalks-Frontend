import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import UserRegistration from './components/Signup';
import Home from './components/Home';
import Navbarr from './components/Navbar';
import UserLogin from './components/Signin';
import { PrivateRoute } from './components/privateRoute';
import { SignUpRoute } from './components/signUpRoute';
import { LoginRoute } from './components/loginRoute';

function App() {
  return (
    <div className="App " style={{ height: "100vh", backgroundColor: "black" }}>
      <Navbarr />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <SignUpRoute>
              <UserRegistration />
            </SignUpRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <LoginRoute>
              <UserLogin />
            </LoginRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
