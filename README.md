# Структура файлів

## HTML
```
/
├── src/
    └── pages/
        └── name.astro
```

## CSS
```
/
├── src/
    └── styles/
        └── name.css
```

## Images
```
/
├── public/
    └── img/
        └── name.format
```

# Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

# Docs

<a href="https://docs.astro.build/en/getting-started/">Docs</a>

# Example

```Astro
---
import Layout from "../layouts/layout.astro"    <- Підключення шаблону сайту
import '../styles/wholesale.css'                <- Підключення css
---

<Layout title="Оптовим покупцям">               <- title сторінки
	<h1>Оптовим покупцям</h1>                   <- В цьому блоці ви пишете те що буде в <main>
</Layout>
```
