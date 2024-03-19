import React, { useEffect, useState } from 'react'
import { DatatableEmpleados } from '../components/DatatableEmpleados';
import { getEmp, postEmp, getRoles, getIdEmp, putEmp } from '../helpers/Peticiones';
import Swal from 'sweetalert2';
import { cerrarModal } from '../helpers/Funciones';

export const EmpleadosView = () => {
    const [empleados, setEmpleados] = useState([]);
    const [roles, setRoles] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nEmpleado, setNEmpleado] = useState('');
    const [encModal, setEncModal] = useState('Nuevo Empleado');
    const [selRol, setSelRol] = useState(0);
    const [empId, setEmpId] = useState(0);

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

    const handleEditar = async (idEmp) => {
        const empRes = await getIdEmp(idEmp);

        setEncModal('Editar Empleado');
        setEmpId(empRes[0].id);
        setNombre(empRes[0].nombre);
        setNEmpleado(empRes[0].no_empleado);
        setApellidos(empRes[0].apellido);
        setSelRol(empRes[0].rol.id);
    };

    const limpiaState = () => {
        setEncModal('Nuevo Empleado');
        setNombre('');
        setNEmpleado('');
        setApellidos('');
        setSelRol(0);
    }

    useEffect( () => {
        getEmpleados();
        
    }, []);

    

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

        var resp;
        if (empId == 0) {
            resp = await postEmp(nombre, apellidos, nEmpleado, selRol);
        } else {
            resp = await putEmp(empId, nombre, apellidos, nEmpleado, selRol);
        }
        
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
            limpiaState();
            getEmpleados();

            cerrarModal();

        }

    }
    return (
        <div>
            <h2>Listado de Empleados</h2>
            <div>

                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNuevo" onClick={() => limpiaState()}>
                    <i className="fa-solid fa-plus"></i>
                </button>

                <div className="modal fade" id="modalNuevo"  aria-labelledby="modalNuevoLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="modalNuevoLabel">{encModal}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(event) => onSubmit(event)}>
                                    <div className="mb-3">
                                        <label className="form-label">Nombre</label>
                                        <input type="text" className="form-control" maxLength={25}  placeholder="Nombre del empleado" value={nombre} onChange={e => setNombre(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Apellido</label>
                                        <input type="text" className="form-control" maxLength={25}   placeholder="Apellidos del empleado" value={apellidos} onChange={e => setApellidos(e.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Número de empleado</label>
                                        <input type="text" className="form-control" maxLength={6}   placeholder="Número de empleado" value={nEmpleado} onChange={onChangeNoEmpleado}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label  className="form-label">Seleccione rol</label>
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
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" className="btn btn-primary" onClick={onSubmit}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <DatatableEmpleados datos={empleados} onClickEditar={handleEditar} />
            </div>
        </div>
    )
}
