import React, { useEffect, useState } from 'react';
import {Card,Icon, Image, Button} from 'semantic-ui-react'
import './Pages.css';
import firebase from "firebase/app";
import "firebase/firestore";

function Reports() {

  async function loadData(){
    const postRef = await firebase.firestore().collection('users').where("isRestaurant","==",true).get()
    setCardInfo(postRef.docs.map((doc)=>({id:doc.id,data:doc.data()})))

  }

  function approveRestaurant(id){
    firebase.firestore().collection('users').doc(id).update({isApproved: true})
  }

  useEffect(()=>{
   loadData()
  },[])

const [CardInfo,setCardInfo] = useState([])
  

  //CardInfo Variable with Array of Objects
  const renderCard =(card,index) =>{
    return (
      <div style={{padding: 20, borderRadius: 20, borderColor: "red"}}>
      <Card className="cardUI">
    <Image className="img1" src={card.data.image} />
    <Card.Content>
      <Card.Header className="title1">{card.data.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{card.data.email}</span>
      </Card.Meta>
      <Card.Description className="CardDesc">
        {card.data.contact}
      </Card.Description>
      
      <div className='ui two buttons'>
      
          <Button basic color='green' className="GD3" onClick = {()=>approveRestaurant(card.id)}>
            Approve
          </Button>
          
          <Button className="button3" basic color='red'>
            Decline
          </Button>
          </div>
    </Card.Content>
  </Card>
  </div>

    )
  }
  return (
    <div className="reports" >
    {CardInfo.map(renderCard)}
    </div>
  );
}
const styles = {
  container: {
    flex: 1,
    flexGrow: 1,
    position: "absolute",
    left: 300,
    backgroundColor: "red",

  }
}

export default Reports;
