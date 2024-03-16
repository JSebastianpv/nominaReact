import React, { useEffect, useState } from 'react'
import { DatatableMovimientos } from '../components/DatatableMovimientos'
import { getMovtos } from '../helpers/Peticiones';

export const MovimientosView = () => {
    const [movtos, setMovtos] = useState([]);

    const getRolea = async () => {
        const newMovtos = await getMovtos();
        setMovtos(newMovtos);
    }


    useEffect( () => {
        getRolea();
        
    }, [])

    return (
        <div>
        <h2>Listado de Movimientos</h2>
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalNuevo">
                Nuevo
            </button>

            {/* <div className="modal fade" id="modalNuevo"  aria-labelledby="modalNuevoLabel" aria-hidden="true" >
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
            </div> */}
            <DatatableMovimientos datos={movtos} />

        </div>
    </div>
    )
    }
