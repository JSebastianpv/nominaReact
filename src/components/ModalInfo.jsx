import React from 'react'
import { formateaMoneda, obtenerNombreMes } from '../helpers/Funciones'

export const ModalInfo = ({data}) => {
  return (
    <div className="modal fade " id="modalInfo"  aria-labelledby="modalInfoMov" aria-hidden="true" >
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="modalInfoMov">Detalle de Movimiento</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="card" >
                        <div className="card-body">
                            <div className="row">
                                <div className="col-7">
                                    <h5 className="card-title">Empleado: {data[0]?.empleado.nombre} {data[0]?.empleado.apellido}</h5>
                                    <h5 className="card-title">Rol: {data[0]?.empleado.rol.nombre}</h5>
                                    <h5 className="card-title">No. Empleado: {data[0]?.empleado.no_empleado}</h5>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <h5 className="m-2"> Mes: {obtenerNombreMes(data[0]?.month)}</h5 >
                    <h5 className="m-2"> Rol: {data[0]?.nombre_rol}</h5 >
                    <h5 className="m-2"> Faltas en el mes: {data[0]?.num_faltas}</h5 >
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="text-center">Horas</th>
                                <th className="text-center" colSpan={2}>Bono Horas</th>
                                <th className="text-center">Sueldo</th>
                                <th className="text-center" colSpan={2}>Entregas</th>
                                <th className="text-center">SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data[0]?.horas_trabajadas}</td>
                                <td className="text-end">{formateaMoneda(data[0]?.bono_hora)}</td>
                                <td className="text-end">{formateaMoneda(data[0]?.pago_bonos)}</td>
                                <td className="text-end">{formateaMoneda(data[0]?.sueldo_base)}</td>
                                <td>{data[0]?.numero_entregas}</td>
                                <td className="text-end">{formateaMoneda(data[0]?.pago_entregas)}</td>
                                <td className="text-end">{formateaMoneda(data[0]?.pago_bonos + data[0]?.sueldo_base + data[0]?.pago_entregas)}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                                <td className="text-end" colSpan={6}>Retenciones</td>
                                <td className="text-end">-{formateaMoneda(data[0]?.retencion)}</td>
                            </tr>
                            <tr>
                                <td className="text-end" colSpan={6}>Vale</td>
                                <td className="text-end">{formateaMoneda(data[0]?.vales)}</td>
                            </tr>
                            <tr>
                                <td className="text-end" colSpan={6}>Total</td>
                                <td className="text-end">{formateaMoneda(data[0]?.sueldo_total)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
  )
}
