import React, { useEffect, useState, useRef } from 'react';
import FinancialGoalTable from './FinancialGoalTable'; // EDITABLE

function FinancialGoalPage () {

    return(
        <section className="adminpage gradient-background-2">
            <div className="adminpage__header"> 
                <h3>Objetivos financieros (G Finance)</h3>
            </div>
            <div className="adminpage__table--users">
                <FinancialGoalTable />
            </div>
        </section>
    );
}

export default FinancialGoalPage;