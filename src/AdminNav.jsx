import { Link } from 'react-router-dom'
import './App.css'

const AdminNav = () => {
  return (
   <div>
      <div className='nav'>
        <div className='head'>
          <h1>Events</h1>
        </div>
        <div className='list'>
          <Link to=''>PropertyHandle</Link>
          <Link to=''>Customer</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
