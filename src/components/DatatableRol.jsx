import React, { useEffect, useRef } from 'react'
import $ from 'jquery';


export const DatatableRol = ({data}) => {
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
             }
        ],
        data: data,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
        }
    };

 
    useEffect(() => {
        if (data.length === 0) return; 
        const tabla = $(tablaRef.current).DataTable(configuracionDataTable);
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
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  )
}
