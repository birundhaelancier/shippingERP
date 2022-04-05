import react, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
// import SVG from "react-inlinesvg";
import QuickSearchToolbar from '../SearchBar';
import Grid from '@mui/material/Grid';
import './table.css';

const CustomTable = ({ rowData, columnData, onSearch, onclickEye, onAddBtnClick }) => {
    const columnss = [
        { field: 'id', width: 80, headerName: 'S.No' },
        { field: 'customerId', width: 150, headerName: 'Customer Id' },
        { field: 'customerName', width: 150, headerName: 'Customer Name' },
        { field: 'companyName', width: 150, headerName: 'Company Name' },
        { field: 'mobile', width: 150, headerName: 'Mobile' },
        { field: 'email', width: 200, headerName: 'Email' },
        {
            field: "actions", headerName: "Actions",
            sortable: false,
            width: 150,
            align: 'center',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="eyeSymbol"><RemoveRedEye /></div>
                        <div className="editSymbol"><Edit /></div>
                        {/* <div className="deleteSymbol"><Delete /></div> */}
                    </div>
                );
            }
        }
    ];

    const rows = [
        { id: 1, customerName: 'Hello', customerId: '1', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 2, customerName: 'DataGridPro', customerId: '2', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 3, customerName: 'MUI', customerId: '3', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 1, customerName: 'Hello', customerId: '1', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
        { id: 2, customerName: 'DataGridPro', customerId: '2', companyName: "testing", mobile: 12345678908, email: "test@gmail.com" },
    ];

    const requestSearch = (data) => {
        onSearch(data)
    }

    const openList = () => {
        onclickEye(true);
    }
    return (
        <div>
            <div className='tableWeb'>
                <div style={{ height: 450, width: '100%' }}>
                    <DataGrid
                        components={{ Toolbar: QuickSearchToolbar }}
                        rows={rowData}
                        columns={columnData}
                        checkboxSelection
                        rowsPerPageOptions={[5, 25, 50, 100]}
                        componentsProps={{
                            toolbar: {
                                // value: searchText,
                                onChange: (event) => requestSearch(event.target.value),
                                clearSearch: () => requestSearch(''),
                                onAddClick: onAddBtnClick
                            },
                        }}
                    />
                </div>
            </div>
            <div className='tableMobile'>
                <Grid>
                    <QuickSearchToolbar onAddClick={onAddBtnClick} />
                </Grid>
                {rowData.map((data, index) => {
                    return (
                        <Grid item xs={12} spacing={2} direction="row" container className='card_container' >

                            {Object.values(data).map((val, id) => {
                                if (id !== 0) {
                                    return (
                                        <>
                                            <Grid item xs={6} md={4} sx={6} sm={12}>
                                                <label className="labeltxt">{columnData[id].headerName}</label>
                                                <div className='contact_name'>{val}</div>
                                            </Grid>
                                            {/* {id+1 == columnData.length && */}

                                            {/* } */}
                                        </>
                                    )
                                }
                            })}
                            <Grid item xs={12} md={4} sx={6} sm={12} direction="row" justifyContent={'flex-end'} container>
                                <div className='icons_view'>
                                    <div className="eyeSymbol" onClick={openList}><RemoveRedEye /></div>
                                    <div className="editSymbol"><Edit /></div>
                                    {/* <div className="deleteSymbol"><Delete /></div> */}
                                </div>
                            </Grid>
                        </Grid>
                    )
                })}

            </div>
        </div>
    );
}
export default CustomTable;