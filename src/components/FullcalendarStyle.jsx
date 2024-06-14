import styled from 'styled-components';

export const FullCalendarStyle = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;

    
    .fc {
        width: 100%;
        font-size: 12px;
    }


    //date text css
    .fc .fc-toolbar-title {
        font-family: 'pretendard';
        font-weight: 700;
    }

    
    //button css ------------------------------
    .btn-primary,
    .btn-primary.disabled, 
    .btn-primary:disabled {
        background-color: #fff;
        border: none;
        color: black;
        font-weight: 600;
    }
    
    .btn-primary:hover{
        background-color: #EAF2F8;
    }
    .fc-prev-button,
    .fc-next-button{
        width: 40px;
        border-radius: 50%
    }
    .fc-direction-ltr .fc-toolbar > * > :not(:first-child) {
        margin-left: 5px;
    }

    //button css ------------------------------
`;