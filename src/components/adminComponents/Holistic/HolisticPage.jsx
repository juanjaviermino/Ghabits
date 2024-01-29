import React, { useEffect, useState, useRef } from 'react';
import HolisticTable from './HolisticTable';

function HolisticPage () {

    return(
        <section className="adminpage gradient-background-2">
            <div className="adminpage__header"> 
                <h3>Notificaciones (G Notifications)</h3>
            </div>
            <div className="adminpage__table--users">
                <HolisticTable />
            </div>
        </section>
    );
}

export default HolisticPage;