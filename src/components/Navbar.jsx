import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import { loadData, removeData } from "./localStorage";


function Navbarr() {

const navigate = useNavigate()
    let token = loadData("token")
  
  return (
    <>
      <Navbar
        variant="dark"
        style={{
          position: "fixed",
          width: "100%",
          borderBottom: "1px solid white",

          zIndex: 2,
          background: "rgba(0, 0, 0, 0.8)",
        }}
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              {" "}
              To Do
            </Link>
          </Navbar.Brand>
       {token ? <Button style={{backgroundColor:"black", color:"white"}}  onClick={()=>{
       removeData("token")
      navigate("/")
        
       }}>Logout</Button> : ""}   
         
          
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarr;
