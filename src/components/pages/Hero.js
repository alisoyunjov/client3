import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import api from '../api';

class Hero extends Component {
    constructor(props) {
        super(props)
        this.state = {
            events: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

    }

    render() {
        const { events, isLoading } = this.state
        const carousel = events.map(event => 
            <Carousel.Item>
                <Link to="/About">
                    <img
                    className="d-block"
                    style={{width: '100%', height: '300px'}}
                    src={event.img}
                    alt={event.eventName}
                    />
                    <Carousel.Caption>
                        <h3 style={{fontSize: '22px'}} className="caption">{event.eventName}</h3>
                        <p style={{fontSize: '15px'}} className="caption">{event.description}</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>);
        return (
            <Carousel style={{width: '100%'}}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2018/05/GettyImages-871326374.jpg"
                style={{ height: '400px' }}
                alt="First slide"
              />
  
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.newscientist.com/wp-content/uploads/2019/05/03155847/gettyimages-932737574-2.jpg"
                style={{ height: '400px' }}
                alt="Second slide"
              />
  
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://www.aim2019.org/system/files/2018-02/venue-sciencepark_2.jpg"
                style={{ height: '400px' }}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        );
    }
}

export default Hero;