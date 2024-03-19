import React, { useEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server';
import $ from 'jquery';
import { formateaMoneda } from '../helpers/Funciones';


export const DatatableRol = ({data, onClickEditar }) => {
    const [dataTableInitialized, setDataTableInitialized] = useState(false);
    const tablaRef = useRef(null);

    const configuracionDataTable = {
      responsive: true,
        columns: [
            { 
                data: 'id',
                // title: 'Id'
            },
            { 
                data: 'nombre',
                // title: 'Nombre'
            },
            {
                render: function (data, type, row) {
                    return formateaMoneda(row.bono);
                }
            },
            {
                data: null,
                render: function (data, type, row) {
                    return renderToString(
                        <button className="btn btn-info text-white btn-editar" role={row.id} data-bs-toggle="modal" data-bs-target="#modalNuevo">
                            <i className="fas fa-pen-to-square"></i>
                        </button>
                    );
                }
                
            }
        ],
        columnDefs: [
            { targets: 2, className: 'text-end' }, 
            { targets: 3, className: 'text-center' } 
        ],
        data: data,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    };

 
    useEffect(() => {
        if (data.length === 0) return;
    
        const tabla = $(tablaRef.current).DataTable(configuracionDataTable);
        $(tablaRef.current).on('click', '.btn-editar', function() {
            onClickEditar($(this).attr('role'));
        });
    
        return () => {
            tabla.destroy();
        };
    }, [data]);

  return (
    <table id="tablaData" ref={tablaRef} className="table table-bordered table-responsive" style={{width:"100%"}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Bono por hora</th>
          <th width={'20%'}></th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  )
}
