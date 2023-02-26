import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ItemsModel from "./ItemsModel";
import EditModel from "./EditModel";
import { loadData } from "./localStorage";

const Collapsible = ({ item, hideButton }) => {
 const [details, setDetails] = useState("");
   const [modalShow, setModalShow] = useState(false);

   let token = loadData("token")
const [editShow, seteditShow] = useState(false)
const [editDetails, setEditDetails] = useState("")



const handleDelete = (id)=>{

   fetch(`https://shy-puce-lobster-veil.cyclic.app/lists/delete-lists/${id}`, {
     method: "DELETE",
     headers: {
       Authorization: `Bearer ${token}`,
     },
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data);
       hideButton();
     });
}
 return (
   <div
     style={{
       width: "fit-content",
       margin: "auto",
       marginTop: "0px",
       marginBottom: "0px",

       paddingBottom: "0px",

       justifyContent: "center",
       alignContent: "center",
       textAlign: "left",
       alignItems: "center",
     }}
   >
     <Card
       style={{
         border: "20px solid white",
         width: "18rem",
         backgroundColor: "black",
         color: "white",
         marginBottom: "0px",
         borderRadius: "30px",
         padding: "50px",
        
       }}
     >
       <h2>{item.name}</h2>
       <hr />
       <p>{item.description}</p>
     </Card>

     <div
       style={{
         width: "fit-content",
         margin: "auto",

         justifyContent: "center",
       }}
     >
       {item && (
         <Card.Body style={{marginTop:"2%"}}>
           <Button
             style={{
               width: "fit-content",
               backgroundColor: "black",
               color: "white",
             }}
             onClick={() => {
               setEditDetails(item);
               seteditShow(true);
             }}
             variant="primary"
           >
             Edit
           </Button>
           <Button
             style={{
               width: "fit-content",
               backgroundColor: "black",
               color: "white",
               marginLeft: "10px",
               marginRight: "10px",
             }}
             onClick={() => {
               setDetails(item);
               setModalShow(true);
             }}
             variant="primary"
           >
             See Items
           </Button>
           <Button
             style={{
               width: "fit-content",
               backgroundColor: "black",
               color: "white",
             }}
             onClick={() => {
               handleDelete(item._id)
            
             }}
             variant="primary"
           >
             Delete
           </Button>
         </Card.Body>
       )}
       <ItemsModel
         show={modalShow}
         onHide={() => setModalShow(false)}
         selectedDataId={details}
        
       />
       <EditModel show={editShow} onHide={() => {
        seteditShow(false)

       hideButton()
      }} 
       editData={editDetails}

      

       />
     </div>
   </div>
 );
};
export default Collapsible;
