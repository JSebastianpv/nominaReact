import React, { useEffect, useRef } from 'react'
import { renderToString } from 'react-dom/server';
import $ from 'jquery';


export const DatatableEmpleados = ({datos, onClickEditar}) => {
    const tablaRefEmp = useRef(null);

    const configuracionDataTable = {
        columns: [
            // { 
            //     data: 'id',
            // },
            
            { 
              data: 'no_empleado',
            },
            { 
                render: (data, type, row) => {
                    return row.nombre + ' ' + row.apellido;
                }
            },
            
            {
                render: (data, type, row) => {
                    return row.rol.nombre;
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
        data: datos,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    };
 
    useEffect(() => {
        if (datos.length === 0) return; 
        const tabla = $(tablaRefEmp.current).DataTable(configuracionDataTable);

        $(tablaRefEmp.current).on('click', '.btn-editar', function() {
          onClickEditar($(this).attr('role'));
        });

        return () => {
            tabla.destroy();
        };
    }, [datos]);

  return (
    <table id="tablaData" ref={tablaRefEmp} className="table table-bordered table-responsive" style={{width:"100%"}}>
      <thead>
        <tr>
          {/* <th>Id</th> */}
          <th width={'20%'}>No. Empleado</th>
          <th width={'40%'}>Nombre</th>
          <th>Rol</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  )
}
