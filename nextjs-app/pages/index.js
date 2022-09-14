import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {  gql, useQuery,useLazyQuery , HttpLink} from '@apollo/client';
import Search from './search' ;
import Test from './test';

import Link from 'next/link';



/* const link =new HttpLink({
  uri: "https://d2z3o48dntziip.cloudfront.net/cms/manage/en-US",
});

const authLink = setContext((_, { headers }) => {
  const token = 'ab5e4303f84ed5ae9ac1e85f8a8e50ec8c8b3145ba863f1a';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});
 */
const CASESTUDY =  gql`
query listCases{
  listCasestudymodels{
    data{
      image
      id
      title
      description
    }
  }
}`;

/* client.query({query: CASESTUDY})
.then((result) => console.log(result)); */

export default function Home() {

  function DisplayCaseStudy() {
    const { loading, error, data } = useQuery(CASESTUDY);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
  
    return data.listCasestudymodels.data.map(({ id, title, description, image }) => (
      <div key={id} className={styles.card}>
        <a href="https://aspirenxt.com/case-studies/">
        <picture><img className={styles.cardImg} src={image} alt="img"/></picture>
        <h2>{title}</h2>
        <p>{description}</p>

      </a>
      </div>
    ));
  }

  /* function CmsData() {
    const { loading, error, data } = useQuery(CASESTUDY);
  
    if (loading) return <p></p>;
    if (error) return <p></p>;
  
    return (data.listCasestudymodels.data.map(a => a.title));
  }
  
  const cms = CmsData()
  console.log(cms); */
  
return (

  <div className={styles.container}>
  <Head>
    <title>Case Study</title>
    <meta name="description" content="Webiny cms" />
    <link rel="icon" href="/favicon.ico" />
  </Head>

  <main  className={styles.main}>
  <a href="/create" className={styles.linkPage}>create</a>
    
    <h1 className={styles.title} style={{fontSize:'xxx-large'}}>
      Case Study
    </h1>

    <div className={styles.searchbar}>
     <Search/>
    {/* <Test/> */}
    </div>
    

    <div className={styles.grid}>
      <DisplayCaseStudy/>
    </div>

    
  </main>

  <footer className={styles.footer}>

    <p>yeet</p>
  </footer>
</div>
 )
}




