import styles from '../Signin/Signin.module.css'
import Header from "../../components/Header/Header";
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import axiosInstance from 'utils/axiosInstance';

function Signin () {
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [rePassword,setRePassword] = useState('');
  const [emailChek,setEmailChek] = useState(false);
  const [isEmail,setIsEmail] = useState(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement> ) => {
      const newValue = event.target.value;
      setInputValue(newValue);

      if (newValue.length > maxLength) {
          alert('인증번호는 6자리입니다');
      }
  };

  const maxLength = 6;

  const handleSubmit = (event: FormEvent) => {
      event.preventDefault();

      if (inputValue.trim() === "") { 
        alert("인증번호를 입력하세요");
      }
  }
  
  const emailSub = () => {
    if(!email) return alert('이메일을 써주세요');

    if(isEmail){
      axios('/api/email/checkEmail',{
        baseURL: 'http://localhost:3001',
        method: "POST",
        data: {
          email: email,
          chk: inputValue
        }
      }).then((res)=>{
        alert(res.data.message);
        setEmailChek(true);
      }).catch((err)=>{
        alert(err.response.data.message);
      })
    }else{
      axios('/api/email/sendEmail',{
        baseURL: 'http://localhost:3001',
        method: "POST",
        data: {
          email:email
        }
      }).then((res)=>{
        alert(res.data.message);
        if(res.data.success){
          setIsEmail(true);
        }
      }).catch((err)=>{
        alert(err.response.data.message);
      })
    }
  }

  const auth = () => {
    if (!id) alert('닉네임을 입력해주세요');
        if (!email) alert('이메일을 입력해주세요');
        if (!password) alert('비밀번호를 입력해주세요');
        if (!name) alert('이름을 입력해주세요');
        if(!emailChek)alert('이메일 인증을 해주세요');
    axios('/api/auth/register',{
      baseURL: 'http://localhost:3001',
      method: "POST",
      data: {
        isEmailAuth: emailChek,
        id,
        pw: password,
        type: 'stu',
        name,
        email
      }
    }
    ).then((res)=>{
      if(res.data.success){
        alert(res.data.message);
        window.location.href = '/login';
      }
    }).catch((err)=>{
      alert(err.response.data.message);
    })
  }
  return (
    <div>
      <div className={styles.signIn_section}>
                <div className={styles.signIn_box}>
                    <h3>회원가입</h3>
                        <div className={styles.form}>
                            <div className={styles.forms}>
                                <input type="text" placeholder="성명" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                <input type="text" placeholder="아이디" value={id} onChange={(e)=>{setId(e.target.value)}}/>
                                <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="비밀번호" />
                                <input type="password" value={rePassword} onChange={(e)=>{setRePassword(e.target.value)}} placeholder="비밀번호를 다시 입력해주세요" />
                               
                                {
                                  isEmail ?
                                  <div className={styles.formCon}>
                                    <input type="text"
                                    placeholder="인증번호"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    maxLength={maxLength} 
                                    className={styles.inputType}
                                    />
                                    <button onClick={emailSub} className={styles.formBtn} disabled={emailChek}>인증하기</button>
                                  </div>
                                  :
                                  <div className={styles.formCon}> 
                                  <input type="email" value={email} className={styles.inputType}
                                  onChange={(e)=>{setEmail(e.target.value)}} placeholder="이메일" />
                                  <button onClick={emailSub} className={styles.formBtn} >인증하기</button>
                                  </div>
                                }

                                <button type="submit" id={styles.sub_btn} onClick={auth}>회원가입</button>
                            </div>
                        </div>
                </div>
            </div>
    </div>
  );
}

export default Signin;