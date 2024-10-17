import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Nav from './Nav';
import Home from './Home';
import Events from './Events';
import Login from './Login';
import Register from './Register';
import Adminpage from './Adminpage';
import Customerpage from './Customerpage';
import EventForm from './EventForm';
import Profile from './Profile';
import About from './About';
import Eventdetails from './Eventdetails';
import Booking from './Booking';
import EventHandle from './EventHandle';
import EventDelete from './EventDelete';
import Customer from './Customer';
import HEvents from './HEvents';

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Nav />}>
              <Route index element={<Home />} />
              <Route path='/homeevents' element={<HEvents />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
            </Route>
            <Route path='/adminpage' element={<Adminpage />}>
              <Route index element={<EventHandle />} />
              <Route path='eventhandle' element={<EventHandle />} />
              <Route path='eventdelete/:id' element={<EventDelete />} />
              <Route path='customer' element={<Customer />} />
            </Route>
            <Route path='/customerpage' element={<Customerpage />}>
              <Route index element={<Events />} />
              <Route path='eventform' element={<EventForm />} />
              <Route path='events' element={<Events />} />
              <Route path='eventdetails/:id' element={<Eventdetails />} />
              <Route path='eventdetails/booking/:id' element={<Booking />} />
              <Route path='profile' element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
export default App;
