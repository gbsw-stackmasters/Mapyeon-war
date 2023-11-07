import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'components/Main/Main.module.css'
import LetterIco from 'img/letter-svgrepo-com (1).svg'
import BoxIco from 'img/box-svgrepo-com.svg'
import Header from "../Header/Header";

function Main() {
  return (
    <>
      <Header/>
      <div className={styles.section}>
        <section>
        <Link to={'/Write'}>
          <div className={styles.letter_container}>
            <div className={styles.letter}>
              <img src={LetterIco} />
              <div className={styles.letter_name}>
                마음의
                <br />
                편지쓰기
              </div>
            </div>
          </div>
          </Link>
        </section>
        <section>
          <div className={styles.store_container}>
            <div className={styles.store}>
              <img src={BoxIco} />
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