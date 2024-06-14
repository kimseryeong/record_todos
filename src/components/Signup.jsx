import { supabase } from '../lib/supabase';

import React, { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

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


export default function Signup () {
    //signup modal
    const [signupOpen, setSignupOpen] = useState(false);
    const signupClick = () => setSignupOpen(true);
    const closeSignup = () => setSignupOpen(false);

    //signup form submit
    const { register, handleSubmit, formState: {errors}, getValues } = useForm();
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

    return (
        <>
            <button onClick={signupClick}>{}</button>

            <Modal
                isOpen={signupOpen}
                onRequestClose={closeSignup}
                style={modalStyle}
            >
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <div className='signin-wrap'>
                    <h1>{}</h1>

                    <div className='input-wrap wrap'>
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
                        {errors.email && <span className='err'>{ errors.email.message }</span>}
                        
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
                        {errors.password && <span className='err'>{ errors.password.message }</span>}
                        
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
                        {errors.passwordCheck && <span className='err'>{ errors.passwordCheck.message }</span>}
                    </div>
                    <div className='btn-wrap wrap'>
                        <button className='btns' onClick={closeSignup}>cancel</button>
                        <button className='btns backColor' type='submit'>{  }</button>
                    </div>
                </div>
            </form>
            </Modal>
        </>
    );
}