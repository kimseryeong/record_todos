import { userState } from '../lib/atom';
import { supabase } from '../lib/supabase';
import Login from './Login';
import Signup from './Signup';

import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';


const HeaderStyle = styled.div`
    background: #fff;
    width: 100%;
    height: 45px;
    position: fixed;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #ddd;
    z-index: 100;
`;

const ButtonStyle = styled.div`
    display: flex;
    margin-left: auto;
    
    button {
        width: 80px;
        height: 35px;
        font-size: 18px;
        background-color: white;
        border: 2px solid #ddd;
        border-radius: 5px;
        margin: 5px;
    }
`;

export default function Header(){

    const [userInfo, setUserInfo] = useRecoilState(userState);

    //supabase user session 저장
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            if(session) {
                setUserInfo(session);
            }
            
        })
        
        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if(session) {
                setUserInfo(session);
            }
            return () => subscription.unsubscribe();
        })
    }, [userInfo])



    return(
        <HeaderStyle>
            {userInfo ? 
                <ButtonStyle>
                    <span className='userEmail backColor'>{ userInfo.user.email }</span>
                    <button>Logout</button>
                </ButtonStyle>
                :
                <ButtonStyle>
                    <Login>Login</Login>
                    <Signup>Sign Up</Signup>
                </ButtonStyle>
            }
        </HeaderStyle>
    )
}