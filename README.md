# Hablar o morir · Trabajo final de Comunicaciones · Ficha 3406211

«Hablar o morir» es el blog del equipo: la página web del trabajo final de la
competencia «Desarrollar procesos de comunicación eficaces y efectivos, teniendo en
cuenta situaciones de orden social, personal y productivo», del Tecnólogo en Análisis y Desarrollo de Software (SENA, Centro de
Servicios y Gestión Empresarial, Regional Antioquia).

Los seis puntos que pide la actividad son las casillas de un tablero de parqués en
plastilina, y cada integrante es una ficha: al elegirla se resalta su casa, sus
evidencias y su reflexión en toda la página.

El nombre del blog resume la idea: en un equipo, lo que no se dice a tiempo se
convierte en problema.

- **Integrantes:** José Matías Agudelo Bolívar, Rafael David Gaviria, Simón Cardona Hincapie y Tomás Cardona Hincapie.
- **Instructora:** Kenia Nayiver López Ramírez.
- **Fecha de entrega:** 24 de septiembre de 2026.

## Qué hay aquí

```
index.html          la página
css/estilos.css     el diseño: barro, tablero, fichas y adaptación a celular
js/main.js          elegir una ficha y marcar el avance de lectura
fuentes/            Bagel Fat One y Figtree (SIL Open Font License 1.1)
favicon.svg
```

Es un sitio estático: HTML, CSS y JavaScript, sin framework ni compilación.

## Ver la página

Se puede abrir `index.html` directamente, pero para que las tipografías carguen bien
conviene servir la carpeta:

```bash
python -m http.server 8741
```

Luego, abrir <http://localhost:8741>.

## Publicar con GitHub Pages

En **Settings → Pages**, elegir «Deploy from a branch», rama `main` y carpeta `/ (root)`.
El enlace queda en <https://matias2421.github.io/Comunicaciones/>.
