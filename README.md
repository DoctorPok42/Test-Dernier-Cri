<div align="center">
  <img src="https://raw.githubusercontent.com/DoctorPok42/Test-Dernier-Cri/main/public/favicon.ico">
</div>

# Test-Dernier-Cri [![CodeFactor](https://www.codefactor.io/repository/github/doctorpok42/test-dernier-cri/badge)](https://www.codefactor.io/repository/github/doctorpok42/test-dernier-cri)

Petite application qui vous permet d'interroger une API afin de récupérer (ici des posts / articles) pour les afficher sur un site.

(Si vous rencontrez un problème avec ce repo, ouvrez une issue et je vous aiderez.)

(Pensez à changer votre fichier config.js pour y mettre votre `recherche / query`, `APIKEY` et votre langue `lang`

## Lancement

Tout d'abord assurez vous bien que vous avez téléchargé l'entièreté du projet !

Ensuite ouvrez un terminal à la racine du projet et commencer par installer les dépendances
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

Dans le fichier `pages/index.js` on fait une requête API à ce site [newsapi](https://newsapi.org/) pour récupérer des `articles`.
```Js
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

```
On va ensuite faire un
```Js
{articles.articles.map((articles) => ( ... ))}
```
Pour charger tous les articles et pouvoir ainsi les afficher sur notre page d'accueil.

<hr />

## Fichiers Important
```Js
pages/index.js // La page d'accueil
config.js // le fichier contenant le nom de la recherche, l'APIKEY et la langue
styles/globale.scss // Le scss
```

## Sources

NextJs : [nextjs.org](https://nextjs.org/)

API : [newsapi](https://newsapi.org/)

<hr />

[ - DoctorPok ]
