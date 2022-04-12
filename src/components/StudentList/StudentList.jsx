import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import CsvUpload from '../CsvUpload/CsvUpload';

function StudentList() {

  const store = useSelector((store) => store);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
          `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      },
    {
      field: 'gradDate',
      headerName: 'Grad Date',
      width: 110,
      editable: true,
    },
    {
        field: 'school',
        headerName: 'School',
        width: 110,
        editable: true,
      },

  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', school: 'SaintPaul', gradDate: 2023 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei',school: 'Chanhassen', gradDate: 2028 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime',school: 'Edina', gradDate: 2024 },
    { id: 4, lastName: 'Stark', firstName: 'Arya',school: 'Chaska', gradDate: 2026 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',school: 'Minnetonka', gradDate: 2026 },
    { id: 6, lastName: 'Melisandre', firstName: 'Meliassa',school: 'Hopkins', gradDate: 2025 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara',school: 'Minneapolis', gradDate: 2022 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini',school: 'South', gradDate: 2027 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey',school: 'Eden Prairie', gradDate: 2028 },
  ];

  return (
      <>
     <CsvUpload/>
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
    </>
  );
}

export default StudentList;
