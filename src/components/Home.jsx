import React, { useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Collapsible from './Collapseble';
import "./Home.css"
import AddListModel from './AddListModel';
import ExtraCollapsible from './ExtraCollapse';
import { loadData } from './localStorage';


function Home() {

  let [addTodoShow, setAddTodoShow] = useState(false);
     const [widthTotal, setWidth] = useState(window.innerWidth);
  let [onHideButton, setOnHideButton] = useState(false);
let token = loadData("token")
 
  
let[extraData, setExtraData] = useState([])
    let [data, setData] = useState([]);

        useEffect(() => {
          const handleResize = () => setWidth(window.innerWidth);
          window.addEventListener("resize", handleResize);
          return () => {
            window.removeEventListener("resize", handleResize);
          };
        }, []);


    useEffect(()=>{
      fetchExtraData()
      
    },[])
    const fetchExtraData = () => {
       fetch("https://shy-puce-lobster-veil.cyclic.app/lists/all-lists", {
         method: "GET",
         headers: {
           Authorization: ` Bearer ${token}`,
         },
       })
         .then((res) => res.json())
         .then((dataa) => setExtraData(dataa.data));
        
    }
    
    useEffect(() => {
      fetchData();
    }, [addTodoShow, onHideButton]);
    
  const fetchData = () => {
    fetch("https://shy-puce-lobster-veil.cyclic.app/lists/get-user-lists", {
      method: "GET",
      headers: {
        Authorization: ` Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((dataa) => {
        console.log(dataa, " s fiuehsfijhweui j");
        setData(dataa);
      });
  };

   const TopDiv = {
     backgroundColor: "black",
     paddingTop: widthTotal > 500 ? "5%" : "20%",
   };
   
   const secondDiv = {
     width: "100%",
     margin: "auto",
     textAlign: "center",
     justifyContent: "center",
     alignContent: "center",
     alignItems: "center",
     marginTop: widthTotal > 500 ? "0%" : "15%",
   };
  
  return (
    <div style={TopDiv}>
      <Button
        variant="primary"
        style={{
          backgroundColor: "black",
          color: "white",
          float: "right",
          margin: "2%",
        }}
        onClick={() => setAddTodoShow(true)}
      >
        Add Todo
      </Button>
      <AddListModel show={addTodoShow} onHide={() => setAddTodoShow(false)} />
      <div
        style={secondDiv}
      >
        <h1
          style={{
            color: "white",
            paddingTop: "5%",
            borderBottom: "2px solid white",
            width: "fit-content",
            margin: "auto",
            textAlign: "left",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          Your Todo List
        </h1>
      </div>

      {data.length > 0 ? (
        <div style={{ paddingTop: "0px", paddingBottom: "0px"}}>
          <div className="notes">
            
            {data.map((item) => (
              <Collapsible
                item={item}
                hideButton={() => setOnHideButton(!onHideButton)}
              />
            ))}
            
          </div>
        </div>
      ) : (
        <div
          style={{
            margin: "auto",
            justifyContent: "center",
            alignContent: "center",
            padding: "5%",

            alignItems: "center",
          }}
        >
          <h3
            style={{
              
              backgroundColor: "white",
              borderRadius: "30px",
              color: "black",
              margin: "auto",
              justifyContent: "center",
              marginTop: "5%",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            No List Added! Add a new List
          </h3>
        </div>
      )}
      <div
        style={{
          width: "100%",
          margin: "auto",
          textAlign: "center",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "white",
            paddingTop: "5%",
            borderBottom: "2px solid white",
            width: "fit-content",
            margin: "auto",
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          People's Todo List
        </h1>
      </div>
      <div className="notes">
        {extraData.map((item) => (
          <ExtraCollapsible item={item} />
        ))}
      </div>
    </div>
  );
}

export default Home