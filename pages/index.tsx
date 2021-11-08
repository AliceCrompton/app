import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import client from "../lib/sanity";

const Home: NextPage = ({ data }: any) => {
  const { siteHeaderData, homepageData } = data;

  console.log(siteHeaderData, homepageData);

  return (
    <div className={styles.container}>
      <Head>
        <title>{siteHeaderData.title}</title>
        <meta name="description" content="Sanity CMS Testing Data App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{homepageData.title}</h1>
        <h2>{homepageData.subTitle}</h2>
        <img src={homepageData.image.url} alt="" />
        <p>{homepageData.customString}</p>
        <a href={homepageData.ctaUrl.current}>CTA</a>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

// Create a query called siteHeaderQuery
const siteHeaderQuery = `*\[_type == "siteheader"\][0] {
  title,
  repoURL {
    current
  }
}`;

// Create a query called homepageQuery
const homepageQuery = `*\[_type == "homepage"\][0] {
  title,
  subtitle,
  customString,
  conditionalField,
  "ctaUrl": cta {
    current
        },
  image {
    ...asset->
  }
}`;

export async function getStaticProps() {
  const homepageData = await client.fetch(homepageQuery);
  const siteHeaderData = await client.fetch(siteHeaderQuery);

  const data = { homepageData, siteHeaderData };

  return {
    props: {
      data,
    },
    revalidate: 1,
  };
}
