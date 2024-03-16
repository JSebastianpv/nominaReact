import { Route, Routes } from "react-router-dom"
import { Inicio } from "../views/Inicio"; 
import { RolesView } from "../views/RolesView";
import { EmpleadosView } from "../views/EmpleadosView";
import { MovimientosView } from "../views/MovimientosView";
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


