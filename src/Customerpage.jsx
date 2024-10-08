import React from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import './App.css'

const Customerpage = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div>
       <div className='nav'>
         <div className='head'>
           <h1> Festy</h1>
         </div>
         <div className='list'>
           <Link to='/customerpage/eventform'>Create</Link>
           <Link to='/customerpage/events'>Events</Link>
           <Link to='/customerpage/profile'>Profile</Link>
           <Link to='/'><button className='blogbtn' onClick={handleClick}>Logout</button></Link>
         </div>
       </div>
       <Outlet/>
     </div>
   );
 };
export default Customerpage;
