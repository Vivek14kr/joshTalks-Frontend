
import React, { useContext, useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from 'react-router-dom';

import Alert from "react-bootstrap/Alert";
import { loadData, saveData } from './localStorage';



function UserLogin() {
   const [form, setForm] = useState({});
   const [error, setError] = useState(false);
   const [widthTotal, setWidth] = useState(window.innerWidth);

     const navigate = useNavigate();
     const handleChange = ({ name, value }) => {
       setForm({
         ...form,
         [name]: value,
       });
     };
      useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);


     const handleSubmit =  (e) => {

        console.log("coinirnf")
       e.preventDefault();
       
       fetch("https://shy-puce-lobster-veil.cyclic.app/users/login", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(form),
       })
         .then((res) => res.json())
         .then((data) => {
           if (data.message && data.message == "Invalid email or password") {
             setError(true);
             setTimeout(() => {
               setError(false);
             }, 2000);
           } else {
             saveData("token", data.token);
             navigate("/");
           }
         })
         .catch((err) => {
           console.log(err, " dfnsekfn");
           setError(true);
           setTimeout(() => {
             setError(false);
           }, 2000);
         });

        
     };  

        const TopDiv = {
          backgroundColor: "black",
          height: "100vh",
          color: "white",
          paddingTop: widthTotal > 500 ? "5%" : "15%",
        };
  return (
    <div
      style={TopDiv}
    >
      <h2 style={{ paddingTop: "2%" }}>User Login</h2>

      {error ? (
        <Alert key={"danger"} variant={"danger"}>
          Login Unsuccessful! Try Again.
        </Alert>
      ) : (
        ""
      )}
      <div style={{ width: "60%", margin: "auto" }}>
        <Form
          style={{
            margin: "auto",

            textAlign: "left",
            border: "1px solid black",
            padding: "50px",
            borderRadius: "20px",
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => {
                handleChange(e.target);
              }}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              onChange={(e) => {
                handleChange(e.target);
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button variant="primary"onClick={handleSubmit}>
            Login
          </Button>
        </Form>
        <span
          style={{ display: "flex", width: "100%", margin:"auto", justifyContent: "space-around" }}
        >
          
          <span>
            <p style={{ marginLeft: "5%" }}>Didn't have an Account </p>

            <Link to="/signup" style={{ marginLeft: "5%" }}>
              {" "}
              <Button>Signup</Button>
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}

export default UserLogin