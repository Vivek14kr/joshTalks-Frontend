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

function EditModel(props) {
  let [form, setForm] = useState({});

  let token = loadData("token")

  useEffect(() => {
    setForm(props.editData);
  }, [props.editData]);

  console.log(form, " form is ed")
  const handleEdit = (id) => {
    console.log(form)
    fetch(`https://shy-puce-lobster-veil.cyclic.app/lists/edit-lists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => props.onHide());
  };
  const handleChange = ({ name, value }, id) => {
    setForm({...form, [name]: value});
  
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
          Todo List Details
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ height: "500px", overflow: "scroll" }}>
        <Card style={{ marginBottom: "20px", borderRadius: "20px" }}>
          <Card.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="formBasicName"
                style={{
                  justifyContent: "left",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    style={{
                      width: "100%",
                      margin: "auto",
                      padding: "auto",
                      fontSize: "30px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "100%",
                    margin: "auto",
                    marginTop: "20%",
                   
                  }}
                >
                  <Form.Label style={{ fontWeight: "bold" }}>Description</Form.Label>

                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={(e) => {
                      handleChange(e.target);
                    }}
                    style={{
                      width: "100%",

                      margin: "auto",
                      padding: "auto",
                      fontSize: "30px",
                    }}
                  />
                </div>
              </Form.Group>
            </Form>
            <hr />
            <Button
              variant="primary"

              onClick={()=>{
                handleEdit(form._id);
              
              }}
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
              Edit
            </Button>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default EditModel;
