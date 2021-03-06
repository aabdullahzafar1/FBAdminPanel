import React, { useEffect, useState } from 'react';
import {Card,Icon,Image, Button} from 'semantic-ui-react'
import './Pages.css';
import firebase from "firebase/app";
import "firebase/firestore";
import ReactPlayer from 'react-player'


import * as FaIcons from 'react-icons/fa';

function Home() {
  const [listings,setListings] = useState([])
const [searchText,setSearchText] = useState('')



  async function loadData() {
    console.log("Sexy")
    const postRef = await firebase.firestore().collection("posts").get()
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
  function removeProfle(id){
    firebase.firestore().collection('posts').doc(id).delete()
  }
  function handleChange(e) {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('posts').onSnapshot(snapshot => {
        if (snapshot.size) {
          loadData();
        }
      })
  return () => {
      unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebase,searchText])


  

  //CardInfo Variable with Array of Objects
  const renderCard =(card,index) =>{
    return (
      <div style={{marginLeft:30,padding: 20, borderRadius: 20, borderColor: "red"}}>
      <Card className="cardUI">
      {String(card.data.type).includes('video') &&<ReactPlayer 

      className='react-player'
      width='100%'
      height='100%'
      url={card.data.images} />}
      {String(card.data.type).includes('image') &&<Image className="img1" src={card.data.images} />}
      {card.data.isCheckIn &&<Image className="img1" src='https://www.maketecheasier.com/assets/uploads/2017/07/google-maps-alternatives-featured.jpg' />}
    <Card.Content>
      <Card.Header className="title1">{card.data.name}</Card.Header>
      <Card.Meta>
        <span className='date'>{card.data.email}</span>
      </Card.Meta>
      <Card.Description className="CardDesc">
        {card.data.contact}
      </Card.Description>
      
      <div className='ui two buttons'>
      
          <Button basic color='green' className="GD" onClick = {()=>removeProfle(card.id)}>
            Delete
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

export default Home;