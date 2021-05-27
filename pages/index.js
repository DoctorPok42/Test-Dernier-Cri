import Head from "next/head";
import Link from "next/link";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Test-Dernier-Cri</title>
      </Head>
      <main class="container">
        <ul>
          {posts &&
            posts.lenght > 0 &&
            posts.map((post) => (
              <li>
                <Link href={`/articles/${post.id}`}>
                  <a>
                    <div class="content">
                      <h3>{post.status}</h3>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await fetch(
    "https://newsapi.org/v2/everything?q=tesla&from=2021-04-27&sortBy=publishedAt&apiKey=YOURAPIKEY"
  ).then((r) => r.json());
  return {
    props: {
      posts,
    },
  };
}
