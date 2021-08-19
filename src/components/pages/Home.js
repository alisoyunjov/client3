import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Hero from './Hero';
import Card from './Card';
import authService from '../../services/authService';
import {Link} from 'react-router-dom';
import './Home.css';

function Home() {
  const currentUser = authService.getCurrentUser();
  return (
    <div style={{scrollBehavior:"smooth"}}>
      <div className="home-container">
        <Container id="container">
          <Row>
            <Col sm={12} md={6} id="heroCol">
              <h1 style={{fontFamily: 'Ubuntu, sans-serif'}}>Our Company</h1>
              <h4 style={{fontFamily: 'Ubuntu, sans-serif', color: 'GrayText'}}>Decode Cure Limited is a fast-growing biotechnology company based in Hong Kong Science and Technology Parks. Our mission is to reduce mortality rate and medical expenses caused by complex diseases utilizing our rapid detection solution.</h4>
              {currentUser ? (
                <a href="#discover" id="getStarted">
                  <button id="getStartedBtn" >Get Started</button>
                </a>) : 
                (<Link to="/Signup">
                  <button id="getStartedBtn">Get Started</button>
                </Link>
              )}
            </Col>
            <Col sm={12} md={6}>
              <Hero />
            </Col>
          </Row>
        </Container>
      </div>  
    </div>
  );
}
export default Home;