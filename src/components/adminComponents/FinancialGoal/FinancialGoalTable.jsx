import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { ProgressBar } from 'primereact/progressbar';


import { useFinancialGoals } from '../../../services/useFinancialGoals';

function FinancialGoalTable() {

    const usuario = useSelector(state => state.user.user);

    // --------------- Setup (Servicios, Contextos, Referencias) -----------------------------------

    const toast = useRef(null);
    const { data, error, isLoading, isValidating, refresh } = useFinancialGoals(usuario.userId); // EDITABLE

    // --------------- Estados ---------------------------------------------------------------------

    const [filters, setFilters] = useState(null);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // Objeto seleccionado: EDITABLE

    // --------------- Funciones necesarias para persistencia ----------------------------------------

    useEffect(() => {
        initFilters();
    }, []); 

    // --------------- Funciones especificas del componente ------------------------------------------
    
    useEffect(() => {
        if (error) {
            toast.current.show({
                severity: 'info',
                summary: 'Aviso',
                detail: 'Hubo un problema con el servidor, intenta más tarde',
                life: 3000,
            });
        }
    }, [error]); // Genera el toast con el error: GENERAL
    const refreshData = () => {
        setIsRefreshing(true);
        refresh();
    }; // Refresca los datos: GENERAL
    useEffect(() => {
        if (isRefreshing) {
            setIsRefreshing(false);
        }
    }, [isValidating]); // Cambia el estado de refreshing: GENERAL
    const clearFilter = () => {
        initFilters();
    }; // Función para limpiar todos los filtros: GENERAL
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }; // Función para el filtro global: GENERAL
    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            description: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            due_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            saved_amount: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            target_amount: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
        }); // EDITABLE
        setGlobalFilterValue('');
    }; // Función para restaurar e inicializar los filtros: ESPECIFICO
    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <div className="table-utility">
                    <span className="search-input-container">
                        <i className="pi pi-search search-input-icon" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                        <InputText className="search-input" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar" />
                    </span>
                    <Button className="rounded-icon-btn" onClick={refreshData}>
                        <i className="pi pi-refresh" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                    </Button>
                    <Button onClick={clearFilter} className="rounded-icon-btn" type="button" rounded>
                        <i className="pi pi-filter-slash" style={{ fontSize: '0.8rem', margin: '0' }}></i>
                    </Button>
                </div>
            </div>
        );
    }; // Contiene el header de la tabla: GENERAL
    const filterClearTemplate = (options) => {
        return <Button id="cancel" className="rounded-icon-btn" type="button" onClick={options.filterClearCallback}>
            <i className="pi pi-times" style={{ fontSize: '0.8rem', margin: '0' }}></i>
        </Button>;
    }; // Formato del botón para cancelar filtros: GENERAL
    const filterApplyTemplate = (options) => {
        return <Button className="rounded-icon-btn" type="button" onClick={options.filterApplyCallback}>
            <i className="pi pi-check" style={{ fontSize: '0.8rem', margin: '0' }}></i>
        </Button>;
    }; // Formato del botón para confirmar filtros: GENERAL
    const header = renderHeader(); // Renderizar el header: GENERAL
    const columnsData = [
        {
            nombrevar: "name",
            header: "Nombre",
            filterPlaceholder: "Buscar por nombre",
        },
        {
            nombrevar: "description",
            header: "Descripción",
            filterPlaceholder: "Buscar por descripción",
        },
        {
            nombrevar: "saved_amount",
            header: "Saved amount",
            filterPlaceholder: "Buscar por saved amount",
        },
        {
            nombrevar: "target_amount",
            header: "Target amount",
            filterPlaceholder: "Buscar por target amount",
        },
        {
            nombrevar: "due_date",
            header: "Due date",
            filterPlaceholder: "Buscar por fecha",
        }
    ]; 

    const progressBodyTemplate = (rowData) => {
        const progress = (rowData.saved_amount / rowData.target_amount) * 100;
        return <ProgressBar value={progress}></ProgressBar>;
      };      

    return (
        <div className="table">
            <Toast ref={toast} />
            {(isLoading || (isRefreshing && isValidating)) &&
                <div className="spinnercontainer">
                    <div className="spinnercontainer__spinner" />
                </div>
            }
            {error &&
                <div className="stale-data-msg">
                    <i className="pi pi-exclamation-circle" style={{ fontSize: '0.8rem', margin: '0', color: 'white' }}></i>
                    <span><strong>Los datos pueden estar desactualizados</strong> | intenta recargar la tabla</span>
                </div>}
            <DataTable
                value={data} // EDITABLE
                removableSort
                paginator
                scrollable
                scrollHeight="60vh"
                showGridlines
                rows={25}
                rowsPerPageOptions={[5, 10, 25]}
                size="small"
                dataKey="goal_id" // EDITABLE
                filters={filters}
                globalFilterFields={['name', 'description', 'saved_amount', 'target_amount', 'due_date']} // EDITABLE
                header={header}
                emptyMessage="No se encontraron objetivos financieros, intenta ingresar a GFinance" // EDITABLE
                selectionMode="single"
                metaKeySelection={false}
            >
                {columnsData.map((column, index) => (
                    <Column
                        key={index}
                        field={column.nombrevar}
                        header={column.header}
                        sortable
                        filter
                        filterField={column.nombrevar}
                        filterPlaceholder={column.filterPlaceholder}
                        filterClear={filterClearTemplate}
                        filterApply={filterApplyTemplate}
                    />
                ))}
                <Column
                    body={progressBodyTemplate}
                    header='Progress'
                />
            </DataTable>
        </div>
    );
}

export default FinancialGoalTable;