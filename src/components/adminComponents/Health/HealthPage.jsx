import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import { Dropdown } from 'primereact/dropdown';
const apiEndpoint = import.meta.env.VITE_SERVER_URL;
const API_BASE_URL = `${apiEndpoint}/get_chatresponse`;

function HealthPage () {

    //----------------- Setup ---------------------------

    const toast = useRef(null);
    const activityOptions = [
        { nombre: 'Sedentario', option: 'sedentario' },
        { nombre: 'Moderado', option: 'moderado' },
        { nombre: 'Activo', option: 'activo' },
        { nombre: 'Muy activo', option: 'muy activo' },
    ]
    const fitnessGoals = [
        { nombre: 'Mantener el peso actual', option: 'mantener el peso actual' },
        { nombre: 'Perder peso', option: 'perder peso' },
        { nombre: 'Ganar músculo', option: 'ganar músculo' },
    ]
    const dietaryPreferences = [
        { nombre: 'Vegetariana', option: 'dieta vegetariana' },
        { nombre: 'Vegana', option: 'dieta vegana' },
        { nombre: 'Ninguna', option: 'ninguna restricción' },
    ]

    //----------------- Estados --------------------------

    const [isLoading, setIsLoading] = useState(false); 
    const [age, setAge] = useState(null);
    const [weight, setWeight] = useState(null);
    const [activityLevel, setActivityLevel] = useState(null);
    const [goal, setGoal] = useState(null);
    const [dietary, setDietary] = useState(null);
    const [respuesta, setRespuesta] = useState(null);

    // Load response from session storage when the component mounts
    useEffect(() => {
        const storedResponse = sessionStorage.getItem('response');
        if (storedResponse) {
            setRespuesta(storedResponse);
        }
    }, []);

    // Save response to session storage whenever it changes
    useEffect(() => {
        if (respuesta) {
            sessionStorage.setItem('response', respuesta);
        }
    }, [respuesta]);

    //------------------------- Funciones del componente --------------------

    const optionTemplate = (option) => {
        return (
            <div className="dropdown-item-container">
                <span>{option.nombre}</span>
            </div>
        );
    }; // EDITABLE: template para mostrar las opciones de un dropdown
   
    const selectedValueTemplate = (option, props) => {
        if (option) {
            return (
                <div className="dropdown-item-container">
                    <span>{option.nombre}</span>
                </div>
            );
        }
   
        return <span>{props.placeholder}</span>;
    }; //EDITABLE: template para mostrar el valor seleccionado de un dropdown

    function formatResponse(text) {
        const meals = text.split(/(Desayuno:|Almuerzo:|Merienda:|Cena:|Snack antes de dormir \(opcional\):|Cantidad recomendada de proteína:)/);
    
        return meals.map((meal, index) => {
            if (/Desayuno:|Almuerzo:|Merienda:|Cena:|Snack antes de dormir \(opcional\):|Cantidad recomendada de proteína:/.test(meal)) {
                return <div style={{fontSize: '16px'}} key={index}><strong>{meal}</strong></div>;
            } else {
                return <div style={{marginBottom: '10px'}} key={index}>{meal}</div>;
            }
        });
    }

    const handlePrompt = async (e) => {
        e.preventDefault();
    
        if (!age || !weight || !activityLevel || !goal || !dietary) {
            toast.current.show({
                severity: 'warn',
                summary: 'Alerta',
                detail: 'Llena todos los campos',
                life: 3000,
            });
            return;
        }
    
        setIsLoading(true);
    
        // const prompt = `Por favor, dame el menú completo de un día que debería consumir un hombre con un peso de ${weight} kg, una edad de ${age} años, cuyo nivel de actividad diaria es ${activityLevel.option} y su objetivo es ${goal.option}. La persona tiene restricciones: ${dietary.option}. Después del menú, por favor incluye la cantidad de proteína que esta persona debería comer en un día de acuerdo a sus datos.`;
    
        const prompt = `Por favor, crea un menú completo para un día en formato de lista, destinado a un hombre con un peso de ${weight} kg y una edad de ${age} años. Su nivel de actividad diaria es ${activityLevel.option} y su objetivo es ${goal.option}. La persona tiene las siguientes restricciones alimenticias: ${dietary.option}. Incluye las siguientes comidas:
                        - Desayuno:
                        - Almuerzo:
                        - Merienda:
                        - Cena:
                        - Snack antes de dormir (opcional):
                        Además, indica la cantidad recomendada de proteína que esta persona debería consumir en un día, considerando sus datos.`;


        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setRespuesta(data.response);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un problema al obtener la respuesta',
                life: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };


    return(
        <div style={{gridTemplateColumns: '5% 40% 55%'}} className="loginpage gradient-background">
            <Toast ref={toast} />
            <div className="loginpage__message"> 
                <h2>Ingresa tus datos</h2>
                <p>Con tus datos podremos proporcionarte una receta para el día de hoy:</p>
                <div style={{fontSize: '14px', color: 'white', display: 'flex', flexDirection:'column', gap: '2px', maxHeight: '70vh', overflowY: 'auto'}}>{respuesta ? formatResponse(respuesta) : ''}</div>
            </div>
            <div className="loginpage__form">
                <div className="form">
                    {(isLoading)  &&
                        <div className="spinnercontainer">
                            <div className="spinnercontainer__spinner" />
                        </div>
                    }
                    <h2>Ingresa tus datos</h2>
                    <div className="form__fields">
                        <label>Edad <span>*</span></label>
                        <input 
                            id="edad"
                            type="number" 
                            onChange={(e) => setAge(e.target.value)} 
                            value={age || ''}
                            placeholder='Edad'
                            required
                            maxLength="10"
                        />
                        <label>Peso (kg) <span>*</span></label>
                        <input 
                            id="peso"
                            type="number" 
                            onChange={(e) => setWeight(e.target.value)} 
                            value={weight || ''}
                            placeholder='Peso'
                            required
                            maxLength="10"
                        />
                        <hr></hr>
                        <label>Nivel de actividad <span>*</span></label>
                        <div className="form__fields-dropdown">
                            <Dropdown
                                value={activityLevel}
                                onChange={(e) => setActivityLevel(e.value)}
                                options={activityOptions}
                                optionLabel="nombre"
                                placeholder="¿Qué tan activo eres?"
                                filter
                                virtualScrollerOptions={{ itemSize: 38 }}
                                valueTemplate={selectedValueTemplate}
                                itemTemplate={optionTemplate}
                                style={{width:'100%'}}
                            />
                        </div>
                        <label>Objetivo<span>*</span></label>
                        <div className="form__fields-dropdown">
                            <Dropdown
                                value={goal}
                                onChange={(e) => setGoal(e.value)}
                                options={fitnessGoals}
                                optionLabel="nombre"
                                placeholder="¿Cuál es tu objetivo?"
                                filter
                                virtualScrollerOptions={{ itemSize: 38 }}
                                valueTemplate={selectedValueTemplate}
                                itemTemplate={optionTemplate}
                                style={{width:'100%'}}
                            />
                        </div>
                        <label>Observaciones<span>*</span></label>
                        <div className="form__fields-dropdown">
                            <Dropdown
                                value={dietary}
                                onChange={(e) => setDietary(e.value)}
                                options={dietaryPreferences}    
                                optionLabel="nombre"
                                placeholder="¿Tienes alguna restricción alimenticia?"
                                filter
                                virtualScrollerOptions={{ itemSize: 38 }}
                                valueTemplate={selectedValueTemplate}
                                itemTemplate={optionTemplate}
                                style={{width:'100%'}}
                            />
                        </div>
                        <button onClick={handlePrompt} className="button--action">
                            Generar receta
                        </button>
                    </div>
                </div>
            </div>    
        </div>
    );
}

export default HealthPage;