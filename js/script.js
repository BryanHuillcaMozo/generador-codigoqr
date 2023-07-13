const form = document.getElementById('generar-form');
const qr = document.getElementById('qrcode');

// Boton enviar
const GenerarEnviar = (e) => {
  e.preventDefault();

  LimpiarUI();

  const url = document.getElementById('url').value;
  const tamanio = document.getElementById('tamanio').value;

  // Validar link
  if (url === '') {
    alert('Por favor ingrese un link');
  } else {
    MostrarSpinner();
    // Mostrar la rotacion por 1 segundo
    setTimeout(() => {
      OcultarSpinner();
      GenerarQR(url, tamanio);

      // Generar el botón Guardar una vez que la imagen del código qr esté lista
      setTimeout(() => {
        // obtener el link
        const GuardarLink = qr.querySelector('img').src;
        // boton guardar
        crearGuardarBtn(GuardarLink);
      }, 50);
    }, 1000);
  }
};

// Generar el codigo QR
const GenerarQR = (url, tamanio) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: tamanio,
    height: tamanio,
  });
};

// Borrar codigo QR y botOn Guardar
const LimpiarUI = () => {
  qr.innerHTML = '';
  const GuardaBtn1 = document.getElementById('guardar-link');
  if (GuardaBtn1) {
    GuardaBtn1.remove();
  }
};

// mostrar la rotacion
const MostrarSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// ocultar la rotacion
const OcultarSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

// Crear un botón Guardar para descargar el código QR como imagen
const crearGuardarBtn = (GuardarLink) => {
  const link = document.createElement('a');
  link.id = 'guardar-link';
  link.classList =
    'bg-teal-500 hover:bg-black text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = GuardarLink;
  link.download = 'qrcode';
  link.innerHTML = 'Descargar Codigo QR';
  document.getElementById('generated').appendChild(link);
};

OcultarSpinner();

form.addEventListener('submit', GenerarEnviar);

