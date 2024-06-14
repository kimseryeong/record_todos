import styled from 'styled-components';
import { FullCalendarStyle } from './FullcalendarStyle';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';



const CalendarStyle = styled.div`
    height: 100%;
    width: 60%;
    padding: 5px;
`;

export default function Calendar(){
    const renderTodo = (date) => {console.log(date)}
    return(
        <CalendarStyle>
            <FullCalendarStyle>
                <FullCalendar 
                    plugins={[dayGridPlugin, interaction, bootstrap5Plugin ]}
                    initialView='dayGridMonth'
                    viewHeight={300}
                    themeSystem='bootstrap5'
                    headerToolbar={{
                        start: 'prev today next',
                        center: '',
                        end: 'title'
                    }}
                    buttonIcons={{
                        prev: 'chevron-left',
                        next: 'chevron-right'
                    }}
                    dateClick={(arg) => renderTodo(arg.date)}
                    eventClick={(info) => console.log('클릭',info.event._def)} //이벤트 클릭
                    />

            </FullCalendarStyle>
        </CalendarStyle>
    )
}