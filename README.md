# VoxelForge 3D — Sitio estático (demo)

**Estado:** demostración académica, sin fines comerciales.

## Estructura
```
VoxelForge3D/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── logo.svg
    ├── favicon.svg
    ├── hero.webp
    ├── portfolio-prototipos.webp
    ├── portfolio-funcionales.webp
    ├── portfolio-miniaturas.webp
    ├── equipo.webp
    ├── impresora.webp
    └── mapa.webp
```

## Uso
1. Descarga el ZIP y descomprímelo.
2. Abre `index.html` en tu navegador.

## Personalización rápida
- **Colores:** edita variables en `styles.css` (`:root` → `--primary`, `--accent`, `--bg`, `--text`).  
- **Tipografía:** cambia el enlace de Google Fonts en `<head>` (por ejemplo, `Poppins`).  
- **Logo:** reemplaza `assets/logo.svg` por el tuyo (mantén el nombre o ajusta la ruta en `index.html`).  
- **Imágenes:** sustituye los `.webp` en `assets/` por tus imágenes (mismo nombre o actualiza rutas).  
- **SEO/OG:** edita `<title>`, `meta description` y las etiquetas `og:` en `index.html`.

## Accesibilidad
- Texto alternativo en imágenes, navegación por teclado, `aria-label` en elementos interactivos, contraste AA aproximado.

## Comportamiento simulado
- Enlaces `mailto:` y `tel:` funcionales.
- Anchors internos en el menú.
- Formulario con validación HTML5 y JS, sin envío real (`preventDefault()` y `action="#"`).

## Licencia de imágenes
Las imágenes `.webp` son generadas como placeholders locales dentro de este paquete.
