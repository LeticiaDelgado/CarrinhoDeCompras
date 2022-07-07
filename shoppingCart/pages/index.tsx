import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  const [data, setData] = useState([]);
  const [dataTwo, setDataTwo] = useState([]);

  const getData = () => {
    fetch('./json/data.json').then((response) => {
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

  const getDataTwo = () => {
    fetch('./json/datatwo.json').then((response) => {
      response.json().then((data) => {
        setDataTwo(data)
      });
    }).catch((err) => {
      console.error('Erro', err);
    });
  }

  useEffect(()=>{
    getDataTwo()
  },[])



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
                <div>R${item?.seller}</div>
                <div>R${item?.seller}</div>
                </div>
              </div>
            ))}

            {dataTwo?.itemMetadata?.items?.map((item) => (
              <div key={item?.id} className={styles.container_items_list}>
                <div className={styles.image_container}><img width="100%" src={item?.imageUrl}/></div>
                <div className={styles.container_items_name}>
                
                <div>{item?.name}</div>
                <div>R${item?.seller}</div>
                <div>R${item?.seller}</div>
                </div>
              </div>
            ))}
            </div>


          <div className={styles.container_total_items}>
                <div className={styles.container_total}>
                <div>Total</div>
                <div>R$</div>

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
