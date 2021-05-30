import Head from "next/head";
import Link from "next/link";

export default function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.id} | Test-Dernier-Cri</title>
      </Head>
      <main class="container2">
        <div class="box">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
        <Link href="/">
          <a>Revenir à l'accueil</a>
        </Link>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = await fetch(
    `http://jsonplaceholder.typicode.com/posts/${params.id}`
  ).then((r) => r.json());
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await fetch(`http://jsonplaceholder.typicode.com/posts`).then(
    (r) => r.json()
  );
  return {
    paths: posts.map((post) => ({
      params: { id: post.id.toString() },
    })),
    fallback: false,
  };
}
