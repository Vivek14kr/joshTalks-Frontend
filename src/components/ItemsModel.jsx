import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

import Alert from "react-bootstrap/Alert";
import { loadData } from "./localStorage";

function ItemsModel(props) {

  const [alert, setAlert] = useState(false);

  let token = loadData("token")
  let [listid, setlistid] = useState("");
  let [form, setForm] = useState([]);
  let [data, setData] = useState([]);
  
  let [functionend, setFunctionEnd] = useState(false)
  let [btnTracker, setbtnTracker] = useState(false);

 

  useEffect(() => {
    const newid = props.selectedDataId;
    

    setlistid(newid._id);
  }, [props.selectedDataId]);

 


  useEffect(() => {
    async function fetchBooks() {
      await fetch(
        `https://shy-puce-lobster-veil.cyclic.app/items/get-items/${listid}`,
        {
          method: "GET",
          headers: {
            Authorization: ` Bearer ${token}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => setData(res.reverse()));
    }
    if (listid) {
      fetchBooks();
    }
  }, [listid, functionend]);

  const handleAddItem = (e) => {
    e.preventDefault();

    fetch(
      `https://shy-puce-lobster-veil.cyclic.app/items/add-items/${listid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFunctionEnd(!functionend);
      });
  };

    const handleNewChange = ({ name, value }) => {
      setForm({
        ...form,
        [name]: value,
      });
    };
      const handleEdit = (item) => {
        fetch(
          `https://shy-puce-lobster-veil.cyclic.app/items/edit-items/${item._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(item),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            setFunctionEnd(!functionend);
            setAlert(true);
            setTimeout(() => {
              setAlert(false);
            }, 1500);
          });

        // console.log(data, " data")
        // console.log(id, " chekcing id ")
      };


  const handleChange = ({ name, value }, id) => {
    setData((prev) => {
      const updatedForm = prev.map((item) => {
        if (item._id === id) {

          if (name === "isComplete"){
            return { ...item, [name]: !item.isComplete };
          }
          return { ...item, [name]: value };
        }
        return item;
      });
      return updatedForm;
    });
    
  };


  const handleDelete = (id) =>{
     fetch(
       `https://shy-puce-lobster-veil.cyclic.app/items/delete-items/${id}`,
       {
         method: "DELETE",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       }
     )
       .then((res) => res.json())
       .then((data) => {
         console.log(data);
         setFunctionEnd(!functionend);
       });
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="special_modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Todo Items</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ height: "500px", overflow: "scroll" }}>
        <div>
          <div style={{}}>
            {!btnTracker ? (
              <Button
                onClick={() => setbtnTracker(true)}
                style={{ margin: "auto", marginBottom: "5%" }}
              >
                Add Items
              </Button>
            ) : (
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Task Name</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      handleNewChange(e.target);
                    }}
                    name="name"
                    type="text"
                    placeholder="Enter Task Name"
                  />
                </Form.Group>
                <Button
                  onClick={handleAddItem}
                  style={{ margin: "auto", marginBottom: "5%" }}
                >
                  {" "}
                  Add{" "}
                </Button>
                <Button
                  onClick={() => setbtnTracker(false)}
                  style={{
                    margin: "auto",
                    marginBottom: "5%",
                    marginLeft: "2%",
                  }}
                >
                  {" "}
                  Cancel{" "}
                </Button>
              </Form>
            )}
          </div>
          {alert ? (
            <Alert
              key={"primary"}
              variant={"primary"}
         
            >
              Todo Updated
            </Alert>
          ) : (
            ""
          )}
          {data.length > 0
            ? data.map((item) => (
                <Card
                  style={{ marginBottom: "20px", borderRadius: "20px" }}
                  key={item.id}
                >
                  <Card.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicName"
                        style={{
                          display: "flex",

                          justifyContent: "left",
                        }}
                      >
                        <div>
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="isComplete"
                            checked={item.isComplete ? true : false}
                            onChange={(e) => {
                              handleChange(e.target, item._id);
                            }}
                            style={{
                              height: "50px",
                              width: "50px",
                              float: "left",
                              alignContent: "left",
                              justifyContent: "left",
                              alignItems: "left",
                            }}
                            id="checkbox-3"
                          />
                        </div>
                        <div
                          style={{
                            width: "100%",
                            margin: "auto",
                            justifyContent: "center",
                            textAlign: "center",
                          }}
                        >
                          <input
                            type="text"
                            readOnly={item.isComplete ? true : false}
                            name="name"
                            value={item.name}
                            onChange={(e) => {
                              handleChange(e.target, item._id);
                            }}
                            style={
                              item.isComplete
                                ? {
                                    textDecoration: "line-through",

                                    margin: "auto",
                                    padding: "auto",
                                    fontSize: "30px",
                                    width: "90%",
                                  }
                                : {
                                    margin: "auto",
                                    padding: "auto",
                                    fontSize: "30px",
                                    width: "90%",
                                  }
                            }
                          />
                        </div>
                      </Form.Group>
                    </Form>
                    <hr />
                    <Button
                      variant="primary"
                      style={{
                        margin: "auto",
                        justifyContent: "center",
                        backgroundColor: "black",
                        color: "white",
                      }}
                      onClick={() => {
                        handleEdit(item);
                      }}
                    >
                      Update Todo
                    </Button>
                    <Button
                      variant="primary"
                      style={{
                        margin: "auto",
                        justifyContent: "center",
                        marginLeft: "10px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))
            : ""}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ItemsModel;
