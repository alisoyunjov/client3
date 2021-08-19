import React, { useState, useRef,useEffect  } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '../styles.scss';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';
import vendorApi from '../components/api/vendorApi';
import authHeader from '../services/auth-header';
import { API_URL } from './url';
import styled from 'styled-components'
const user = JSON.parse(localStorage.getItem('user'));
const listOfItems = Array.from(Array(1000).keys());
const CancelButton = styled.a.attrs({
  className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`
// window.alert(user.role)
const File = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [vendorList, setVendorList] = useState([]);
  const [state, setState] = useState({
    id: props.match.params.id,
    fileCollection: '',
    catalog1: "",
    catalog2: "",
    notes:"",
    description: "",
    numberOfItems:"",
    vendors:[]
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [filesList, setFilesList] = useState([]);




  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get('http://18.167.118.133:8082/api/vendors/allVendors');
        setErrorMsg('');
        setVendorList(data.data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };
  const onFileChange = (e) => {
    setState({ 
      ...state,
      fileCollection: e.target.files 
    })
  }
  const handleCheckBox = async event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  }


  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { id, numberOfItems, fileCollection, catalog1, catalog2, description,notes} = state;
            const formData = new FormData();
            if (fileCollection.length > 0){
              for (const key of Object.keys(fileCollection)) {
                formData.append('fileCollection', fileCollection[key])
              }
              var numberOfFiles = fileCollection.length;
              formData.append('numberOfFiles', numberOfFiles);
            }
            
            formData.append('catalog1', catalog1 );
            formData.append('catalog2', catalog2);
            formData.append('description', description);
            formData.append('notes', notes);
            formData.append('numberOfItems', numberOfItems);
        
            setErrorMsg('');  
            await axios.put(`${API_URL}/addFile/${id}`, formData,
            {headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': user.token
            }}).then(res => {
              console.log(res.data)
            });
            window.alert('Order updated successfullly');
            props.history.push('/viewOrders');

        
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
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
              <Form onSubmit={handleOnSubmit}>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                <Form.Group>
                  <Form.Label>
                    Catalog 1
                  </Form.Label>
                  <Form.Control 
                      as="textarea" 
                      rows="1"
                      name = "catalog1"
                      value = {state.catalog1}
                      onChange = {handleChange} 

                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                      Catalog 2
                  </Form.Label>
                  <Form.Control 
                      as="textarea" 
                      rows="1"
                      name = "catalog2"
                      value = {state.catalog2}
                      onChange = {handleChange} 
                  />
                </Form.Group>
                <Form.Row>
                <Form.Group >
                    <Form.Label>Number of Items</Form.Label>
                    <Form.Control
            
                      as="select"
                      value={state.numberOfItems}
                      name = "numberOfItems"
                      onChange={handleChange}
                    >
                        <option>Select</option>
                        {listOfItems.map(x=>
                          <option>{x+1}</option>
                        )}
                    </Form.Control>
                </Form.Group>
                <Form.Group style = {{marginLeft: '10px', width: '78%'}}>
                  <Form.Label  >
                      Item Description
                  </Form.Label>
                  <Form.Control 
                      
                      as="textarea" 
                      rows="1"
                      name = "description"
                      value = {state.description}
                      onChange = {handleChange} 
                  />
                </Form.Group>
                </Form.Row>


                <Form.Row>

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
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <CancelButton href={'/viewOrders'} style = {{marginLeft: '50px'}}>Back</CancelButton>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default File;
