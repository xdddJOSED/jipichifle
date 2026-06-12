# 🍌 Jipichifle — Landing Page

> **Chifles artesanales de Jipijapa, Ecuador**
> Landing page moderna, interactiva y responsive para la marca de snacks Jipichifle.

---

## 🚀 Demo en Vivo

Activa GitHub Pages en el repositorio para ver la demo:
**https://xdddjosed.github.io/jipichifle/**

---

## 📸 Vista Previa

| Desktop | Móvil |
|---------|-------|
| Hero con animaciones y parallax | Menú hamburguesa responsive |
| Galería de fábrica con grid | Chatbot flotante interactivo |

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura semántica |
| **CSS3** | Grid, Flexbox, animaciones, variables CSS |
| **JavaScript** | Interacciones, chatbot, scroll reveal |
| **Google Fonts** | Tipografías Outfit y Fredoka |

> ⚠️ **No requiere frameworks ni dependencias.** Es HTML/CSS/JS puro.

---

## 📂 Estructura del Proyecto

```
jipichifle/
├── index.html          # Página principal
├── styles.css          # Todos los estilos
├── script.js           # Lógica e interacciones
├── README.md           # Este archivo
└── images/
    ├── hero-chips.png        # Imagen hero de producto
    ├── mascot.png            # Mascota / avatar del chatbot
    ├── factory-plantation.png # Paso 1: Plantación
    ├── factory-cutting.png    # Paso 2: Corte
    ├── factory-frying.png     # Paso 3: Fritura
    └── factory-packaging.png  # Paso 4: Empaquetado
```

---

## 📋 Cómo Copiar y Usar el Proyecto

### Opción 1 — Clonar con Git (recomendado)

```bash
git clone https://github.com/xdddJOSED/jipichifle.git
```

```bash
cd jipichifle
```

Luego abre el archivo `index.html` en tu navegador:

```bash
# En Windows
start index.html

# En Mac
open index.html

# En Linux
xdg-open index.html
```

### Opción 2 — Descargar ZIP

1. Ve a **https://github.com/xdddJOSED/jipichifle**
2. Haz clic en el botón verde **`<> Code`**
3. Selecciona **`Download ZIP`**
4. Descomprime el archivo
5. Abre `index.html` en tu navegador

---

## ✨ Secciones de la Página

| # | Sección | Descripción |
|---|---------|-------------|
| 1 | **Navbar** | Fija, con efecto glassmorphism al scroll. Menú hamburguesa en móvil. |
| 2 | **Hero** | Título animado, badge de origen, botones CTA, estadísticas con counter, chips flotantes con parallax. |
| 3 | **¿Por qué Jipichifle?** | 3 tarjetas de características con animación al scroll. |
| 4 | **Desde la Fábrica** | Galería CSS Grid con 4 pasos del proceso (plantación → corte → fritura → empaquetado). |
| 5 | **Nuestros Sabores** | 4 tarjetas con efecto tilt 3D: Original, Picante, Ajo & Limón, Dulce. |
| 6 | **Chatbot** | Widget flotante con respuestas automáticas, quick replies y animación de escritura. |
| 7 | **Footer** | Links de navegación, redes sociales, ubicación. |

---

## 🎨 Personalización

### Cambiar colores
Edita las variables CSS en `styles.css` (línea ~12):

```css
:root {
  --gold:          #FFC107;    /* Color principal (amarillo) */
  --blue:          #1565C0;    /* Azul oscuro */
  --blue-electric: #2979FF;    /* Azul eléctrico */
  --navy:          #0D1B2A;    /* Fondo oscuro */
}
```

### Cambiar imágenes
Reemplaza los archivos en la carpeta `images/` manteniendo los mismos nombres, o cambia las rutas en `index.html`.

### Cambiar respuestas del chatbot
Edita el objeto `botResponses` en `script.js` (línea ~100):

```javascript
const botResponses = {
  'precio':  '💰 Tu mensaje personalizado aquí...',
  'sabor':   '🌶️ Tu mensaje personalizado aquí...',
  // Agrega más keywords y respuestas
};
```

---

## 📱 Responsive

La página se adapta automáticamente a:
- 🖥️ **Desktop** (1200px+)
- 💻 **Laptop** (992px)
- 📱 **Tablet** (768px)
- 📲 **Móvil** (480px)

---

## 👥 Autores

- **José D.** — Desarrollo y diseño

---

## 📄 Licencia

Este proyecto es de uso académico / personal. Todos los derechos de la marca Jipichifle pertenecen a sus respectivos dueños.

---

> 📍 *Orgullosamente hecho en Jipijapa, Ecuador* 🇪🇨
