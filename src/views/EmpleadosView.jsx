import React, { useEffect, useState } from 'react'
import { DatatableEmpleados } from '../components/DatatableEmpleados';
import { getEmp, postEmp, getRoles } from '../helpers/Peticiones';
import Swal from 'sweetalert2';

export const EmpleadosView = () => {
    const [empleados, setEmpleados] = useState([]);
    const [roles, setRoles] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nEmpleado, setNEmpleado] = useState('');
    const [selRol, setSelRol] = useState(0);

    const getEmpleados = async () => {
        const newEmp = await getEmp();
        setEmpleados(newEmp);
        getRolea();
    }

    const getRolea = async () => {
        const newRoles = await getRoles();
        setRoles(newRoles);
    }

    const onChangeNoEmpleado = ({target}) => {
        const numeros = /^[0-9]*$/;
        if (target.value === '' || numeros.test(target.value)) {
            setNEmpleado(target.value);
        }
    }

    useEffect( () => {
        getEmpleados();
        
    }, []);

    const cerrarModal = () => {
        document.querySelector('.btn-close').click();
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (nombre == '' || apellidos == '' || nEmpleado == '' || selRol == 0) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: 'Complete todos los campos',
                showConfirmButton: false,
            });
            return;
        }
        const resp = await postEmp(nombre, apellidos, nEmpleado, selRol);
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
            setNombre('');
            setNEmpleado('');
            setApellidos('');
            setSelRol(0);
            getEmpleados();
            cerrarModal();
        }

    }
    return (
        <div>
            <h2>Listado de Empleados</h2>
            <div>

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNuevo">
                    Nuevo
                </button>

                <div className="modal fade" id="modalNuevo"  aria-labelledby="modalNuevoLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="modalNuevoLabel">Nuevo Empleado</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(event) => onSubmit(event)}>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input type="text" className="form-control"  placeholder="Nombre del empleado" value={nombre} onChange={e => setNombre(e.target.value)} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Apellido</label>
                                        <input type="text" className="form-control"  placeholder="Apellidos del empleado" value={apellidos} onChange={e => setApellidos(e.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Numero de empleado</label>
                                        <input type="text" className="form-control"  placeholder="Numero de empleado" value={nEmpleado} onChange={onChangeNoEmpleado}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label  className="form-label">Selecciona rol</label>
                                        <select  className="form-select" value={selRol} onChange={e => setSelRol(e.target.value)}>
                                            <option value="0">Seleccione</option>
                                            {roles.map((rol, index) => (
                                            <option key={index} value={rol.id}>
                                                {rol.nombre}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    
                                </form>
                                
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={onSubmit}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <DatatableEmpleados datos={empleados} />
            </div>
        </div>
    )
}
