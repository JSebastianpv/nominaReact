

export const formateaMoneda = (valor) => {
    return '$' + parseFloat(valor).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export const soloNumeros = (valor) => {
    const numeros = /^[0-9]*$/;
    if (numeros.test(valor)) {
        return true;
    } else {
        return false;
    }
}

export const cerrarModal = () => {
    document.querySelector('.btn-close').click();
}

export const obtenerMesActual = () => {
    const currentDate = new Date();
    const mesActual = currentDate.getMonth() + 1;
    return mesActual;
}

export const obtenerNombreMes = (numeroMes) => {
    const fecha = new Date(null, numeroMes - 1);
    const nombreMes = fecha.toLocaleString('default', { month: 'long' });
    return nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);
}