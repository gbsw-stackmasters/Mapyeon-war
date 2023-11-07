import React from 'react';
import styles from '../Write/Write.module.css'
import { useNavigate } from 'react-router-dom';

function Writepage () {
  return (
    <div className={styles.Write_container}>
      <div className={styles.title}>
        <span>제목</span>
        <input type="text" />
        <input type="button" value={"공개"} name="public_private" />
        <input type="button" value={"비공개"} name="public_private" />
      </div>
      <div className={styles.detail}></div>
    </div>
  );
}

export default Writepage;