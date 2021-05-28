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
          {posts.map((post) => (
            <li>
              <Link href={`/articles/${post.id}`}>
                <a>
                  <div class="content">
                    <h3>{post.title}</h3>
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
    "http://jsonplaceholder.typicode.com/posts?_limit=10"
  ).then((r) => r.json());
  return {
    props: {
      posts,
    },
  };
}
