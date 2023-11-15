import styles from "components/Header/Header.module.css";
import LetterIco from "img/letter-svgrepo-com (1).svg";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import axiosInstance from "utils/axiosInstance";
import { removeCookie } from "utils/cookies";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [admin,setAdmin] = useState('');
  useEffect(()=>{
    axiosInstance('/api/auth/isLogin',{
      method: "GET"
    }).then((res)=>{
      if(res.data.success){
      setIsLogin(true);
      setAdmin(res.data.users.type);
      }
    }).catch((err)=>{
      setIsLogin(false);
      window.location.href = '/login';
    })
  },[])

  const logout = () => {
    removeCookie('successLogin');
    axios('/api/auth/logout',{
      baseURL: 'http://localhost:3001',
      method: "GET"
    }).then((res)=>{
      setIsLogin(false)
      navigate('/')
    }).catch((err)=>{
      window.location.href = '/login';
    })
  }

  const navigate = useNavigate();
  return (
    <header>
      <div className={styles.inner}>
        <div className={styles.head_container}>
          <div onClick={() => navigate("/")} className={styles.header_brand}>
            <div className={styles.head_brand}>마음의 편지</div>
            <img src={LetterIco} />
          </div>
          <div className={styles.login_signup}>
            {
              isLogin ?
              <>
              <div className={styles.login}>
              <div onClick={logout}>로그아웃</div>
              </div>
              {
                admin === 'admin' ?
                <>
                  <div className={styles.login}>
                  <div onClick={()=>{navigate('/admin/list/1')}}>어드민 조회</div>
                  </div>
                  <div className={styles.login}>
                  <div onClick={()=>{navigate('/admin/change')}}>어드민 변경</div>
                  </div>
                </>
                :
                ""
              }
              </>
              :
            <>
              <div className={styles.login}>
                <div onClick={() => navigate("/Login")}>로그인</div>
              </div>
              <div className={styles.signup}>
                <div onClick={() => navigate("/Signin")}>회원가입</div>
              </div>
            </>
            }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header