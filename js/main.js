/* Tablero de parqués: resaltar a un integrante y marcar el avance de lectura */
(() => {
  const raiz = document.documentElement;
  const NOMBRES = { matias: "Matías", rafael: "Rafael", simon: "Simón", tomas: "Tomás" };
  const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Elegir una ficha ---------- */
  const botones = [...document.querySelectorAll("button[data-ficha]")];
  const aviso = document.querySelector("[data-aviso]");

  function elegir(ficha, { anunciar = true, guardar = true } = {}) {
    const elegida = ficha in NOMBRES && raiz.dataset.ficha !== ficha ? ficha : null;

    if (elegida) raiz.dataset.ficha = elegida;
    else delete raiz.dataset.ficha;

    for (const boton of botones) {
      if (boton.dataset.ficha in NOMBRES) {
        boton.setAttribute("aria-pressed", String(boton.dataset.ficha === elegida));
      }
    }

    if (guardar) {
      try {
        if (elegida) localStorage.setItem("ficha", elegida);
        else localStorage.removeItem("ficha");
      } catch (error) {
        /* Sin almacenamiento: la elección vale solo para esta visita */
      }
    }

    if (anunciar && aviso) {
      aviso.textContent = elegida
        ? `Resaltando a ${NOMBRES[elegida]} en toda la página.`
        : "Los cuatro integrantes se muestran por igual.";
    }
  }

  for (const boton of botones) {
    boton.addEventListener("click", () => elegir(boton.dataset.ficha));
  }

  try {
    const guardada = localStorage.getItem("ficha");
    if (guardada in NOMBRES) elegir(guardada, { anunciar: false, guardar: false });
  } catch (error) {
    /* Sin almacenamiento: se empieza sin ficha elegida */
  }

  /* ---------- Avance de lectura ---------- */
  const mini = document.querySelector("[data-mini]");
  const lector = document.querySelector("[data-lector]");
  const portada = document.getElementById("inicio");
  const secciones = [...document.querySelectorAll("[data-casilla]")];
  let actual = null;

  function casillaActual() {
    const linea = window.innerHeight * 0.35;
    let indice = -1;

    secciones.forEach((seccion, i) => {
      if (seccion.getBoundingClientRect().top <= linea) indice = i;
    });

    const alFinal =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    return alFinal ? secciones.length - 1 : indice;
  }

  function moverLector(saltar) {
    if (!mini || !lector) return;

    const seccion = secciones[Math.max(actual, 0)];
    const destino = seccion && mini.querySelector(`[data-destino="${seccion.id}"]`);
    if (!destino) return;

    const caja = mini.getBoundingClientRect();
    const casilla = destino.getBoundingClientRect();
    const x = casilla.right - caja.left - lector.offsetWidth * 0.8;
    const y = casilla.top - caja.top - lector.offsetHeight * 0.3;

    lector.style.setProperty("--x", `${x}px`);
    lector.style.setProperty("--y", `${y}px`);

    if (saltar && !movimientoReducido.matches) {
      lector.classList.remove("salta");
      void lector.offsetWidth;
      lector.classList.add("salta");
    }
  }

  function medir() {
    if (portada) {
      raiz.dataset.mini = portada.getBoundingClientRect().bottom < 80 ? "on" : "off";
    }

    const indice = casillaActual();
    if (indice === actual) return;

    const habiaCasilla = actual !== null;
    actual = indice;

    secciones.forEach((seccion, i) => {
      for (const enlace of document.querySelectorAll(`[data-destino="${seccion.id}"]`)) {
        enlace.toggleAttribute("data-leida", i < indice);
        if (i === indice) enlace.setAttribute("aria-current", "location");
        else enlace.removeAttribute("aria-current");
      }
    });

    moverLector(habiaCasilla && indice >= 0);
  }

  let pendiente = false;
  function alDesplazar() {
    if (pendiente) return;
    pendiente = true;
    window.requestAnimationFrame(() => {
      pendiente = false;
      medir();
    });
  }

  if (lector) {
    lector.addEventListener("animationend", () => lector.classList.remove("salta"));
  }

  window.addEventListener("scroll", alDesplazar, { passive: true });
  window.addEventListener("resize", () => {
    medir();
    moverLector(false);
  });

  medir();
  moverLector(false);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => moverLector(false));
  }
})();
