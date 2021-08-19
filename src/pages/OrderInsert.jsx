import React, { useState, useRef,useEffect  } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '../styles.scss';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';
import vendorApi from '../components/api/vendorApi';
import authHeader from '../services/auth-header';
import { API_URL } from './url';
const user = JSON.parse(localStorage.getItem('user'));
const listOfItems = Array.from(Array(1000).keys());
// window.alert(user.role)
const File = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [vendorList, setVendorList] = useState([]);
  const [state, setState] = useState({
    fileCollection: '',
    milestone: '',
    orderMadeBy: '',
    daysSinceRequest: "",
    vendor1: "",
    vendor2: "",
    category: "",
    catalog1: "",
    catalog2: "",
    date: "",
    notes:"",
    msdFile:false, 
    price1: "",
    price2: "",
    submission: "",
    receivedDate: "",
    dateR: '',
    orderStatus: false,
    description: "",
    requestDay: "",
    numberOfItems:1,
    vendors:[]
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [filesList, setFilesList] = useState([]);




  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get('http://localhost:8082/api/vendors/allVendors');
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
      const { milestone, numberOfItems, fileCollection, orderStatus, receivedDate, dateR, price1, daysSinceRequest, price2, requestDay, submission, vendor1, vendor2, category, catalog1, catalog2, date, description,notes, msdFile} = state;
            
            const formData = new FormData();
            for (const key of Object.keys(fileCollection)) {
              formData.append('fileCollection', fileCollection[key])
            }
            var msdFileUI = 'No';
            var numberOfFiles = fileCollection.length;
            if (msdFile === true){
              msdFileUI = 'Yes';
            } 
            var statusUI = 'Not Finished'; 
            if (orderStatus === true){
              statusUI = 'Finished';
            } 
            formData.append('vendor1', vendor1);
            formData.append('vendor2', vendor2);
            formData.append('catalog1', catalog1 );
            formData.append('catalog2', catalog2);
            formData.append('category', category);
            formData.append('date', date);
            formData.append('requestDay', requestDay);
            formData.append('description', description);
            formData.append('notes', notes);
            formData.append('orderMadeBy', user.name);
            formData.append('msdFile', msdFile);
            formData.append('price1', price1);
            formData.append('submission', submission);
            formData.append('price2', price2);
            formData.append('receivedDate', receivedDate);
            formData.append('dateR', dateR);
            formData.append('orderStatus', orderStatus);
            formData.append('daysSinceRequest', daysSinceRequest);
            formData.append('numberOfItems', numberOfItems);
            formData.append('msdFileUI', msdFileUI);
            formData.append('numberOfFiles', numberOfFiles);
            formData.append('milestone', milestone);
            formData.append('statusUI', statusUI);
            setErrorMsg('');  
            await axios.post(`${API_URL}/upload`, formData,
            {headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': user.token
            }}).then(res => {
              console.log(res.data)
            });
            window.alert('Order created successfullly');
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
            <h1>Make Order</h1>
              <Form onSubmit={handleOnSubmit}>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                  <Form.Row>
                  <Form.Group as={Col} controlId="formGridBreed">
                    <Form.Label>Vendor1</Form.Label>
                    <Form.Control
                      as="select"
                      value={state.vendor1}
                      name = "vendor1"
                      onChange={handleChange}
                    >
                      <option>Choose Vendor</option>
                      {vendorList.map((vendor) =>(
                        <option>{vendor.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridBreed">
                    <Form.Label>Vendor2</Form.Label>
                    <Form.Control
                      as="select"
                      value={state.vendor2}
                      name = "vendor2"
                      onChange={handleChange}
                    >
                      <option>Choose Vendor</option>
                      {vendorList.map((vendor) =>(
                        <option>{vendor.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Group as={Col} controlId="formGridBreed">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={state.category}
                      name = "category"
                      onChange={handleChange}
                    >
                      <option>Choose category</option>
                      <option>Consumable, reagent</option>
                      <option>Equipment</option>
                      <option>Bengal</option>
                      <option>Birman</option>
                    </Form.Control>
                  </Form.Group>
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

                <Form.Group>
                  <Form.Label>Needed By</Form.Label>
                  <Form.Control
                    type="date"
                    name = "date"
                    value={state.date}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Row>

                <Form.Group style = {{margin: 'auto', marginBottom: '20px'}}>
                  <Form.Label>Is File Needed</Form.Label>
                  <Form.Check 
                      type="switch"
                      id="custom-switch"
                      name ="msdFile"
                      onChange ={handleCheckBox }
                  />
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default File;