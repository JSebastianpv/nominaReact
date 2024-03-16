import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import { formateaMoneda } from '../helpers/Funciones';

export const DatatableMovimientos = ({datos}) => {
    const tablaRefEmp = useRef(null);

    const configuracionDataTable = {
        columns: [
            { 
                render: (data, type, row) => {
                    return row.empleado.no_empleado;
                }
            },
            { 
                render: (data, type, row) => {
                    return row.empleado.nombre + ' ' + row.empleado.apellido;
                }
            },
            {
                render: (data, type, row) => {
                    return row.empleado.rol.nombre;
                }
            },
            {
                data: 'horas_trabajadas'
            },
            {
                data: 'numero_entregas'
            },
            {
                render: function (data, type, row) {
                    return formateaMoneda(row.pago_entregas);
                }
            },
            {
                render: function (data, type, row) {
                    return formateaMoneda(row.pago_bonos);
                }
            },
            {
                render: function (data, type, row) {
                    return formateaMoneda(row.retencion);
                }
            },
            {
                render: function (data, type, row) {
                    return formateaMoneda(row.vales);
                }
            },
            {
                render: function (data, type, row) {
                    return formateaMoneda(row.sueldo_total);
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

        return () => {
            tabla.destroy();
        };
    }, [datos]);

    return (
        <table id="tablaData" ref={tablaRefEmp} className="table table-bordered table-responsive" style={{width:"100%"}}>
        <thead >
            <tr >
            <th className='text-center'>No. Empleado</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Horas Trabajadas</th>
            <th>Entregas</th>
            <th>Pago Entregas</th>
            <th>Pago Bonos</th>
            <th>Retenciones</th>
            <th>Vale</th>
            <th>Sueldo</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
        </table>
    )     
}
