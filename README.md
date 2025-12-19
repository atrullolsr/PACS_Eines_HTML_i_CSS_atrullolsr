# Viatges pel món

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Netlify](https://img.shields.io/badge/deploy-netlify-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## Descripció

Aquest projecte és un lloc web temàtic sobre **viatges pel món**, creat com a part de la PAC del mòdul de desenvolupament web. La web és **responsive**, accessible segons les pautes WCAG 2.0 AA, i mostra contingut organitzat amb pàgines de portada, categories, detalls i enllaços a fonts.

El projecte ha estat desenvolupat **des de zero**, sense utilitzar frameworks de CSS ni JavaScript. La interactivitat està implementada amb **JavaScript pur**, i s’ha utilitzat **Glider.js** per al carrusel d’imatges.

La web està publicada amb desplegament continu a **Netlify**:  
🌐 [Enllaç a la web](https://viatgespelmon.netlify.app)

---

## Estructura del projecte

/src
index.html # Pàgina principal
categoria.html # Pàgina de categoria
det1.html
det2.html
det3.html
det4.html
/scss
    style.scss # SCSS principal
/js
    main.js # JavaScript principal
/package.json # Configuració de projectes i scripts Parcel
.gitignore # Fitxers ignorats pel repositori
/dist # Fitxers generats en producció

---

## Tecnologies utilitzades

- **HTML5**: Estructura semàntica i accessibilitat.  
- **SCSS**: Preprocesador CSS per organitzar millor els estils amb variables, nestings i mixins.  
- **JavaScript ES6+**: Funcionalitats interactives.  
- **Glider.js**: Carrusel responsive.  
- **Parcel**: Bundler modern per gestionar compilació i dependències.  
- **Babel**: Suport a navegadors antics.  
- **Git/GitHub**: Control de versions i col·laboració.  
- **Netlify**: Desplegament continu i hosting públic.

---

## Instal·lació i desenvolupament local

1. Clonar el repositori:

```bash
git clone https://github.com/atrullolsr/PACS_Eines_HTML_i_CSS_atrullolsr.git
cd projecte-web

Instal·lar dependències:

npm install

Executar Parcel en mode desenvolupament:

npm run dev

Obrir la web a http://localhost:1234.

Generar la versió de producció:
npm run build
Els fitxers finals es generaran a la carpeta /dist.

Desplegament a Netlify

Connectar el repositori a Netlify.

Configurar build command: npm run build.

Configurar carpeta de publicació: /dist.

La web és accessible públicament amb la URL indicada més amunt.

Cada commit genera automàticament la nova versió en línia.

Accessibilitat
La web compleix les pautes WCAG 2.0 AA, amb:

Alternatives textuals per a totes les imatges (alt).

Contrast adequat de colors.

Enllaços descriptius i navegables amb teclat.

Declaració d’idioma (<html lang="ca">).

Enllaços de “saltar navegació” per a usuaris de teclat.

Dependències externes
Glider.js: Carrusel responsive.

Parcel: Bundler i gestor de compilació.

Sass: Compilació SCSS → CSS.

Babel: Transpilació de JavaScript modern per navegadors antics.

Estructura de commits
S’han fet commits regulars amb missatges descriptius per documentar el procés de desenvolupament:
git add .
git commit -m "Missatge descriptiu"
Llicència i atribucions
El contingut original del projecte és propietat de l’autor.

Les imatges i vídeos utilitzats estan allotjats al repositori i compleixen els drets d’autor.

S’ha fet constar qualsevol ús de contingut extern a la pàgina /links.

Llicència: MIT

Contacte
Autor: Albert Trullols Roselló
Correu electrònic: atrullolsr@uoc.edu
Repositori: GitHub
