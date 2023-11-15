import React, { useEffect, useState } from 'react';
import styles from './DetailPage.module.css'    
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from 'utils/axiosInstance';

function DetailPage() {
  const {id} = useParams();
  const navigate = useNavigate();

  const [list,setList] = useState<any>();

  useEffect(()=>{
    axiosInstance(`/api/board/get/infor?uuid=${id}`,{
      method: "GET",
    }).then((res)=>{
      if(res.data.success){
        setList(res.data.infor);
      }
    })
  },[])
  return (
    <>
      <div className={styles.Writes}>
            <div className={styles.Write_container}>
                <div className={styles.title}>
                    <span>제목</span>
                    <input type="text" value={list?.title} readOnly className={styles.write_title} />
                    <div>
                    </div>
                    </div>
                    <div className={styles.detail}>
                    <span>내용</span>
                    <textarea value={list?.content} readOnly className={styles.write_detail}  />
                    </div>
                <div className='submit'>
                    <input type="submit" value={"확인"} onClick={()=>{navigate(-1)}} className={styles.submit}/>
                </div>
            </div>
      </div>
    </>
  );
}

export default DetailPage;