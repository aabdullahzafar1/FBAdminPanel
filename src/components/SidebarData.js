import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    
      title: 'Dashboard',
      path: '/Sales',
      icon: <FaIcons.FaCartPlus />,
      cName: 'nav-text'
    },
  {
    title: 'Register',
    path: '/RegisterNew',
    icon: <FaIcons.FaUserPlus />,
    cName: 'nav-text'
  },
  
  {
    title: 'Post Removal',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  
  {
    title: 'Account Removal',
    path: '/AccountR',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },

 
  
];
