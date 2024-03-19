import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import { renderToString } from 'react-dom/server';
import { formateaMoneda, obtenerNombreMes } from '../helpers/Funciones';
import { ModalInfo } from './ModalInfo';
import { getMovto } from '../helpers/Peticiones';


export const DatatableMovimientos = ({datos}) => {
    const tablaRefMov = useRef(null);
    const [funcionEjecutada, setFuncionEjecutada] = useState(false);
    const [movDetalle, setMovDetalle] = useState([]);

    const configuracionDataTable = {
        responsive: true,
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
                render: function (data, type, row) {
                    return obtenerNombreMes(row.month);
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
                    return renderToString(
                        <span className="badge text-bg-info">{formateaMoneda(row.pago_entregas)}</span>
                    );
                }
            },
            {
             
                render: function (data, type, row) {
                    return renderToString(
                        <span className="badge text-bg-info">{formateaMoneda(row.pago_bonos)}</span>
                    );
                }
            },
            {
                render: function (data, type, row) {
                    return renderToString(
                        <span className="badge text-bg-danger">{formateaMoneda(row.retencion)}</span>
                    );
                }
            },
            {
                render: function (data, type, row) {
                    return renderToString(
                        <span className="badge text-bg-info">{formateaMoneda(row.vales)}</span>
                    );
                }
            },
            {
                
                render: function (data, type, row) {

                    return renderToString(
                        <button className="btn btn-success text-white btn-infomacion btn-sm" mov={row.id} data-bs-toggle="modal" data-bs-target="#modalInfo">
                            {formateaMoneda(row.sueldo_total)}
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

    const getMov = async (id) => {
        const movDet = await getMovto(id);
        setMovDetalle(movDet);
    }

    useEffect(() => {
        // if (datos.length === 0) return; 
        
        const tabla = $(tablaRefMov.current).DataTable(configuracionDataTable);
        $(tablaRefMov.current).on('click', '.btn-infomacion', function() {
            if (!funcionEjecutada) {
                setFuncionEjecutada(true);
                getMov($(this).attr('mov'));
                return;
            }
            
        });

        return () => {
            tabla.destroy();
        };
    }, [datos]);

    

    return (
        <div>
            <table id="tablaData" ref={tablaRefMov} className="table table-bordered table-responsive" style={{width:"100%"}}>
            <thead >
                <tr >
                    <th className='text-center'>No. Empleado</th>
                    <th>Nombre</th>
                    <th>Rol</th>
                    <th>Mes</th>
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
        <ModalInfo data={movDetalle}/>
        </div>
        
    )     
}
