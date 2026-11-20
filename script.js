// 1. Cambiar de sección con los botones del menú
const botonesNav = document.querySelectorAll(".btn-nav");
const secciones = document.querySelectorAll(".seccion");

botonesNav.forEach((boton) => {
  boton.addEventListener("click", () => {
    const objetivo = boton.dataset.seccion;

    botonesNav.forEach((b) => b.classList.remove("activo"));
    boton.classList.add("activo");

    secciones.forEach((sec) => {
      sec.classList.toggle("activa", sec.id === objetivo);
    });
  });
});

// 2. Abrir ventana con el mensaje de cada botón + explosión de corazones + desbloqueo de carta extra
const botonesMensaje = document.querySelectorAll(".btn-mensaje");
const modal = document.getElementById("modal-mensaje");
const modalTitulo = document.getElementById("modal-titulo");
const modalTexto = document.getElementById("modal-texto");
const cerrarModal = document.getElementById("cerrar-modal");
const explosionContenedor = document.getElementById("explosion-corazones");
const progresoNotas = document.getElementById("progreso-notas");
const bloqueCartaSecreta = document.getElementById("bloque-carta-secreta");
const btnAbrirCartaSecreta = document.getElementById("btn-abrir-carta-secreta");
const cartaSecretaAbierta = document.getElementById("carta-secreta-abierta");

const notasAbiertasSet = new Set();

function lanzarExplosionCorazones() {
  const totalCorazones = 36;
  const iconos = ["♥", "❤", "💕"];

  for (let i = 0; i < totalCorazones; i++) {
    const corazon = document.createElement("span");
    corazon.className = "corazon-explosion";
    corazon.textContent = iconos[i % iconos.length];

    const angulo = (Math.PI * 2 * i) / totalCorazones + (Math.random() * 0.25 - 0.125);
    const distancia = Math.random() * 240 + 110;
    const ex = `${Math.cos(angulo) * distancia}px`;
    const ey = `${Math.sin(angulo) * distancia}px`;
    const rot = `${Math.floor(Math.random() * 70 - 35)}deg`;
    const tamano = `${Math.floor(Math.random() * 14 + 18)}px`;

    corazon.style.setProperty("--ex", ex);
    corazon.style.setProperty("--ey", ey);
    corazon.style.setProperty("--erot", rot);
    corazon.style.fontSize = tamano;

    explosionContenedor.appendChild(corazon);

    setTimeout(() => {
      corazon.remove();
    }, 1350);
  }
}

function actualizarProgresoNotas() {
  const total = botonesMensaje.length;
  const abiertas = notasAbiertasSet.size;
  progresoNotas.textContent = `Notas abiertas: ${abiertas} / ${total}`;

  if (abiertas === total) {
    bloqueCartaSecreta.classList.remove("oculto");
  }
}

botonesMensaje.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modalTitulo.textContent = btn.dataset.titulo;
    modalTexto.textContent = btn.dataset.texto;
    modal.classList.remove("oculto");

    btn.classList.add("abierta");
    notasAbiertasSet.add(index);
    actualizarProgresoNotas();
    lanzarExplosionCorazones();
  });
});

btnAbrirCartaSecreta.addEventListener("click", () => {
  cartaSecretaAbierta.classList.remove("oculto");
  lanzarExplosionCorazones();
  cartaSecretaAbierta.scrollIntoView({ behavior: "smooth", block: "center" });
});

cerrarModal.addEventListener("click", () => {
  modal.classList.add("oculto");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("oculto");
  }
});

// 3. Corazón que palpita y saca tarjetas animadas con frases bonitas
const frasesLatido = [
  "Me fascina cómo eres",
  "Eres mi lugar favorito",
  "Cada día te quiero más",
  "Tu sonrisa me alegra todo",
  "Gracias por estar en mi vida",
  "Siempre pienso en ti, Nicole"
];

