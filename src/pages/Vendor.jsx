

import React, { Component } from 'react'
import AuthService from "../services/authService";
import api from '../components/api/vendorApi';
import userapi from '../components/api/userApi';
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { FormControl, TextField } from "@material-ui/core";
import { Container, Col, Row, Jumbotron, Form, Button } from "react-bootstrap";
import GetVendors from './GetVendors';

import styled from 'styled-components'
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin-left:200px;
    margin-top: 30px;
    width:600px;
    background-color: 'red';
`
const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;

`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
const categoryList = [
    "Consumable, reagent",
    "Equipment"
];

class DeleteOrder extends Component {
  deleteUser = event => {
      event.preventDefault()

      if (
          window.confirm(
              `Do tou want to delete this order permanently?`,
          )
      ) {
          api.deleteOrderById(this.props.id)
          
          window.location.reload()
      }
  }

  render() {
      return <Delete onClick={this.deleteUser}>
      <button className="btn" id="button" style = {{backgroundColor: '#fc036f'}}>Delete</button>
      </Delete>
  }
}


class VendorInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",

            currentUser: AuthService.getCurrentUser(),
            users: []
        }
    }
    componentDidMount = async () => {
      this.setState({ isLoading: true })

      await userapi.getAllUsers().then(users => {
          this.setState({
              users: users.data.data,
              isLoading: false,
          })
      })
  }

    
    handleChange = async e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleChangeDate = async e => {

      this.setState({[e.target.name]: e.target.value.substring(0,11)});
  }

    handleCheckBox = async e => {
      this.setState({ [e.target.name]: e.target.checked });
  }


   

    handleIncludeOrder = async () => {
        const {name, email} = this.state
        const payload = {name, email}
        
        
        await api.createVendor(payload).then(res => {
            window.alert('Vendor created successfully');
            this.setState({
                name: "",
                email: "",
            })
        })
    }

    render() {
        const {name, email} = this.state
      
        
        return (
        <>
        <br />
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2}}>
              <Jumbotron>
              <h1>Add Vendor</h1>
                <Form onSubmit={this.handleIncludeOrder}>
                  <Form.Group>
                    <Form.Label>
                      Name 
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="1"
                        name = "name"
                        value = {name}
                        onChange = {this.handleChange} 

                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                        Email 
                    </Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows="1"
                        name = "email"
                        value = {email}
                        onChange = {this.handleChange} 
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
        <GetVendors/>

        
      </>
            
        )
    }
}

export default VendorInsert