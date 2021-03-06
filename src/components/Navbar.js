import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import AuthContext from './context';


function Navbar() {
  const [sidebar, setSidebar] = useState(true);
  const authContext = React.useContext(AuthContext)

  const showSidebar = () => setSidebar(sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
  
        <div className='navbar' >
        <h1 style ={{zIndex: 1000,color: 'white', flex:1}}>Foodbeast Admin</h1> 
      <button onClick = {()=> {authContext.setUser(false)}} className= "LogB" >Logout</button>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;