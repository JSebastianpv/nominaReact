import React, { useEffect, useRef } from 'react'
import $ from 'jquery';


export const DatatableEmpleados = ({datos}) => {
    const tablaRefEmp = useRef(null);

    const configuracionDataTable = {
        columns: [
            { 
                data: 'id',
            },
            { 
                render: (data, type, row) => {
                    return row.nombre + ' ' + row.apellido;
                }
            },
            
            { 
                data: 'no_empleado',
            },
            {
                render: (data, type, row) => {
                    return row.rol.nombre;
                }
            },
            
        ],
        data: datos,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    };
 
    useEffect(() => {
        if (datos.length === 0) return; 
        const tabla = $(tablaRefEmp.current).DataTable(configuracionDataTable);

        return () => {
            tabla.destroy();
        };
    }, [datos]);

  return (
    <table id="tablaData" ref={tablaRefEmp} className="table table-bordered table-responsive" style={{width:"100%"}}>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>No. Empleado</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  )
}
