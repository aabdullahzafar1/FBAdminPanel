import React, { useEffect, useState } from 'react';
import {Card,Icon,Image, Button} from 'semantic-ui-react'
import './Pages.css';
import firebase from "firebase/app";
import "firebase/firestore";
import Drawer from 'react-drag-drawer'


import * as FaIcons from 'react-icons/fa';
import { firestore } from 'firebase-admin';

function RestaurantLive() {
const [listings,setListings] = useState([])
const [searchText,setSearchText] = useState('')
const[open,setOpen] = useState(false)
const [streamLink, setStreamLink] = useState()
const [currId,setCurrId] = useState()



  async function loadData() {
    const postRef = await firebase.firestore().collection("users").where("isRestaurant","==",true).get()
    setListings(postRef.docs.map((doc)=>({id: doc.id, data: doc.data()})))
    let data =[]
    
    if(searchText!==null || searchText!==""){
    postRef.forEach(doc => {
          if(String(doc.data().name).toLowerCase().startsWith(String(searchText).toLowerCase())){
            data.push({id: doc.id, data: doc.data()})
          }
        })
    setListings(data)
    return
  }
  }

  function handleChange(e) {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users').onSnapshot(snapshot => {
        if (snapshot.size) {
          loadData();
        }
      })
  return () => {
      unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebase,searchText])

function toggle(id) {
  setCurrId(id)
    setOpen(!open)
}

function manageStream() {
   firebase.firestore().collection('users').doc(currId).update({
     initalHtml: streamLink
   })
   toggle()
   setStreamLink('')
}
  

  //CardInfo Variable with Array of Objects
  const renderCard =(card,index) =>{
    return (
      <div style={{marginLeft:30,padding: 20, borderRadius: 20, borderColor: "red"}}>
              <Drawer className="Drawer"
              open={open}
              onRequestClose={toggle}
            >
              <div className="Dtext2">Enter the Link in the textbox</div>
              <div className="DtextB">
              <textarea className="DtextBi"
                type="textarea"
                name="textValue"
                
                onChange={text => {setStreamLink(text.target.value)}}
                defaultValue={card.data.initalHtml}
                placeholder="Enter Restaurant Stream Link"
                
              />
              <p>
                <strong></strong>
              </p>
            </div>
            <div className='ui two buttons'>
              
                  <Button basic color='green' className="GD" onClick = {()=>manageStream()}>
                    Enter
                  </Button>
                  <Button basic color='green' className="GD1" onClick = {()=>toggle()}>
                  Close
                </Button>
                  </div>
            </Drawer>
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
      
          <Button basic color='green' className="GD" onClick = {()=>toggle(card.id)}>
            Edit
          </Button>
          
          </div>
          


    
  
    </Card.Content>
  </Card>
  
  </div>

    )
  }
  return (
    <React.Fragment>
    <input className="search1" onChange={handleChange} ></input>
    <label className="SB" htmlFor="Search">Search by Name:</label>
    <div className="reports" >
      
      
      {listings.map(renderCard)}
      </div>
    </React.Fragment>
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

export default RestaurantLive;
