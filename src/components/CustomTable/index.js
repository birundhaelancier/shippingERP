import react, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { RemoveRedEye, Edit, Delete } from '@mui/icons-material';
// import SVG from "react-inlinesvg";
import QuickSearchToolbar from '../SearchBar';
import Grid from '@mui/material/Grid';
import './table.css';

const CustomTable = ({ rowData, columnData, onSearch, onclickEye, onAddBtnClick, hideHeader,Checkboxselection }) => {
    const [rows, setRows] = useState([])
    useEffect(() => {
        if (rowData.length > 0) {
            setRows(rowData)
        }
    }, [rowData])
    function escapeRegExp(value) {
        return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    const requestSearch = (item) => {
        const searchRegex = new RegExp(escapeRegExp(item), 'i');
        const filteredRows = rowData.filter((row) => {
            return Object.keys(row).some((field) => {
                return searchRegex.test(row[field].toString());
            });
        });
        setRows(filteredRows);
        onSearch(item)
    }

    const openList = () => {
        onclickEye(true);
    }
    const onclickAction = (id) => {
        alert("ghjk")
        // if (id === 1) {
        let sortableItems = rowData;
        sortableItems.sort((a, b) => {
            if (a.companyName < b.companyName) {
                return id === 1 ? -1 : 1;
            }
            if (a.companyName > b.companyName) {
                return id === 2 ? 1 : -1;
            }
            return 0;
        });
        // }
        setRows(sortableItems)
    }
    return (
        <div>
            <div className='tableWeb'>
                <div style={{ height: 450, width: '100%' }}>
                    <DataGrid
                        components={{ Toolbar: !hideHeader && QuickSearchToolbar }}
                        rows={rows}
                        columns={columnData}
                        checkboxSelection
                        onSelectionModelChange={(ids) =>Checkboxselection(ids)}
                        rowsPerPageOptions={[5, 25, 50, 100]}
                        componentsProps={{
                            toolbar: {
                                // value: searchText,
                                onChange: (event) => requestSearch(event.target.value),
                                clearSearch: () => requestSearch(''),
                                onAddClick: onAddBtnClick,
                                onclickAction: (data) => onclickAction(data)
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