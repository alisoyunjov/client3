import React, { useState, useRef,useEffect  } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import 'react-dropdown/style.css';
import "react-table-6/react-table.css" 
import { CSVLink, CSVDownload } from "react-csv";

import { Component } from 'react'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import api from '../components/api'
import dateFormat from 'dateformat';


import styled from 'styled-components'
import { BorderBottom } from '@material-ui/icons';
import download from 'downloadjs';
import axios from 'axios'; 
import { API_URL } from './url';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
    margin-top: 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
const Download = styled.div`
    color: #3f30cf;
    cursor: pointer;
`

class DownloadOrder extends Component {
  downloadOrder = async event => {
      event.preventDefault()

      if (
          window.confirm(
              `Do you want to download the order?`,
          )
      ) {
          if (this.props.numOfFiles == 1){
              const result =  await axios.get(`${API_URL}/downloadFiles/${this.props.id}`, {
                  responseType: 'blob'
              });
              const downloadName = `${Date.now()}.pdf`;
              download(result.data, downloadName, 'application/pdf');

          }
          else{
              const result =  await axios.get(`${API_URL}/download/${this.props.id}`, {
                  responseType: 'blob'
              });
              const downloadName = `${Date.now()}`;
              download(result.data, downloadName, 'application/octet-stream');
          }

      }
  }

  render() {
      if (this.props.numOfFiles == 0){        
          return <Delete >No File</Delete>
      }
      else{
          return <Download onClick={this.downloadOrder}>Download</Download>
      }
      
  }
}

class UpdateOrder extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/orders/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>
        <button className="btn" id="button" style = {{backgroundColor: '#a88532'}}>Update</button>
        </Update>
    }
}

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
const columns = [
  {
      Header: 'Price 1',
      accessor: 'price1',
      filterable: true,
      minWidth: 100,
  
  },
  {
      Header: 'Price 2',
      accessor: 'price2',
      filterable: true,
      minWidth: 100,
      

  },
  {
      Header: 'Milestone',
      accessor: 'milestone',
      filterable: true,
      minWidth: 120,
      
  },
  {
      Header: 'Submission',
      accessor: 'submission',
      filterable: true,
      minWidth: 120,
      
  },
  {
      Header: 'Ordered By',
      accessor: 'orderMadeBy',
      filterable: true,
      minWidth: 150,
  },
  {
      Header: 'Requested Date',
      accessor: 'requestDay',
      filterable: true,
      minWidth: 140,

  },
  {
      Header: 'Needed By',
      accessor: 'dateUI',
      filterable: true,
      minWidth: 140,

      
  },
  {
      Header: 'Vendor 1',
      accessor: 'vendor1',
      filterable: true,
      minWidth: 230,
  },

  {
      Header: 'Vendor 2',
      accessor: 'vendor2',
      filterable: true,
      minWidth: 230,
  },
  {
      Header: 'Category',
      accessor: 'category',
      filterable: true,
      minWidth: 150,
  },
  {
      Header: 'Catalog 1',
      accessor: 'catalog1',
      filterable: true,
      minWidth: 150,
  },
  {
      Header: 'Catalog 2',
      accessor: 'catalog2',
      filterable: true,
      minWidth: 150,
  },
  {
      Header: 'Item Amount',
      accessor: 'numberOfItems',
      filterable: true,
      minWidth: 120,
  },
  {
      Header: 'Item Description',
      accessor: 'description',
      filterable: true,
      minWidth: 200,
  },

  {
      Header: 'Notes',
      accessor: 'notes',
      filterable: true,
      minWidth: 250,
  },
  {
      Header: 'Status',
      accessor: 'statusUI',
      filterable: true,
      minWidth: 150,

  },
  {
      Header: 'Is File Needed',
      accessor: 'msdFileUI',
      filterable: true,
      minWidth: 150,
  },

  {
      Header: 'Files',
      accessor: '',
      Cell: function(props) {
          return (
              <span>
                 <DownloadOrder id={props.original._id} numOfFiles = {props.original.numberOfFiles}/>
              </span>
          )
      },
  },

]

