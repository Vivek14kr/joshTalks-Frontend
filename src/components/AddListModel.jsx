import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import "./EditModel.css";

import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

import Alert from "react-bootstrap/Alert";
import { loadData } from "./localStorage";

function AddListModel(props) {
  let [form, setForm] = useState({});
  let token = loadData("token")
 const handleAdd = (e)=>{
    e.preventDefault()
fetch("https://shy-puce-lobster-veil.cyclic.app/lists/add-lists", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: ` Bearer ${token}`,
  },
  body: JSON.stringify(form),
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data, " checcking upcomi ng");
    props.onHide();
  });

 }

//   const handleEdit = (id) => {
//     console.log(id, " nejfwej");
//   };
  const handleChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });
  };

  console.log(form, "dfjnsdj");

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="my-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Todo List
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ height: "500px", overflow: "scroll" }}>
       
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleChange(e.target);
                  }}
                  name="name"
                  type="text"
                  placeholder="Enter List Name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    handleChange(e.target);
                  }}
                  name="description"
                  type="text"
                  placeholder="Enter Description"
                />
              </Form.Group>
            </Form>
            <hr />
            <Button
              variant="primary"
              onClick={handleAdd}
              style={{
                margin: "auto",
                marginTop: "10%",

                justifyContent: "center",
                backgroundColor: "black",
                color: "white",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              Add
            </Button>
       
      </Modal.Body>
    </Modal>
  );
}

export default AddListModel;
