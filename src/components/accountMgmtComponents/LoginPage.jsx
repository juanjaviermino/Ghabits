import React, { useRef} from "react";
import { Toast } from 'primereact/toast';
import LoginButton from "./LoginButton";

function LoginPage() {

    // --------------- Setup (Servicios, Contextos, Referencias) -----------------------------------
    const toast = useRef(null);
    // --------------- Estados -----------------------------------

    return(
        <div className="loginpage gradient-background">
            <Toast ref={toast} />
            <div className="loginpage__message"> 
                <h2>Aquí comienza tu camino</h2>
                <p>Ingresa con tu cuenta de <strong>GOOGLE</strong> para acceder a todos los beneficios de <strong>G Habits</strong></p>
            </div>
            <div className="loginpage__form">
                <div className="form">
                    <h2>Inicia sesión con tu cuenta de Google</h2>
                    <div className="form__fields">
                        <div className="button--action">
                            <LoginButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;