class Submission1s extends Component {
    constructor(props) {
        super(props)
        this.download = this.download.bind(this);
        this.reactTable = React.createRef();
        this.state = {
            orders: [],
            columns: [],
            isLoading: false,
            dataToDownload: []
        }
        
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getSubmissions1(this.props.id).then(orders => {
            this.setState({
                orders: orders.data.data,
                isLoading: false,
            })
        })
    }
    getTrProps = (state, rowInfo, colInfo, instance) => {
          return {
            style: {
              background: '#e1eef2'
            }
          }
      }
      download = async (event) => {
        const currentRecords = this.reactTable.getResolvedState().sortedData;
        var data_to_download = []
        for (var index = 0; index < currentRecords.length; index++) {
           let record_to_download = {}
           for(var colIndex = 0; colIndex < columns.length-1 ; colIndex ++) {
                record_to_download[columns[colIndex].Header] = currentRecords[index][columns[colIndex].accessor]
           }
           data_to_download.push(record_to_download)
        }
        this.setState({ dataToDownload: data_to_download }, () => {
           this.csvLink.link.click()
        })
      }
      filterCaseInsensitive(filter, row) {
        const id = filter.pivotId || filter.id;
       
        if (row[id] != undefined || row[id] ===''){
            if (Number.isInteger(row[id])){
                const item = row[id].toString();
                return String(item.toLowerCase()).startsWith(filter.value.toLowerCase());
            }
            return String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase());
        }
        else{
            return true;
        }

        
    } 
    render() {
        const { orders, isLoading } = this.state
        const onChangeFct = () => console.log("onChange usually handled by redux");
        

        let showTable = true
        if (!orders.length) {
            showTable = false
        }

        return (
          <div>
          <div>
              <Wrapper>
              <button onClick={this.download} style= {{marginBottom: '10px'}}>
                 Export CSV File
             </button>
                  { showTable && (
                      <ReactTable
                          ref={(r) => this.reactTable = r}
                          data={orders}
                          columns={columns}
                          loading={isLoading}
                          defaultPageSize={25}
                          showPageSizeOptions={true}
                          minRows={0}
                          getTrProps={this.getTrProps}
                          filterable
                          defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row) }
                      />
                  )}
              </Wrapper>
          </div>
          <div>
             <CSVLink
                 data={this.state.dataToDownload}
                 filename="data.csv"
                 className="hidden"
                 ref={(r) => this.csvLink = r}
                 target="_blank"/>

          </div>
          </div>
        )
    }
}
class Submission2s extends Component {
  constructor(props) {
      super(props)
      this.download = this.download.bind(this);
      this.reactTable = React.createRef();
      this.state = {
          orders: [],
          columns: [],
          isLoading: false,
          dataToDownload: []
      }
      
  }

  componentDidMount = async () => {
      this.setState({ isLoading: true })

      await api.getSubmissions2(this.props.id).then(orders => {
          this.setState({
              orders: orders.data.data,
              isLoading: false,
          })
      })
  }
  getTrProps = (state, rowInfo, colInfo, instance) => {
        return {
          style: {
            background: '#e1eef2'
          }
        }
    }
    download = async (event) => {
      const currentRecords = this.reactTable.getResolvedState().sortedData;
      var data_to_download = []
      for (var index = 0; index < currentRecords.length; index++) {
         let record_to_download = {}
         for(var colIndex = 0; colIndex < columns.length-1 ; colIndex ++) {
              record_to_download[columns[colIndex].Header] = currentRecords[index][columns[colIndex].accessor]
         }
         data_to_download.push(record_to_download)
      }
      this.setState({ dataToDownload: data_to_download }, () => {
         this.csvLink.link.click()
      })
    } 
    filterCaseInsensitive(filter, row) {
      const id = filter.pivotId || filter.id;
     
      if (row[id] != undefined || row[id] ===''){
          if (Number.isInteger(row[id])){
              const item = row[id].toString();
              return String(item.toLowerCase()).startsWith(filter.value.toLowerCase());
          }
          return String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase());
      }
      else{
          return true;
      }

      
  } 
  render() {
      const { orders, isLoading } = this.state
      const onChangeFct = () => console.log("onChange usually handled by redux");
      

      let showTable = true
      if (!orders.length) {
          showTable = false
      }

      return (
        <div>
            <div>
                <Wrapper>
                <button onClick={this.download} style= {{marginBottom: '10px'}}>
                   Export CSV File
               </button>
                    { showTable && (
                        <ReactTable
                            ref={(r) => this.reactTable = r}
                            data={orders}
                            columns={columns}
                            loading={isLoading}
                            defaultPageSize={25}
                            showPageSizeOptions={true}
                            minRows={0}
                            getTrProps={this.getTrProps}
                            filterable
                            defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row) }
                        />
                    )}
                </Wrapper>
            </div>
            <div>
               <CSVLink
                   data={this.state.dataToDownload}
                   filename="data.csv"
                   className="hidden"
                   ref={(r) => this.csvLink = r}
                   target="_blank"/>

            </div>
            </div>
      )
  }
}
class Submission3s extends Component {
  constructor(props) {
      super(props)
      this.download = this.download.bind(this);
      this.reactTable = React.createRef();
      this.state = {
          orders: [],
          columns: [],
          isLoading: false,
          dataToDownload: []
      }
      
  }

