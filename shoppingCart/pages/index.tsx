import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [dataHigh, setDataHigh] = useState([]);
  const [dataLow, setDataLow] = useState([]);
  const [total, setTotal] = useState();
  const [show, setShow] = useState(false);
 
  const getData = () => {
    fetch('./json/dataHigh.json').then((response) => {
      response.json().then((data) => {
        setDataHigh(data)
      });
    }).catch((err) => {
      console.error('Erro', err);
    });
  }

  useEffect(()=>{
    getData()
  },[])

  const getDataLow = () => {
    fetch('./json/dataLow.json').then((response) => {
      response.json().then((data) => {
        setDataLow(data)
      });
    }).catch((err) => {
      console.error('Erro', err);
    });
  }

  useEffect(()=>{
    getDataLow()
  },[])

  useEffect(()=>{
    handleAddition()
    handleShow()
  })

  const handleAddition = () => {
    const i = dataHigh?.itemMetadata?.items.map(x => parseInt(x.seller)).reduce((a, b) => a + b, 0);
    const x = dataLow?.itemMetadata?.items.map(x => parseInt(x.seller)).reduce((a, b) => a + b, 0);
    const total = i + x;
    setTotal(total)
}

const handleShow = () => {
  if (total > 10){
    return setShow(true)
  }
  else{
    return setShow(false)
  }
}
  return (
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta name="test" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;800&display=swap" rel="stylesheet"/>
      </Head>
      <main>
        <div className={styles.container}>
          <div className={styles.container_itens}>
            <div className={styles.container_itens_header}>
              <p className={styles.header_text}>Meu Carrinho</p>
            </div>   
            <div className={styles.container_itens_body}>
            {dataHigh?.itemMetadata?.items?.map((item) => (
              <div key={item?.id} className={styles.container_items_list}>
                <div className={styles.image_container}><img width="100%" src={item?.imageUrl}/></div>
                <div className={styles.container_items_name}>    
                <div className={styles.items_title}>{item?.name.toLowerCase()}</div>
                <div className={styles.items_subtitle}>{parseInt(item?.seller).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                <div className={styles.items_text} >{parseInt(item?.seller).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                </div>
              </div>
            ))}

            {dataLow?.itemMetadata?.items?.map((item) => (
              <div key={item?.id} className={styles.container_items_list}>
                <div className={styles.image_container}><img width="100%" src={item?.imageUrl}/></div>
                <div className={styles.container_items_name}>  
                <div className={styles.items_title}>{item?.name.toLowerCase()}</div>
                <div className={styles.items_subtitle}>{parseInt(item?.seller).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                <div className={styles.items_text}>{parseInt(item?.seller).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                </div>
              </div>
            ))}
            </div>
          <div className={styles.container_total_items}>
                <div className={styles.container_total}>
                    <div className={styles.total_text}>Total</div>
                    <div className={styles.total_text}>{total?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                  </div>
                {show && (<div className={styles.container_frete}><p className={styles.container_frete_p}>Parabéns, sua compra tem frete grátis !</p></div>)}
          </div>
            <div className={styles.container_button}>
                <button className={styles.button}><p className={styles.container_button_p}>Finalizar compra </p></button>
            </div>

          </div>  
        </div>
      </main>      
    </>
  )
}
export default Home
