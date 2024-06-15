import { supabase } from '../lib/supabase';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { FaUser } from 'react-icons/fa'
import { GrSecure } from 'react-icons/gr'
import styled from 'styled-components';

const modalStyle = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,width: '400px'
        ,height: '400px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
        ,zIndex: 99999
    }
}

const LoginStyle = styled.div`
`;

const LineStyle = styled.div`
    color: #a0a0a0;
    font-size: 16px;
    display: flex;
    flex-basis: 100%;
    align-items: center;
    margin: 20px 0;

    &:after, &:before {
        content: "";
        flex-grow: 1;
        height: 1px;
        line-height: 0;
        margin: 0 16px;
        background-color: #a0a0a0;
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 20px;

    input{
        width: 100%;
        height: 45px;
        margin: 5px;
        padding-left: 10px;
        font-size: 18px;
        border: 1px solid #ddd;
    }
`;

const InputWrap = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonStyle = styled.div`
    display: flex;
    margin-left: auto;
    justify-content: center;
    
    button {
        width: 80px;
        height: 35px;
        font-size: 18px;
        background-color: white;
        border: 2px solid #ddd;
        border-radius: 5px;
        margin: 5px;
    }
    button:hover{
        box-shadow: 1px 1px 1px #ddd;
        cursor: pointer;
    }

    .backColor{
        background-color: #EAF2F8;
    }
`;

const GoogleBtn = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    width: 90%;
    height: 45px;
    margin: 5px;
    padding-left: var(--size);
    font-size: 18px;
    border: 1px solid #1976D2;

    img{
        width: 20px;
        height: 20px;
        margin: 5px;
    }

    &:hover{
        box-shadow: 1px 1px 1px #1976D2;
        cursor: pointer;
    }
`;

const ErrorStyle = styled.span`
    color: red;
    padding-left: 33px;
    text-align: left;
    font-size: 12px;
`;


export default function Login ({children}) {
    //login modal 
    const [loginOpen, setLoginOpen] = useState(false);
    const loginClick = () => setLoginOpen(true);
    const closeLogin = () => {
        reset();
        setLoginOpen(false);
    }

    //login form submit
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    const onSubmit = async (inputs) => {

        const {data, error} = await supabase.auth.signInWithPassword({
            email: inputs.email,
            password: inputs.password,
        })

        if(error){
            if(error.status === 400){
                alert('로그인 정보가 올바르지 않습니다.')
            }
            else{
                alert('문제가 발생하였습니다. 다시 시도하십시오.');
            }
        }
    }

    //google login
    const onGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            }
        })
    
        if(error){
            return;
        }
    }


    return (
        <LoginStyle>
            <button onClick={loginClick}>{children}</button>

            <Modal
                isOpen={loginOpen}
                onRequestClose={closeLogin}
                style={modalStyle}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{children}</h1>
                <InputContainer>
                    <InputWrap>
                        
                        <span className='icon'><FaUser size='25'/></span>
                        
                        <input 
                            className='input_row' 
                            type='text' 
                            name='email' 
                            placeholder='email'
                            {...register('email', {
                                required: 'email은 필수입니다.'
                                , pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                            ,message: '이메일 형식을 확인하세요.'}
                            })}
                        />
                    </InputWrap>
                    {errors.email && <ErrorStyle>{ errors.email.message }</ErrorStyle>}
                    
                    <InputWrap>
                        <span className='icon'><GrSecure size='25'/></span>
                        <input 
                            className='input_row' 
                            type='password' 
                            name='password' 
                            placeholder='password'
                            {...register('password', {
                                required: '비밀번호는 필수입니다.'
                            })}
                        />
                    </InputWrap>
                    {errors.password && <ErrorStyle>{ errors.password.message }</ErrorStyle>}
                </InputContainer>
                <ButtonStyle>
                    <button onClick={closeLogin}>cancel</button>
                    <button className='backColor' type='submit'>{ children }</button>
                </ButtonStyle>
            </form>

            <LineStyle>or</LineStyle>     
                    
            <GoogleBtn onClick={onGoogleLogin}>
                <img src='https://img.icons8.com/?size=100&id=17949&format=png&color=000000' alt='google logo'/>
                구글 계정으로 로그인
            </GoogleBtn>
            </Modal>
        </LoginStyle>
    );
}