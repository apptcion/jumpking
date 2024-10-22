'use client'
import {useEffect} from 'react'
import {getCookie, setCookie } from './utils/cookie'
import styles from './css/main.module.css'

export default function Home() {

  const checkTicket = () => {
    const ticket = getCookie('ticket')
    if(ticket === undefined){
      setCookie('from','https://localhost:3000');
      console.log("토큰 없음", getCookie('ticket'))
      location.href = 'https://apptcion.site/filter';
    }
    fetch('https://apptcion.site/isValid',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        ticket:getCookie('ticket'),
      })
    }).then((response) => {
      if(response.ok) return response.json();
    }).then((data) => {
      if(!data){
        setCookie('from','/');
        location.href = '/filter';
        console.log("토큰 잘못됨", getCookie('ticket'))
      }
    })
  }

  useEffect(()=> {
    //checkTicket();
  })

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <h1 className={styles.Title}>Beyond The Sky</h1>
        <h3 className={styles.descript}>Beyond The Sky게임은&nbsp;<a href="https://store.steampowered.com/app/1061090/Jump_King/">JumpKing</a>에서 아이디어를 얻어 만든&nbsp;<div className={styles.dimi_king}>DIMI_KING</div>을 온라인으로 구현한 버전입니다.</h3>
      </div>
      <div className={styles.bottom}>
        <div className={styles.startGame}>시작하기</div>
        <a href="/download/DIMI_KING.zip" download><div className={styles.download}>DIMI_KING 다운로드</div></a>
      </div>
    </div>
  );
}