import react, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
// import SVG from "react-inlinesvg";


const CustomTable = () => {
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
                        <div className="deleteSymbol"><Delete /></div>

                        {/* <button title="Edit customer" className="btn btn-sm mx-3 btn-icon btn-success" > <span className="svg-icon svg-icon-md"> <EyeOutlined /> </span> </button>
                        <button title="Edit customer" className="btn btn-icon btn-sm mx-3 btn-danger" >  <span className="svg-icon svg-icon-md"> r </span> </button>
                        <button title="Edit customer" className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"> <span className="svg-icon svg-icon-md svg-icon-primary"> y </span> </button> */}
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

    return (
        <div>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    // components={{ Toolbar: QuickSearchToolbar }}
                    rows={rows}
                    columns={columnss}
                    // page={page}
                    // pageSize={pageSize}
                    // onPageSizeChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 25, 50, 100]}
                // componentsProps={{
                //     toolbar: {
                //         value: searchText,
                //         onChange: (event) => requestSearch(event.target.value),
                //         clearSearch: () => requestSearch(''),
                //     },
                // }}
                />
            </div>
        </div>
    );
}
export default CustomTable;