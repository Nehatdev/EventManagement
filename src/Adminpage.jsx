import { Link, Outlet,useNavigate } from 'react-router-dom'
import './App.css'

const Adminpage = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
   <div>
      <div className='nav'>
        <div className='head'>
          <h1>Event </h1>
        </div>
        <div className='list'>
          <Link to='/adminpage/eventhandle'>Events</Link>
          <Link to='/adminpage/Customer'>Customers</Link>
          <Link to='/'><button className='btn' onClick={handleClick}>Logout</button></Link>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Adminpage;
