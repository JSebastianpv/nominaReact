import axios from 'axios';
import Swal from 'sweetalert2';


export const getRoles = async () => {
    try {
        const url = `http://localhost:8080/nom/rol`;
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

export const postRoles = async (nombre) => {
    let data = JSON.stringify({
        "nombre": nombre
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
      
    return axios.request(config); // Agrega 'return' aquí
}


export const getEmp = async () => {
    try {
        const url = `http://localhost:8080/nom/empleado`;
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
        url: 'http://localhost:8080/nom/empleado',
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
        const url = `http://localhost:8080/nom/movimiento`;
        const resp = await axios.get(url);
        if (resp.status == 200 ) {
            console.log(resp.data)
            return resp.data;
        } else {
            console.error('Error en la solicitud:', response.status);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}