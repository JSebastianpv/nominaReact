import React, { useState, useEffect } from 'react'
import { getRol, getRoles, postRoles, putRoles } from '../helpers/Peticiones';
import { DatatableRol } from '../components/DatatableRol';
import Swal from 'sweetalert2';
import { cerrarModal, soloNumeros } from '../helpers/Funciones';


export const RolesView = () => {
    const [roles, setRoles] = useState([]);
    const [rolEdit, setRolEdit] = useState([]);
    const [nombreRol, setNombreRol] = useState('');
    const [encModal, setEncModal] = useState('Nuevo Rol');
    const [bonoRol, setBonoRol] = useState(0)
    const [idRol, setIdRol] = useState(0)
 
    const getRolea = async () => {
        const newRoles = await getRoles();
        setRoles(newRoles);
    }

    const onInputChange = ({target}) => {
        if(target.name == 'nomRol'){
            setNombreRol(target.value);
        }

        if(target.name == 'bonoRol'){
            if (target.value === '' || soloNumeros(target.value)) {
                setBonoRol(target.value);
            }
        }
    }

    const handleEditar = async (rol) => {
        const rolRes = await getRol(rol);
        setEncModal('Editar Rol');
        setNombreRol(rolRes[0].nombre);
        setIdRol(rolRes[0].id);
        setBonoRol(rolRes[0].bono);
    };

    const limpiarState = () => {
        setEncModal('Nuevo Rol');
        setIdRol(0);
        setNombreRol('');
        setBonoRol('');
    }   


    const onSubmit = async (event) => {
        event.preventDefault();
        if (nombreRol == '') {
            Swal.fire({
                position: "center",
                icon: "info",
                title: 'Introduzca un nombre',
                showConfirmButton: false,
            });
            return;
        }
        var resp;
        if (idRol == 0) {
             resp = await postRoles(nombreRol, bonoRol);
        } else {
             resp = await putRoles( idRol, nombreRol, bonoRol);
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
              limpiarState();
            getRolea();
            cerrarModal();
        }

    }

    useEffect( () => {
        getRolea();
    }, [])

  return (
    <div>
        <h2>Listado de Roles</h2>
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNuevo" onClick={() => limpiarState()}>
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
                                    <input type="text" className="form-control" maxLength={20} name="nomRol"  placeholder="Nombre del rol" value={nombreRol} onChange={onInputChange}/>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Bono por hora</label>
                                    <input type="text" className="form-control" maxLength={6} name="bonoRol" placeholder="Bono del rol" value={bonoRol} onChange={onInputChange}/>
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
            {/* <TablaRolComponent data={roles}/> */}
            <DatatableRol data={roles} onClickEditar={handleEditar} />
        </div>
    </div>
  )
}
