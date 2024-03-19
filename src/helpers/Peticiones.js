import axios from 'axios';
import Swal from 'sweetalert2';

const urlBase = 'http://localhost:8080/nom';

export const getRoles = async () => {
    try {
        const url = `${urlBase}/rol`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export const getRol = async (id) => {
    try {
        const url = `${urlBase}/rol/${id}`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export const postRoles = async (nombre, bono = 0) => {
    let data = JSON.stringify({
        "nombre": nombre,
        "bono": bono
    });
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:8080/nom/rol',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };


    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.data,
                showConfirmButton: false,
                timer: 1500
              });
            return response; 
        }
      } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
          console.log('Error desconocido');
        }
        
      }

      
    // return axios.request(config); // Agrega 'return' aquí
}

export const putRoles = async (id, nombre, bono = 0) => {
    let data = JSON.stringify({
        "id": id,
        "nombre": nombre,
        "bono": bono
    });
      
    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${urlBase}/rol`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
      
    return axios.request(config); // Agrega 'return' aquí
}


export const getEmp = async () => {
    try {
        const url = `${urlBase}/empleado`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export const getEmpEdit = async (id) => {
    try {
        const url = `${urlBase}/empleado/${id}`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export const getNoEmp = async (noEmpleado) => {
    try {
        const url = `${urlBase}/empleado/num/${noEmpleado}`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export const getIdEmp = async (idEmp) => {
    try {
        const url = `${urlBase}/empleado/${idEmp}`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export const postEmp = async (nombre, apellido, no_empleado, rol_id) => {
    let data = JSON.stringify({
        "nombre": nombre,
        "apellido": apellido,
        "no_empleado": no_empleado,
        "rol_id": rol_id,

    });
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${urlBase}/empleado`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };


    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.data,
                showConfirmButton: false,
                timer: 1500
              });
            return response; 
        }
      } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
          console.log('Error desconocido');
        }
        
      }

      
}

export const putEmp = async (id, nombre, apellido, no_empleado, rol_id) => {
    let data = JSON.stringify({
        "id": id,
        "nombre": nombre,
        "apellido": apellido,
        "no_empleado": no_empleado,
        "rol_id": rol_id,

    });
      
    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${urlBase}/empleado`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };


    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.data,
                showConfirmButton: false,
                timer: 1500
              });
            return response; 
        }
      } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
          console.log('Error desconocido');
        }
        
      }

      
}


export const getMovtos = async () => {
    try {
        const url = `${urlBase}/movimiento`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export const getMovto = async (id) => {
    try {
        const url = `${urlBase}/movimiento/mov/${id}`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}


export const getMovtosMes = async (movMonth) => {
    try {
        const url = `${urlBase}/movimiento/${movMonth}`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}

export const postMovto = async (no_empleado, mes, entregas, numFaltas) => {
    let data = JSON.stringify({
        "num_empleado": no_empleado,
        "month": mes,
        "num_entregas": entregas,
        "num_faltas": numFaltas

    });
      
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${urlBase}/movimiento`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };


    try {
        const response = await axios.request(config);
        if (response.status === 200) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.data,
                showConfirmButton: false,
                timer: 1500
              });
            return response; 
        }
      } catch (error) {
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
          console.log('Error desconocido');
        }
        
      }

      
}