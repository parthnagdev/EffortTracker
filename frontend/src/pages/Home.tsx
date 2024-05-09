import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Image } from 'primereact/image';
//import myImage from '../assets/images/efforttrackerhome.jpg';
import myImage from '../assets/images/efforttrackerhome.png'; // Import the image



const Home = () => {
  return (
    <div>
      {/* <p id="message">
        Squad Master allows you to manage your employees in a easy way. You have complete control over the details of the registered employees. Manage the roles,salary grades and departments of your employees without hassle in simple clicks.
      </p> */}
      <div className="intro-header" style={{ position: 'relative' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Image src={myImage} alt="Effort Tracker Home" className="image" width="600"   />
            <div className="text" style={{ position: 'absolute', top: '60px', right: '500px' }}>
                <div className="row">
                    <div className="col-lg-12">
                    <div className="intro-message" style={{ position: 'relative' }}>
                        <h1 style={{ 
                            textAlign: 'center', 
                            fontSize: '4em', 
                            // color: 'blue', 
                            // fontFamily: 'Quicksand' 
                        }}>Effort Tracker
                        </h1>
                        <h3 style={{ 
                            textAlign: 'center', 
                            fontSize: '1.5em', 
                            // color: 'red', 
                            fontFamily: 'Verdana' 
                        }}>Manage your tasks in the most efficient way
                        </h3>
                        <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <br />
                        <br />
                        {/* <Button variant="primary" size="lg">
                            <Link to="/register" id="out" style={{ color: 'inherit', textDecoration: 'inherit'}}>New User? Let's Get Started!</Link>
                        </Button> */}
                        <Button variant="outline-info" size="lg">
                            <Link to="/register" id="out" style={{ color: 'inherit', textDecoration: 'inherit'}}>New User? Let's Get Started!</Link>
                        </Button>{' '}
                        <br />
                        <br />
                        <br />
                        {/* <Button variant="primary" size="lg">
                            <Link to="/login" id="out" style={{ color: 'inherit', textDecoration: 'inherit'}}>Existing User? Login Here!</Link>
                        </Button> */}
                        <Button variant="outline-secondary" size="lg">
                            <Link to="/login" id="out" style={{ color: 'inherit', textDecoration: 'inherit'}}>Existing User? Login Here!</Link>
                        </Button>{' '}
                        {/* <Link to="/login" id="in">Administrator Login</Link> */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;