  componentDidMount = async () => {
      this.setState({ isLoading: true })

      await api.getSubmissions3(this.props.id).then(orders => {
          this.setState({
              orders: orders.data.data,
              isLoading: false,
          })
      })
  }
  getTrProps = (state, rowInfo, colInfo, instance) => {
        return {
          style: {
            background: '#e1eef2'
          }
        }
    }
    download = async (event) => {
      const currentRecords = this.reactTable.getResolvedState().sortedData;
      var data_to_download = []
      for (var index = 0; index < currentRecords.length; index++) {
         let record_to_download = {}
         for(var colIndex = 0; colIndex < columns.length-1 ; colIndex ++) {
              record_to_download[columns[colIndex].Header] = currentRecords[index][columns[colIndex].accessor]
         }
         data_to_download.push(record_to_download)
      }
      this.setState({ dataToDownload: data_to_download }, () => {
         this.csvLink.link.click()
      })
    } 
    filterCaseInsensitive(filter, row) {
      const id = filter.pivotId || filter.id;
     
      if (row[id] != undefined || row[id] ===''){
          if (Number.isInteger(row[id])){
              const item = row[id].toString();
              return String(item.toLowerCase()).startsWith(filter.value.toLowerCase());
          }
          return String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase());
      }
      else{
          return true;
      }

      
  } 
  render() {
      const { orders, isLoading } = this.state
      const onChangeFct = () => console.log("onChange usually handled by redux");
      

      let showTable = true
      if (!orders.length) {
          showTable = false
      }

      return (
        <div>
            <div>
                <Wrapper>
                <button onClick={this.download} style= {{marginBottom: '10px'}}>
                   Export CSV File
               </button>
                    { showTable && (
                        <ReactTable
                            ref={(r) => this.reactTable = r}
                            data={orders}
                            columns={columns}
                            loading={isLoading}
                            defaultPageSize={25}
                            showPageSizeOptions={true}
                            minRows={0}
                            getTrProps={this.getTrProps}
                            filterable
                            defaultFilterMethod={(filter, row) => this.filterCaseInsensitive(filter, row) }
                        />
                    )}
                </Wrapper>
            </div>
            <div>
               <CSVLink
                   data={this.state.dataToDownload}
                   filename="data.csv"
                   className="hidden"
                   ref={(r) => this.csvLink = r}
                   target="_blank"/>

            </div>
            </div>
      )
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 1500,
    margin: 'auto'
  },
}));

export default function FullWidthTabs(props) {
  const [state, setState] = useState({
    id: props.match.params.id,
  });
  useEffect(() => {
    const getFilesList = async () => {
      try {
        const {id} = state;
        // window.alert(id);
      } catch (error) {
        window.alert(error);
      }
    };

    getFilesList();
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const {id} = state;
  return (
    <div>
      <h1>Milestone {id}</h1>
      <div className={classes.root}>
        <AppBar position="static" color="default" style = {{marginTop: '20px'}}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Submission One" {...a11yProps(0)} />
            <Tab label="Submission Two" {...a11yProps(1)} />
            <Tab label="Submission Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Submission1s id = {id}/>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
          <Submission2s id = {id}/>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
          <Submission3s id = {id}/>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
}
