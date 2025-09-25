import { useCallback, useEffect, useState } from "react";
// Importamos el polyfill en el index.js: si el navegador no soporta IntersectionObserver, lo define.

/**
 * Este hook observa un elemento DOM (el botón “Alquilar”) y devuelve:
    ref → lo pones en ese botón para que el hook lo observe.
    showArrowToElementToView → booleano: true solo cuando el botón ha quedado por encima del viewport (salió hacia arriba).
    goToView → función que hace scroll suave hasta el botón.

  1) options por defecto

    threshold: 0 → el callback se dispara cuando cualquier parte del elemento entra/sale del viewport.

    root: null → el viewport es la ventana del navegador (puedes pasar un contenedor si tu scroll es interno).

    rootMargin: "0px" → margen que ajusta el área de observación (útil si tienes cabecera fija).

  2) node y showArrowToElementToView

    node guarda el DOM element que vamos a observar.

    showArrowToElementToView controla si mostramos la flecha (true cuando el botón está por encima).

  3) ref — callback ref con useCallback
    Es una función que React ejecuta cuando el elemento se monta/desmonta.

    Ventaja: garantizas que el node se setee cuando exista el DOM, evitando race conditions.

    Uso: <button ref={rentingRef}>Alquilar</button> (donde rentingRef viene de useObserver().ref).

  4) goToView — el scroll
    Hace scroll suave hasta centrar el botón en pantalla.

    Puedes cambiar block: "center" por "start" si prefieres que quede en la parte superior.

  5) useEffect — crear el IntersectionObserver

    Si no hay node no hace nada.

    Crea un observer con la callback que recibe entries (aquí usamos destructuring [entry] para el primer item).

    entry.boundingClientRect.top → coordenada del top del elemento relativa al viewport.

    Si top < 0 → la parte superior del elemento está por encima (salió por arriba).

    setShowArrowToElementToView(isAboveViewport) → mostramos la flecha sólo cuando top < 0.

    observer.observe(node) → empieza a observar.

    return () => observer.disconnect() → limpia al desmontar o si cambian dependencias.


    Por qué usamos boundingClientRect.top < 0 y no sólo entry.isIntersecting?

    entry.isIntersecting indica si alguna parte del elemento está visible.

    En tu requerimiento la flecha debe salir solo cuando el botón esté por encima del viewport (es decir: el usuario ya pasó por él).

    boundingClientRect.top < 0 detecta exactamente eso: la parte superior del elemento está fuera del viewport hacia arriba.

    Es la condición correcta para “salió por arriba”.

    Ventajas frente a escuchar scroll

    IntersectionObserver es mucho más eficiente: el navegador agrupa y optimiza observaciones; evita recalcular en cada evento scroll.

    Es más preciso (no tienes que calcular manualmente getBoundingClientRect() en cada scroll).
 */
export const useObserver = (
  options = { threshold: 0, root: null, rootMargin: "0px" },
) => {
  const [node, setNode] = useState(null);
  const [showArrowToElementToView, setShowArrowToElementToView] =
    useState(false);

  // callback ref: se llama cuando el DOM node cambia
  // En React no puedes garantizar que el DOM exista en el momento en que defines el observer.
  // Cuando React renderiza el elemento, le pasa el "el" al ref.
  // Entonces guardamos ese nodo en state (node) y podemos pasárselo al observer.
  // Esto evita errores de “nodo no definido” y permite que React y el observer trabajen juntos.
  const ref = useCallback((el) => {
    setNode(el);
  }, []);

  const goToView = (e) => {
    e.preventDefault();
    node?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    if (!node) return; // no hay nodo aún

    // --- Fallback manual si no hay soporte ---
    if (!("IntersectionObserver" in window)) {
      // Polyfill lo define, pero si aún así no estuviera disponible:
      const onScroll = () => {
        const rect = node.getBoundingClientRect();
        // mismo criterio: si top < 0 → está por arriba
        setShowArrowToElementToView(rect.top < 0);
      };
      window.addEventListener("scroll", onScroll);
      // ejecutar una vez para estado inicial
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    // --- Con soporte (nativo o polyfill) ---
    /**
     * entries
      - Es un array porque un mismo observer puede vigilar varios elementos al mismo tiempo.
      - Cada entry corresponde a un elemento observado.
      - Como en tu caso solo observas uno (node), haces destructuring:

     * IntersectionObserverEntry contiene:
        target → el elemento DOM observado (node).
        isIntersecting → true si alguna parte del elemento está visible en el viewport.
        boundingClientRect → posición/tamaño del elemento.
        intersectionRect → la parte que se cruza con el viewport.
        intersectionRatio → porcentaje visible (0 a 1).
        rootBounds → rectángulo del root (normalmente el viewport).
     */
    const observer = new IntersectionObserver(([entry]) => {
      // entry.boundingClientRect.top < 0 -> salió por arriba
      // entry.isIntersecting -> true si el elemento actualmente se ve
      const isAboveViewport = entry.boundingClientRect.top < 0;
      setShowArrowToElementToView(isAboveViewport);
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, options]);

  return { ref, showArrowToElementToView, goToView };
};
