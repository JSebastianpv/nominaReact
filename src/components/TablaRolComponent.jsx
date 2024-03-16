import React, { useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';

import $ from 'jquery';


export const TablaRolComponent = ({ data }) => {


    const Button = () => {
        return (<button className='btn btn-sm btn-primary '>Eliminar</button>)
    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
        },
        // {
        //     name: 'Accion',
        //     button: true,
		//     cell: () => <Button />
        // },
    ];
    
    

    
    
  return (
        <>
            <input type='text' className='form-control mt-2 mb-2 float-right col-4' placeholder='Buscar' />
            <DataTable
                
                pagination
                columns={columns}
                data={data}
                highlightOnHover
                paginationComponentOptions={{
                    rowsPerPageText: 'Filas por página',
                    rangeSeparatorText: 'de',
                    selectAllRowsItem: true,
                    selectAllRowsItemText: 'Todos',
                }}
                customStyles={{headCells: {
                    style: {
                        color: '#202124',
                        fontSize: '18px',
                    },
                }}}
            />
        </>
        
  )
}

