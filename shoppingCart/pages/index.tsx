import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [data, setData] = useState([]);
  const [dataLow, setDataLow] = useState([]);

  const getData = () => {
    fetch('./json/dataHigh.json').then((response) => {
      response.json().then((data) => {
        setData(data)
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

  const handleAddition = () => {
    const i = data?.itemMetadata?.items.map(x => parseInt(x.seller)).reduce((a, b) => a + b, 0);
    const x = dataLow?.itemMetadata?.items.map(x => parseInt(x.seller)).reduce((a, b) => a + b, 0);
    const total = i + x;
    return total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}
  
  return (
    
    <>
      <Head>
        <title>Shopping Cart</title>
        <meta name="test" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500&display=swap" rel="stylesheet"/>
      </Head>

      <main>

        <div className={styles.container}>
          <div className={styles.container_itens}>
            <div className={styles.container_itens_header}>
              <h3>Meu Carrinho</h3>
            </div>
            
            <div className={styles.container_itens_body}>
            {data?.itemMetadata?.items?.map((item) => (
              <div key={item?.id} className={styles.container_items_list}>
                <div className={styles.image_container}><img width="100%" src={item?.imageUrl}/></div>
                <div className={styles.container_items_name}>
                
                <div>{item?.name}</div>
                <div>{parseInt(item?.seller).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                <div>{parseInt(item?.seller).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                </div>
              </div>
            ))}

            {dataLow?.itemMetadata?.items?.map((item) => (
              <div key={item?.id} className={styles.container_items_list}>
                <div className={styles.image_container}><img width="100%" src={item?.imageUrl}/></div>
                <div className={styles.container_items_name}>
                
                <div>{item?.name}</div>
                <div>{parseInt(item?.seller).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                <div>{parseInt(item?.seller).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</div>
                </div>
              </div>
            ))}
            </div>


          <div className={styles.container_total_items}>
                <div className={styles.container_total}>
                <div>Total</div>
                <div>{handleAddition()}</div>

                </div>
                <div className={styles.container_frete}><p className={styles.container_frete_p}>Parabéns, sua compra tem frete grátis !</p></div>
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
