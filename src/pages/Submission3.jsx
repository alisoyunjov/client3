
import React, { Component } from 'react'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import api from '../components/api'
import dateFormat from 'dateformat';
import Tabs from './Tabs';

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
            const result =  await axios.get(`${API_URL}/download/${this.props.id}`, {
                responseType: 'blob'
            });
            const split = this.props.path.split('/');
            const filename = split[split.length - 1];
            const mimetype = this.props.mimetype;
            download(result.data, filename, mimetype)
        }
    }

    render() {
        return <Download onClick={this.downloadOrder}>Download</Download>
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


class FinishedOrders extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            columns: [],
            isLoading: false,
        }
        
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getSubmissions(3).then(orders => {
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
    render() {
        const { orders, isLoading } = this.state
        const onChangeFct = () => console.log("onChange usually handled by redux");
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
            Cell : (props)=>{
                var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const year = props.value.substring(0,4)
                const m = props.value.substring(5,7)
                const mm = parseInt(m)
                const month = strArray[mm-1]
                const day = props.value.substring(8,10)
                const d = month + ' ' + day +  ', ' + year  

                return <span>{d}</span>
            }
        },
        {
            Header: 'Needed By',
            accessor: 'date',
            filterable: true,
            minWidth: 140,
            Cell : (props)=>{
                if (props.value !== null){
                    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const year = props.value.substring(0,4)
                    const m = props.value.substring(5,7)
                    const mm = parseInt(m)
                    const month = strArray[mm-1]
                    const day = props.value.substring(8,10)
                    const d = month + ' ' + day +  ', ' + year  

                    return <span>{d}</span>
                }

            }
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
            Header: 'Received Date',
            accessor: 'receivedDate',
            filterable: true,
            minWidth: 140,
            Cell : (props)=>{
                if (props.value !== null){
                    var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    const year = props.value.substring(0,4)
                    const m = props.value.substring(5,7)
                    const mm = parseInt(m)
                    const month = strArray[mm-1]
                    const day = props.value.substring(8,10)
                    const d = month + ' ' + day +  ', ' + year  

                    return <span>{d}</span>
                }

            }
        },
        {
            Header: 'Status',
            accessor: 'orderStatus',
            filterable: true,
            minWidth: 150,
            Cell: (props) =>{
                var fileAttached;
                if (props.value === true) {
                  fileAttached = 'Finished';
                }
                else{
                  fileAttached = 'Not Finished';
                }
                return <span>{fileAttached}</span>
            }
        },
        {
            Header: 'Is File Needed',
            accessor: 'msdFile',
            filterable: true,
            minWidth: 150,
            Cell: (props) =>{
                var fileAttached;
                if (props.value === true) {
                  fileAttached = 'Yes';
                }
                else{
                  fileAttached = 'No';
                }
                return <span>{fileAttached}</span>
            }
        },

        {
            Header: 'Files',
            accessor: '',
            Cell: function(props) {
                return (
                    <span>
                        <DownloadOrder id={props.original._id} path = {props.original.file_path} mimetype = {props.original.file_mimetype}/>
                    </span>
                )
            },
        },
        ]

        let showTable = true
        if (!orders.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={orders}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={25}
                        showPageSizeOptions={true}
                        minRows={0}
                        getTrProps={this.getTrProps}
                    />
                )}
            </Wrapper>
        )
    }
}

export default FinishedOrders