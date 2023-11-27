import styles from './Store.module.css'
import Header from "../../components/Header/Header";
import { useEffect, useState } from 'react';
import { constants } from 'buffer';
import axios from 'axios'
import axiosInstance from 'utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
interface Store {
  uuid: string
  title: string
  content: string
  isShow: boolean,
  createdAt: string;
}
function Store () {
  const {id} = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState<Store[]>([{
    uuid: "hongjea",
    title: "hongjea",
    content: "hongjea",
    isShow: true,
    createdAt: "2023-11-11T07:18:08.996Z"
  }]);
  const [page, setPage] = useState<number>(1)
  
  useEffect(()=>{
    axiosInstance(`/api/board/get/list?page=${id}`,{
      method: "GET",
    }).then((res)=>{
      if(res.data.success){
        setList(res.data.list);
        setPage(res.data.length);
      }
    }).catch((err)=>{
      window.location.href = "/login";
    })
  },[id])

  const handleOnClickPage = (pageNum:number) => {
    navigate(`/Store/${pageNum}`)
  }
  return (
    <div>
      <div>
        <div className={styles.store_container}>
          {list.map((it, index) => { 
            const createdAt = new Date(it.createdAt)
           
            return (
            <>
              <div className={styles.store_box}> 
              <div className={styles.store_title} key={index} style={{cursor: 'pointer'}} onClick={()=>{navigate(`/detail/${it.uuid}`)}}>{it.title}</div>
              <div className={styles.store_create_date}>{createdAt.getFullYear()}-{createdAt.getMonth() + 1}-{createdAt.getDate()}</div>
              </div>
            </>
           )
           })
          }
        </div>
        <div className={styles.pagenation}>
          {[...Array(page)].map((it, index) => {
            return (
              <button onClick={()=>{handleOnClickPage(index+1)}}>{index+1}</button>
            )
          })
          }
        </div>
      </div>
    </div>
  );
}

export default Store;