const zonaTarjetasLatido = document.getElementById("zona-tarjetas-latido");
const corazonLatiente = document.getElementById("corazon-latiente");
const seccionLatidos = document.getElementById("latidos");

const direccionesTarjeta = [
  { dx: "-210px", dy: "-115px" },
  { dx: "210px", dy: "-115px" },
  { dx: "-220px", dy: "105px" },
  { dx: "220px", dy: "105px" },
  { dx: "0px", dy: "-155px" },
  { dx: "0px", dy: "155px" }
];

let indiceDireccion = 0;

function lanzarTarjetaLatido() {
  if (!seccionLatidos.classList.contains("activa")) return;

  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta-latido";
  tarjeta.textContent = frasesLatido[Math.floor(Math.random() * frasesLatido.length)];

  const dir = direccionesTarjeta[indiceDireccion % direccionesTarjeta.length];
  indiceDireccion++;

  tarjeta.style.setProperty("--dx", dir.dx);
  tarjeta.style.setProperty("--dy", dir.dy);

  zonaTarjetasLatido.appendChild(tarjeta);

  setTimeout(() => {
    tarjeta.remove();
  }, 3400);
}

corazonLatiente.addEventListener("click", lanzarTarjetaLatido);
setInterval(lanzarTarjetaLatido, 1600);

// 4. Fondo animado con frases bonitas y corazones flotantes
const frasesFondo = [
  "Me encanta tu sonrisa",
  "Siempre pienso en ti",
  "Eres muy especial",
  "Qué bonito coincidir contigo",
  "Me haces muy feliz",
  "Un detalle para Nicole"
];

const simbolosCorazon = ["♥", "❤"];
const contenedorFondo = document.getElementById("fondo-frases");

function crearFraseAnimada() {
  const span = document.createElement("span");
  span.className = "frase-flotante";
  span.textContent = frasesFondo[Math.floor(Math.random() * frasesFondo.length)];

  const top = Math.random() * 88 + 4;
  const left = Math.random() * 72 + 5;
  span.style.top = `${top}%`;
  span.style.left = `${left}%`;

  contenedorFondo.appendChild(span);

  setTimeout(() => {
    span.remove();
  }, 7000);
}

function crearCorazonFlotante() {
  const corazon = document.createElement("span");
  corazon.className = "corazon-flotante";
  corazon.textContent =
    simbolosCorazon[Math.floor(Math.random() * simbolosCorazon.length)];

  const top = Math.random() * 88 + 4;
  const left = Math.random() * 88 + 4;
  const tamano = Math.random() * 14 + 16;

  corazon.style.top = `${top}%`;
  corazon.style.left = `${left}%`;
  corazon.style.fontSize = `${tamano}px`;

  contenedorFondo.appendChild(corazon);

  setTimeout(() => {
    corazon.remove();
  }, 7500);
}

setInterval(crearFraseAnimada, 1500);
setInterval(crearCorazonFlotante, 1200);
crearFraseAnimada();
crearCorazonFlotante();

// 5. Corazón grande hecho de "Te amo" con "Nicole" en medio
const contenedorCorazon = document.getElementById("corazon-palabras");

function generarCorazonDePalabras() {
  const totalPuntos = 120;
  const ancho = contenedorCorazon.clientWidth || 420;
  const alto = contenedorCorazon.clientHeight || 380;
  const escala = Math.min(ancho, alto) / 36;
  const centroX = ancho / 2;
  const centroY = alto * 0.48;

  for (let i = 0; i < totalPuntos; i++) {
    const t = (Math.PI * 2 * i) / totalPuntos;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );

    const palabra = document.createElement("span");
    palabra.className = "palabra-te-amo";
    palabra.textContent = "Te amo";
    palabra.style.left = `${centroX + x * escala}px`;
    palabra.style.top = `${centroY + y * escala}px`;
    contenedorCorazon.appendChild(palabra);
  }
}

generarCorazonDePalabras();