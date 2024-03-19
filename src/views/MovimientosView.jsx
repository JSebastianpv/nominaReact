import React, { useEffect, useState } from 'react'
import { DatatableMovimientos } from '../components/DatatableMovimientos'
import { getMovtos, getMovtosMes, getNoEmp, postMovto } from '../helpers/Peticiones';
import Swal from 'sweetalert2';
import { cerrarModal, obtenerMesActual, soloNumeros } from '../helpers/Funciones';

export const MovimientosView = () => {
    
    const [movtos, setMovtos] = useState([]);
    const [searchMes, setSearchMes] = useState(obtenerMesActual());
    const [tieneFalta, setTieneFalta] = useState(false);
    const [selMes, setMes] = useState(obtenerMesActual());
    const [nEmpleado, setNEmpleado] = useState('');
    const [entregas, setEntregas] = useState(0);
    const [numFaltas, setNumFaltas] = useState(0);
    const [empleado, setEmpleado] = useState({
        noEmpleado: '',
        nombre: '',
        rol: ''
    });

    
    
    const getMov = async (sMes) => {
        const newMovtos = await getMovtosMes(sMes);
        setMovtos(newMovtos);
    }

    const onChangeNoEmpleado = ({target}) => {
        if (target.value === '' || soloNumeros(target.value)) {
            setNEmpleado(target.value);
        }
    }

    const onChangeEntregas = ({target}) => {
        if (target.value === '' || soloNumeros(target.value)) {
            setEntregas(target.value);
        }
    }

    const onChangeFaltas = ({target}) => {
        if (target.value === '' || soloNumeros(target.value)) {
            setNumFaltas(target.value);
        }
    }

    const onChangeSearchMonth = ({target}) => {
        setSearchMes(target.value);
        getMov(target.value); 
        
    }

    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril',
        'Mayo', 'Junio', 'Julio', 'Agosto',
        'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];

    const searchEmpleado = async () => {

        const seEmpleado = await getNoEmp(nEmpleado);
        if (seEmpleado.length == 0) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: 'No se encontro empleado con ese numero',
                showConfirmButton: false,
            });
            setEmpleado({
                noEmpleado: '',
                nombre: '',
                rol: ''
            });
            return;
        }
        setEmpleado({
            noEmpleado: seEmpleado[0].no_empleado,
            nombre: `${seEmpleado[0].nombre} ${seEmpleado[0].apellido}`,
            rol: seEmpleado[0].rol.nombre
        });
    }

    const limpiaState = () => {
        setMes(obtenerMesActual());
        setNEmpleado('');
        setEmpleado({
            noEmpleado: '',
            nombre: '',
            rol: ''
        });
        setEntregas(0);
        
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        
        if (nEmpleado == '' || selMes == 0) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: 'Complete todos los campos',
                showConfirmButton: false,
            });
            return;
        }
        if (empleado.noEmpleado == '') {
            Swal.fire({
                position: "center",
                icon: "info",
                title: 'Introduzca un empleado valido',
                showConfirmButton: false,
            });
            return;
        }

        if (empleado.noEmpleado != nEmpleado) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: 'El numero de empleado no corresponde al empleado mostrado',
                showConfirmButton: false,
            });
            return;
        }
        const mesActual = obtenerMesActual();
        if (selMes > mesActual) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: 'No puede registrar entregas en un mes mayor al actual',
                showConfirmButton: false,
            });
            return;
        }

        if (tieneFalta && numFaltas == 0) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: 'Indique el numero de faltas',
                showConfirmButton: false,
            });
            return;
        }
        const resp = await postMovto(empleado.noEmpleado, selMes, entregas, numFaltas);
        if (resp.status != 200) {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: resp.error,
                showConfirmButton: false,
              });
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: resp.data,
                showConfirmButton: false,
                timer: 1500
              });
            getMov(searchMes);
            limpiaState();
            cerrarModal();
        }

    }

    const handleTieneFaltas = () => {
        if (tieneFalta) {
            setNumFaltas(0);
        }
        setTieneFalta(!tieneFalta); // Cambia el estado del checkbox
      };

    useEffect( () => {
        // setMes(obtenerMesActual());
        getMov(searchMes);
        
    }, [])

    return (
        <div>
        <h2>Listado de Movimientos</h2>
        <div>
            <div className="row mt-2 mb-2">
                <div className="col-sm-1">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNuevo" onClick={() => limpiaState()} >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                <div className="col-sm-6">
                    <div className="row">
                        <div className="col-5">
                            <label >Seleccione el mes a mostrar</label>
                        </div>
                        <div className="col 5">
                            <select className="form-select" aria-label="Default select example" value={searchMes} onChange={onChangeSearchMonth}>
                                <option value="0">Todos</option>
                                    {meses.map((month, index) => (
                                        <option key={index} value={index + 1}>{month}</option>
                                    ))}
                            </select>
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
            

            <div className="modal fade" id="modalNuevo"  aria-labelledby="modalNuevoLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalNuevoLabel">Registrar movimiento</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(event) => onSubmit(event)}>
                                <div>
                                <label className="form-label">Numero de empleado</label>
                                <div className="input-group mb-3">
                                    
                                    <input type="text" className="form-control" maxLength={5} placeholder="Numero de empleado"  aria-describedby="button-addon2" value={nEmpleado} onChange={onChangeNoEmpleado}/>
                                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={searchEmpleado}><i className="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control"  placeholder="Nombre del empleado" value={empleado.nombre} readOnly disabled/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Rol</label>
                                    <input type="text" className="form-control"  placeholder="Rol" value={empleado.rol} readOnly disabled/>
                                </div>
                                <div className="col-md-4">
                                    <label  className="form-label">Selecciona Mes</label>
                                    <select  className="form-select" value={selMes} onChange={e => setMes(e.target.value)}>
                                        <option value="0">Seleccione Mes</option>
                                        {meses.map((month, index) => (
                                            <option key={index} value={index + 1}>{month}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 mt-3">
                                    <label className="form-label">Cantidad de Entregas</label>
                                    <input type="text" className="form-control" maxLength={5}  placeholder="Cantidad de entregas" value={entregas} onChange={onChangeEntregas}/>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={tieneFalta} onChange={handleTieneFaltas}/>
                                    <label className="form-check-label" htmlFor="flexCheckDefault" >
                                        ¿Faltó en el mes?
                                    </label>
                                </div>
                                {tieneFalta && (
                                    <div className="col-3">
                                        <label className="form-label">Número de días:</label>
                                        <input type="text" className="form-control" maxLength={2}  value={numFaltas} onChange={onChangeFaltas} />
                                    </div>
                                )}
                            </form>
                            
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={onSubmit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
            <DatatableMovimientos datos={movtos} />

        </div>
    </div>
    )
    }
