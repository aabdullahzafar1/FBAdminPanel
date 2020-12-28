import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    
      title: 'Analytics Dashboard',
      path: '/SalesR',
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
    icon: <FaIcons.FaEraser />,
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
  {
    title: 'Manage Livestream',
    path: '/RestaurantLive',
    icon: <AiIcons.AiTwotoneVideoCamera />,
    cName: 'nav-text'
  },

 
  
];
