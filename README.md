<div align="center">
  <img src="https://raw.githubusercontent.com/DoctorPok42/Test-Dernier-Cri/main/public/favicon.ico">
</div>

# Test-Dernier-Cri

Petite application qui vous permet d'interroger une API afin de récupérer (ici des posts / articles) pour les afficher sur un site.

(Si vous rencontrez un problème avec ce repo, ouvrez une issue et je vous aiderez.)

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

Dans le fichier `pages/index.js` on fait une requête API à ce site [newsapi](https://newsapi.org/) pour récupérer des `articles` avec une limite de 10.
```Js
export async function getStaticProps() {
  const articles = await fetch(
    `https://newsapi.org/v2/top-headlines?q=${query}&from=2021-05-29&to=2021-05-29&sortBy=popularity&apiKey=${APIKEY}&pageSize=12&language=fr`
  ).then((r) => r.json());
  return {
    props: {
      articles,
    },
  };
}

```
On va ensuite faire un
```Js
{articles.articles.map((articles) => ( ... ))}
```
Pour charger tous les articles et pouvoir ainsi les afficher sur notre page d'accueil.

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
config.js // le fichier contenant la domaine de recherche ainsi que l'APIKEY
pages/articles/[id].js // La page pour chaque article
styles/globale.scss // Le scss
```

## Sources

NextJs : [nextjs.org](https://nextjs.org/)

API : [newsapi](https://newsapi.org/)

<hr />

[ - DoctorPok ]
