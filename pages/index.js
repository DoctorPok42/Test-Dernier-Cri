import Head from "next/head";
import Link from "next/link";
import { query, APIKEY, lang } from "../config";

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Test-Dernier-Cri</title>
      </Head>
      <main class="container">
        <div class="texte">
          <h2>
            Status : <span>{articles.status}</span>
          </h2>
          <h2>
            Sujet : <span>{query}</span>
          </h2>
          <h2>
            Langue : <span>{lang}</span>
          </h2>
          <h2>
            Résultats Total : <span>{articles.totalResults}</span>
          </h2>
        </div>
        <ul>
          {articles.articles.map((articles) => (
            <li>
              <div class="content">
                <Link href={`/articles/${articles.source.id}`}>
                  <a>
                    <img src={articles.urlToImage} alt="IMG"></img>
                  </a>
                </Link>
                <h3>{articles.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const articles = await fetch(
    `https://newsapi.org/v2/top-headlines?q=${query}&from=2021-05-29&to=2021-05-29&sortBy=popularity&apiKey=${APIKEY}&pageSize=20&language=${lang}`
  ).then((r) => r.json());
  return {
    props: {
      articles,
    },
  };
}
