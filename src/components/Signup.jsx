import { supabase } from '../lib/supabase';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const modalStyle = {
    overlay: {backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1000}
    ,content: {
        textAlign: 'center'
        ,width: '400px'
        ,height: '360px'
        ,margin: 'auto'
        ,borderRadius: '10px'
        ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
        ,padding: '20px'
    }
}

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

const ErrorStyle = styled.span`
    color: red;
    padding-left: 10px;
    text-align: left;
    font-size: 12px;
`;

export default function Signup ({children}) {

    //signup modal
    const [signupOpen, setSignupOpen] = useState(false);
    const signupClick = () => setSignupOpen(true);
    const closeSignup = () => {
        reset();
        setSignupOpen(false);
    }

    //signup form submit
    const { register, handleSubmit, formState: {errors}, getValues, reset } = useForm();
    const onSubmit = async (inputs) => {
        
        //supabase email signup
        const {data, error} = await supabase.auth.signUp({
            email: inputs.email,
            password: inputs.password,
            options: {data: {password: inputs.password}}
        })

        if(error) console.log(error);
        alert('회원가입 되었습니다.');
    }


    // const reset = () => {
    //     setFormData({email: '', password: '', passwordCheck: ''});
    // }

    return (
        <>
            <button onClick={signupClick}>{children}</button>

            <Modal
                isOpen={signupOpen}
                onRequestClose={closeSignup}
                style={modalStyle}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className='signin-wrap'>
                    <h1>{children}</h1>

                    <InputContainer>
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
                        {errors.email && <ErrorStyle>{ errors.email.message }</ErrorStyle>}
                        
                        <input 
                            className='input_row' 
                            type='password' 
                            name='password' 
                            placeholder='password'
                            {...register('password', {
                                required: '비밀번호는 필수입니다.'
                                ,minLength: {value: 6, message: '6자리 이상의 비밀번호를 입력하세요.'}
                                ,maxLength: {value: 20, message: '20자 이내의 비밀번호를 입력하세요.'}
                            })}
                        />
                        {errors.password && <ErrorStyle>{ errors.password.message }</ErrorStyle>}
                        
                        <input 
                            className='input_row' 
                            type='password' 
                            name='passwordCheck' 
                            placeholder='correct your password'
                            {...register('passwordCheck', {
                                required: '비밀번호는 필수입니다.'
                                ,minLength: {value: 6, message: '6자리 이상의 비밀번호를 입력하세요.'}
                                ,maxLength: {value: 20, message: '20자 이내의 비밀번호를 입력하세요.'}
                                ,validate: {checkPassword: (val) => {
                                    const { password } = getValues();
                                    return password === val || '비밀번호가 일치하지 않습니다.'
                                }}
                            })}
                        />
                        {errors.passwordCheck && <ErrorStyle>{ errors.passwordCheck.message }</ErrorStyle>}
                    </InputContainer>
                    <ButtonStyle>
                        <button onClick={closeSignup}>cancel</button>
                        <button className='backColor' type='submit'>{ children }</button>
                    </ButtonStyle>
                </div>
            </form>
            </Modal>
        </>
    );
}