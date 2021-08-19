
import React, { Component } from 'react'
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" 
import api from '../components/api/vendorApi'
import dateFormat from 'dateformat';
import Tabs from './Tabs';

import styled from 'styled-components'
import { BvendorBottom } from '@material-ui/icons';
import { InputLabel, Select, MenuItem } from "@material-ui/core";
import { FormControl, TextField } from "@material-ui/core";
import { Container, Col, Row, Jumbotron, Form, Button } from "react-bootstrap";

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

class UpdateVendor extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/vendors/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteVendor extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the vendor ${this.props.id} permanently?`,
            )
        ) {
            api.deleteVendorById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>
        <button className="btn" id="button" style = {{backgroundColor: '#fc036f'}}>Delete</button>
        </Delete>
    }
}


class GetVendors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vendors: [],
            columns: [],
            isLoading: false,
        }
        
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllVendors().then(vendors => {
            this.setState({
                vendors: vendors.data.data,
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
        const { vendors, isLoading } = this.state
        const onChangeFct = () => console.log("onChange usually handled by redux");
        const columns = [
        
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Email',
                accessor: 'email',
                filterable: true,
            },
       


            {
                Header: 'Delete',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteVendor id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!vendors.length) {
            showTable = false
        }

        return (
            <Wrapper style = {{width: '1000px', margin: 'auto'}}>
                {showTable && (
                    <ReactTable
                        data={vendors}
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

export default GetVendors