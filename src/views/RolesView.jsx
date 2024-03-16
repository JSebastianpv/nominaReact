import React, { useState, useEffect } from 'react'
import { getRoles, postRoles } from '../helpers/Peticiones';
import { DatatableRol } from '../components/DatatableRol';
import Swal from 'sweetalert2';




export const RolesView = () => {
    const [roles, setRoles] = useState([]);
    const [nombreRol, setNombreRol] = useState('')
 
    const getRolea = async () => {
        const newRoles = await getRoles();
        setRoles(newRoles);
    }

    const onInputChange = ({target}) => {
        setNombreRol(target.value);
    }

    const cerrarModal = () => {
        document.querySelector('.btn-close').click();
    };

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
        const resp = await postRoles(nombreRol);
        if (resp.status != 200) {
            console.log('Algo ha fallado')
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: resp.data,
                showConfirmButton: false,
                timer: 1500
              });
            setNombreRol('');
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
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNuevo">
                Nuevo
            </button>

            <div className="modal fade" id="modalNuevo"  aria-labelledby="modalNuevoLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="modalNuevoLabel">Nuevo Rol</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(event) => onSubmit(event)}>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Nombre del rol" value={nombreRol} onChange={onInputChange}/>
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
            {/* <TablaRolComponent data={roles}/> */}
            <DatatableRol data={roles} />
        </div>
    </div>
  )
}
