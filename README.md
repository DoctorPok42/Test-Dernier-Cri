<div align="center">
  <img src="https://raw.githubusercontent.com/DoctorPok42/Test-Dernier-Cri/main/public/favicon.ico">
</div>

# Test-Dernier-Cri

## Lancement

Tout d'abord regardez bien que vous avez téléchargé l'entièreté du projet !

Ensuite ouvrez un terminal à la racine du projet et commencer par installer les dépendance
```
npm i
```

Enfin vous pouvez lancer l'application en faisant :
```
npm run dev
```

Puis pour voir le résultat vous pouvez vous rendre dans votre navigateur et tapez : [http://localhost:3000/](http://localhost:3000/)

<hr />

## Détails

Dans le fichier `pages/index.js` on fait une requête API à ce site [jsonplaceholder](http://jsonplaceholder.typicode.com/) pour récupérer des `posts` avec une limite de 10.
```Js
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

```
On va ensuite faire un
```Js
{posts.map((post) => ( ... ))}
```
Pour charger tous les posts et pouvoir ainsi faire un
```Js
<h2>{post.title}</h2>
```
(pour afficher le titre de chaque articles / posts)

<br /><br/>

Une fois cela fait on va crée une page `pages/articles/[id].js` qui va nous permettre d'afficher chaque posts sur sa propre page.

Pour ce faire on va d'abord crée une function `getStaticProps` qui va récupérer le contenue de l'article qui correspond à l'id demandé (grâce à la donnée `params`)
```Js
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
```
Ensuite on doit indiqué à Nextjs que c'est une page static
```Js
export async function getStaticPaths() {
  const posts = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_limit=10`
  ).then((r) => r.json());
  return {
    paths: posts.map((post) => ({
      params: { id: post.id.toString() },
    })),
    fallback: false,
  };
}
```
Enfin pour que tout fonctionne corretement il faut mettre un lien sur la page d'accueil qui mène vers l'article demandé (entourer le titre d'un lien)
```Js
<Link href={`/articles/${post.id}`}>
  <a>
    <h3>{post.title}</h3>
  </a>
</Link>
```

Et pour finir, pour qu'on est une bonne navigation on rajoute un bouton qui redirige vers la page `pages/index.js`

<hr />

## Fichiers Important
```Js
pages/index.js // La page d'accueil
pages/articles/[id].js // La page pour chaque article
styles/globale.css // Le css
```

## Sources

NextJs : [nextjs.org](https://nextjs.org/)

API : [jsonplaceholder](http://jsonplaceholder.typicode.com/)
