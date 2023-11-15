import React from 'react';
import styles from 'components/Main/Main.module.css'
import LetterIco from 'img/letter-svgrepo-com (1).svg'
import BoxIco from 'img/box-svgrepo-com.svg'
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.section}>
        <section>
          <div className={styles.letter_container}>
            <div className={styles.letter}>
              <img src={LetterIco} onClick={() => navigate('/Write')}/>
              <div className={styles.letter_name}>
                마음의
                <br />
                편지쓰기
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className={styles.store_container}>
            <div className={styles.store}>
              <img src={BoxIco} onClick={() => navigate('/Store/1')}/>
              <div className={styles.store_name}>
                마음 <br />
                보관함
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Main;