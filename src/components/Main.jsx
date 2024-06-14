import styled from 'styled-components';
import TodoTemplate from './TodoTemplate';
import Calendar from './Calendar';

const MainStyle = styled.div`
    height: 100vh;
    display: flex;
    padding-top: 45px;
`;

export default function Main(){
    return(
        <MainStyle> 
            <Calendar/>
            <TodoTemplate/>
        </MainStyle>
    )
}