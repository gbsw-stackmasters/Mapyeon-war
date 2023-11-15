import styles from './Login.module.css'
import Header from "../../components/Header/Header";
import {useState} from 'react';
import axios from 'axios';
import { setCookie } from 'utils/cookies';

function Login() {
  const [id,setId] = useState('');
  const [pw,setPw] = useState('');

  const login = () => {
    if(!id) alert('아이디를 입력해주세요');
    if(!pw) alert('비밀번호를 입력해주세요');

    axios('/api/auth/login',{
      baseURL: 'http://localhost:3001',
      method: "POST",
      data: {
        id,
        pw
      }
    }
    ).then((res)=>{
      if(res.data.success){
        setCookie('successLogin',res.data.token,{ path: "/" })
        alert(res.data.message);
        window.location.href = '/'
      }
    }).catch((err)=>{
      alert(err.response.data.message);
    })
  }
  return(
    <div>
      <div className={styles.login_section}>
                <div className={styles.login_box}>
                    <h3>로그인</h3>
                        <div className={styles.form_area}>
                            <div>
                                <input type="text" value={id} onChange={(e)=>{setId(e.target.value)}} placeholder="아이디" id={styles.input_box} />
                                <input type="password" value={pw} onChange={(e)=>{setPw(e.target.value)}} placeholder="비밀번호" id={styles.input_box} />
                                <button type="submit" id={styles.sub_btn} onClick={login}>확인</button>
                            </div>
                        </div>
                </div>
            </div>
    </div>
  );
}

export default Login;