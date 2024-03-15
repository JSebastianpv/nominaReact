import { Route, Routes } from "react-router-dom"
import { Inicio } from "../views/Inicio"; 
import { RolesView } from "../Roles/views/RolesView";
import { EmpleadosView } from "../Empleados/views/EmpleadosView";
import { MovimientosView } from "../Movimientos/views/MovimientosView";
import { NavBar } from "../components/NavBar";

    
export const AppRouter = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/roles" element={<RolesView />} />
                <Route path="/empleados" element={<EmpleadosView />} />
                <Route path="/movimientos" element={<MovimientosView />} />
            </Routes>
        </>
    )
}


