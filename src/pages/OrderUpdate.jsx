
import api from '../components/api/index';
import React, { useState, useRef,useEffect  } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '../styles.scss';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';
import vendorApi from '../components/api/vendorApi';
import authHeader from '../services/auth-header';
import styled from 'styled-components'
import { API_URL } from './url';

const user = JSON.parse(localStorage.getItem('user'));
const listOfItems = Array.from(Array(10).keys());
const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
const File = (props) => {
  const [currentOrder, setCurrentOrder] = useState([]);
  const [state, setState] = useState({
    id: props.match.params.id,
    notes:'',
    price1: "",
    price2: "",
    submission: "",
    receivedDate: "",
    fileCollection: '',
    milestone: '',
    orderStatus: false,
    errors:{}
  });
  
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };
  const handleValidation = async =>{
    const {id, milestone, fileCollection, orderStatus, receivedDate, price1, price2, submission, notes} = state
    let errors = {};
    let formIsValid = true;

    if (orderStatus){
      if (submission == '' || milestone == ''){
        if (
          window.confirm(
              `You did not instert Submission and Milestone numbers. Do you still want to proceed?`,
          )
        ){
           
            
        }
        else{
          formIsValid = false;
          errors["orderStatus"] = "Enter Submission and Milestone";
        }
        
      }
    }

    if (submission == '' && milestone != ''){
      formIsValid = false;
      errors["submission"] = "Submission cannot be empty when Milestone is selected";
     
    }

    if (submission != '' && milestone == ''){
      formIsValid = false;
      errors["milestone"] = "Milestone cannot be empty when Submission is selected";
    }
    if (price1 != ''){
      if (!price1.match(/^\d+$/) ){
        formIsValid = false;
        errors["price1"] = "Price1 should be integer";
      }
    }

    
    if (price2 != ''){
      if (!price2.match(/^\d+$/) ){
        formIsValid = false;
        errors["price2"] = "Price2 should be integer";
      }
    }
    setState({
      ...state,
      errors: errors
    });
    return formIsValid;

  }
  const handleCheckBox = async event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  }
  const onFileChange = (e) => {
    setState({ 
      ...state,
      fileCollection: e.target.files 
    })
  }
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()){
     
   

    try {
      const {id, milestone, fileCollection, orderStatus, receivedDate, price1, price2, submission, notes} = state
     
      const formData = new FormData();
      if (fileCollection.length > 0){
        for (const key of Object.keys(fileCollection)) {
          formData.append('fileCollection', fileCollection[key])
        }
        var numberOfFiles = fileCollection.length;
        formData.append('numberOfFiles', numberOfFiles);
      }
      
     
      
      var statusUI = 'Not Finished'; 
      if (orderStatus === true){
        statusUI = 'Finished';
      }
      formData.append('price1', price1);
      formData.append('submission', submission);
      formData.append('price2', price2);
      formData.append('notes', notes);
      formData.append('receivedDate', receivedDate);
      formData.append('orderStatus', orderStatus);
      formData.append('milestone', milestone);
      formData.append('statusUI', statusUI);
      setErrorMsg('');  
      await axios.put(`${API_URL}/update/${id}`, formData,
      {headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': user.token
      }}).then(res => {
        console.log(res.data)
      });
      window.alert('Order updated successfullly');
      props.history.push('/ordersList');

    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  }else{
    alert("Form has errors.")
 }
  };
  return (
    <>
    <br />
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2}}>
          <Jumbotron>
          <h1>Update Order</h1>
            <Form onSubmit={handleOnSubmit} >
              <Form.Row>
              <Form.Group style = {{marginLeft: '50px'}}>
                <Form.Label>
                  Price 1
                </Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="1"
                    name = "price1"
                    value = {state.price1}
                    onChange = {handleChange} 

                />
                <span style={{color: "red"}}>{state.errors["price1"]}</span>
              </Form.Group>
              <Form.Group style = {{marginLeft: '20px'} }>
                <Form.Label>
                    Price 2
                </Form.Label>
                <Form.Control 
                
                    as="textarea" 
                    rows="1"
                    name = "price2"
                    value = {state.price2}
                    onChange = {handleChange} 
                />
                <span style={{color: "red"}}>{state.errors["price2"]}</span>
              </Form.Group>
              <Form.Group style = {{marginLeft: '20px'}}>
                <Form.Label>
                    Submission
                </Form.Label>
                <Form.Control 
                    as="select" 
                    name = "submission"
                    value = {state.submission}
                    onChange = {handleChange} 
                    defaultValue= {1}
                    >
                    <option></option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    </Form.Control>
                    <span style={{color: "red"}}>{state.errors["submission"]}</span>


              </Form.Group>
              </Form.Row>

              <Form.Row>
              <Form.Group style = {{marginLeft: '50px'}}>
                    <Form.Label>Milestone</Form.Label>
                    <Form.Control
            
                      as="select"
                      value={state.milestone}
                      name = "milestone"
                      onChange={handleChange}
                    >
                        <option></option>
                        {listOfItems.map(x=>
                          <option>{x+1}</option>
                        )}
                    </Form.Control>
                    <span style={{color: "red"}}>{state.errors["milestone"]}</span>
                </Form.Group>
              <Form.Group style = {{marginLeft: '120px'}}>
                <Form.Label>Received Date</Form.Label>
                <Form.Control
                  type="date"
                  name = "receivedDate"
                  value={state.receivedDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group style = {{marginLeft: '50px'}}>
                  <Form.Label>Is Order Finished</Form.Label>
                  <Form.Check 
                      type="switch"
                      id="custom-switch"
                      name ="orderStatus"
                      onChange ={handleCheckBox }
                  />
                  <span style={{color: "red"}}>{state.errors["orderStatus"]}</span>
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>
                  Notes
                </Form.Label>
                <Form.Control as="textarea" rows="3" 
                    name = "notes"
                    value = {state.notes}
                    onChange = {handleChange} 
                />
              </Form.Group>
              <div className="form-group">
                    <input type="file" name="fileCollection" onChange={onFileChange} multiple />
                </div>
              <Button variant="primary" type="submit" >
                Update
              </Button>

              <CancelButton href={'/ordersList'} style = {{marginLeft: '50px'}}>Back</CancelButton>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
    
        
  </>
  );
};

export default File;