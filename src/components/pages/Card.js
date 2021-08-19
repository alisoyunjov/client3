import React from 'react';
import { Link } from 'react-router-dom';
import "./Card.css";

function Card(props) {
  return (
    <>
      <li className='cardItem'>
        <Link className='cardLink' to={props.path}>
          <figure className='cardPic' data-category={props.label}>
            <img
              className='cardImg'
              alt='Event type'
              src={props.src}
            />
          </figure>
        </Link>
      </li>
    </>
  );
}

export default Card;