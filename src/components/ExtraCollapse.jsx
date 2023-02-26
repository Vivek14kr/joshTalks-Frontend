import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


const ExtraCollapsible = ({ item }) => {

  return (
    <div
      style={{
        width: "fit-content",
        margin: "auto",
        marginTop: "0px",
        marginBottom: "50px",

        paddingBottom: "0px",

        justifyContent: "center",
        alignContent: "center",
        textAlign: "center",
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

    
    </div>
  );
};
export default ExtraCollapsible;
