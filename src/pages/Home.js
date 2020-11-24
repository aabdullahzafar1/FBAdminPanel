import * as IoIcons from 'react-icons/io';
import React from 'react';
import './Restaurant.css';



function Home() {
  return (
    <>
    <div className='Container'>
    
    <h1> 
    <IoIcons.IoMdPeople/> 
    Restaurant Details
    </h1>
    <div className='wrapper'>
    <div className='Card'>
    <h2 className='TO'>
    
  
  
    Total Order Today: 324
    
    </h2>
    <h2 className='TS'>
    
    Restaurant Total Sales: PKR 23342
    </h2>

    </div>
    </div>
    <text>Hello</text>
    
    </div>
    
    
    <div className='home'>
      <h1>Dashboard</h1>
    </div>
    </>
    
  );

}

export default Home;
