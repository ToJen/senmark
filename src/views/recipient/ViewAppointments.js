import React, { useContext } from 'react';
import Calendar from '../../components/calander'
import { DataContext } from "../../contexts/DataContext";

export default function ViewAppointment() {
    const {state:{dates}} = useContext(DataContext);
    console.log(dates)
    return <Calendar dates={dates} onSelectEvent={event => alert(event.title)}/>
    
};