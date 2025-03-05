// Obtiene el elemento canvas del DOM
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");  

// Función para actualizar el tamaño del canvas cuando la ventana cambie de tamaño
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}    

canvas.style.background = "linear-gradient(to right,rgb(171, 148, 255),rgb(225, 148, 255))";

// Escuchar eventos de cambio de tamaño de la ventana
window.addEventListener("resize", resizeCanvas);

// Inicializar el tamaño del canvas
resizeCanvas();

// Función para obtener una posición inicial aleatoria que no esté en los bordes
function getRandomPosition(radius, limit) {
  return Math.random() * (limit - 2 * radius) + radius;
}

// Definición de la clase Circle
class Circle {
  constructor(x, y, radius, color, speed) {
    this.posX = x; // Posición en el eje X
    this.posY = y; // Posición en el eje Y
    this.radius = radius; // Radio del círculo
    this.color = color; // Color del círculo
    this.speed = speed; // Velocidad del círculo

    // Dirección inicial del movimiento
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;

    // Contador del 1 al 10
    this.counter = 1;

    // Variable para detener el movimiento
    this.stopped = false;
  }

  // Método para dibujar el círculo en el canvas
  draw(context) {
    context.beginPath(); // Inicia el trazado
    context.strokeStyle = this.color; // Establece el color del contorno
    context.textAlign = "center"; // Alineación del texto al centro
    context.textBaseline = "middle"; // Alineación del texto en el medio
    context.font = "20px Arial"; // Establece la fuente del texto
    context.fillText(this.counter, this.posX, this.posY); // Dibuja el número en el centro del círculo

    context.lineWidth = 2; // Define el grosor del contorno
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false); // Dibuja el círculo
    context.stroke(); // Aplica el trazo al círculo
    context.closePath(); // Finaliza el trazado
  }

  // Método para actualizar la posición del círculo y redibujarlo
  update(context) {
    this.draw(context);

    // Si el contador llega a 10, se detiene
    if (this.stopped) return;

    // Verifica si el círculo choca con los bordes y cambia la dirección
    if (this.posX + this.radius > canvas.width || this.posX - this.radius < 0) {
      this.dx = -this.dx;
      this.incrementCounter();
    }
    if (this.posY + this.radius > canvas.height || this.posY - this.radius < 0) {
      this.dy = -this.dy;
      this.incrementCounter();
    }

    // Actualiza la posición del círculo si aún no ha llegado a 10
    this.posX += this.dx;
    this.posY += this.dy;
  }

  // Método para incrementar el contador y detener el círculo cuando llegue a 10
  incrementCounter() {
    if (this.counter < 10) {
      this.counter++;
    } else {
      this.stopped = true; // Detener el movimiento
    }
  }
}

// Función para crear círculos con posiciones iniciales aleatorias
function createCircles() {
  let randomRadius1 = Math.floor(Math.random() * 50 + 30); // Radio aleatorio para el primer círculo
  let randomRadius2 = Math.floor(Math.random() * 50 + 30); // Radio aleatorio para el segundo círculo

  let circle1 = new Circle(
    getRandomPosition(randomRadius1, canvas.width), // Posición X aleatoria para el primer círculo
    getRandomPosition(randomRadius1, canvas.height), // Posición Y aleatoria para el primer círculo
    randomRadius1, "blue", 3 // Configuración del primer círculo
  );

  let circle2 = new Circle(
    getRandomPosition(randomRadius2, canvas.width), // Posición X aleatoria para el segundo círculo
    getRandomPosition(randomRadius2, canvas.height), // Posición Y aleatoria para el segundo círculo
    randomRadius2, "purple", 4 // Configuración del segundo círculo
  );

  return [circle1, circle2]; // Retorna un array con los dos círculos
}

// Crear los círculos inicialmente
let [miCirculo, miCirculo2] = createCircles();

// Función que actualiza continuamente la posición de los círculos
function updateCircle() {
  requestAnimationFrame(updateCircle); // Solicita la siguiente animación de cuadro
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada actualización
  miCirculo.update(ctx); // Actualiza y redibuja el primer círculo
  miCirculo2.update(ctx); // Actualiza y redibuja el segundo círculo
}

// Inicia la animación
updateCircle();