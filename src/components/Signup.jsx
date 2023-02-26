import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { saveData } from "./localStorage";

function UserRegistration() {
  const [form, setForm] = useState({});
     const [error, setError] = useState(false);
        const [widthTotal, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [token, setToken] = useState("")
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
  const handleSubmit = (e) => {
   


    if (Object.keys(form).length === 0) {
      setError(true);
      console.log("djfnj")
         setTimeout(() => {
           setError(false);
         }, 2000);
      return
    }
   
 

      fetch("https://shy-puce-lobster-veil.cyclic.app/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.message && data.message == "Email already exists") {
            setError(true);
          } else {
            saveData("token", data.token);

            navigate("/");
          }
        })
        .catch((err) => {
          setError(true);
        });

      setTimeout(() => {
        setError(false);
      }, 2000);
  }

  const TopDiv = {
    margin: "auto",
    color: "white",
    paddingTop: widthTotal > 500 ? "5%" : "15%",

    justifyContent: "center",
    textAlign: "left",

    alignItems: "center",
    alignContent: "center",
  };
  return (
    <div
      style={TopDiv}
    >
      <div
        style={{
          margin: "auto",
          width: "60%",
          justifyContent: "center",

          textAlign: "left",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Sign Up</h1>

        {error ? (
          <Alert key={"danger"} variant={"danger"}>
            SignUp Unsuccessful! Try Again.
          </Alert>
        ) : (
          ""
        )}
        <Form
          style={{
            width: "100%",

            margin: "auto",
            padding: "5%",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Group
            style={{
              width: "70%",

              margin: "auto",
            }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              onChange={(e) => {
                handleChange(e.target);
              }}
              type="text"
              placeholder="Enter Username"
            />
          </Form.Group>

          <Form.Group
            style={{
              width: "70%",

              margin: "auto",
            }}
            className="mb-3"
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              onChange={(e) => {
                handleChange(e.target);
              }}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group
            style={{
              width: "70%",

              margin: "auto",
            }}
            className="mb-3"
            controlId="formBasicPassword"
          >
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
          <Form.Group
            style={{ display: "flex", width: "fit-content", margin: "auto" }}
          >
            <Button onClick={handleSubmit} style={{ margin: "auto" }} variant="primary">
              Submit
            </Button>
            <Button
              style={{
                margin: "auto",
                marginLeft: "5%",
              }}
              onClick={() => {
                navigate("/signin");
              }}
            >
              SignIn
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}

export default UserRegistration;
