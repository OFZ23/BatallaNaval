# ⚓ Batalla Naval

Juego clásico de Batalla Naval para navegador, jugador contra PC, con IA adaptativa y diseño naval inmersivo.

---

## 🎮 ¿De qué trata?

Coloca tu flota en el tablero y destruye todos los barcos enemigos antes de que hundan los tuyos. Dispones de 15 segundos por turno o el disparo se realiza automáticamente. El juego incluye 3 niveles de dificultad con una IA que aprende de sus impactos.

---

## 🚢 Características

- **Tablero 10×10** con coordenadas alfanuméricas (A–J / 1–10)
- **4 tipos de barcos**: Portaviones (5), Acorazado (4), Submarino (3), Destructor (2)
- **3 niveles de dificultad**:
  - 🟢 Fácil — disparos aleatorios
  - 🟡 Normal — IA busca celdas adyacentes al impacto
  - 🔴 Difícil — IA detecta la dirección del barco y lo remata
- **Temporizador por turno** (15 s) con disparo automático
- **Vista previa** de colocación de barcos con indicador de validez
- **Colocación automática** de barcos con un clic
- **Registro de batalla** en tiempo real
- **Modal de fin de partida** con estadísticas (precisión, turnos, disparos)
- **Tabla de mejores partidas** guardada en localStorage
- Diseño **responsive** (móvil y escritorio)

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| **React 18** | Framework principal de UI |
| **Tailwind CSS** | Estilos y diseño responsivo |
| **shadcn/ui** | Componentes de UI (Button, Dialog, Progress…) |
| **Radix UI** | Primitivos de accesibilidad |
| **Lucide React** | Íconos |
| **Framer Motion** | Animaciones |
| **React Router DOM** | Navegación |
| **TanStack Query** | Gestión de estado del servidor |
| **Vite** | Build tool y servidor de desarrollo |
| **ESLint** | Linter para mantener calidad del código |
| **Tailwind CSS** | Framework CSS utility-first |

---

## 📁 Estructura del proyecto

```
src/
├── pages/
│   └── BattleShip.jsx          # Página principal del juego
├── components/
│   ├── battleship/
│   │   ├── Board.jsx            # Tablero de juego
│   │   ├── BoardCell.jsx        # Celda individual
│   │   ├── ShipSelector.jsx     # Panel de selección de barcos
│   │   ├── GameHUD.jsx          # Indicadores de estado
│   │   ├── MessageLog.jsx       # Registro de batalla
│   │   ├── WelcomeScreen.jsx    # Pantalla de inicio
│   │   └── GameOverModal.jsx    # Modal de fin de partida
│   └── ui/                       # Componentes reutilizables
├── lib/
│   ├── gameConstants.js         # Constantes del juego
│   ├── gameLogic.js             # Lógica de juego e IA
│   ├── scoreManager.js          # Gestión de puntuaciones
│   └── utils.js                 # Utilidades
├── hooks/
│   └── use-mobile.jsx           # Hook para detectar dispositivos móviles
├── api/
│   └── client.js                # Cliente API
├── utils/
│   └── index.ts                 # Utilidades generales
├── index.css                    # Variables de diseño y tema naval
└── main.jsx                     # Punto de entrada
```

---

## 🎯 Cómo jugar

1. **Elige la dificultad** en la pantalla de inicio (Fácil, Normal, Difícil)
2. **Coloca tus barcos** en el tablero izquierdo haciendo clic
   - Presiona **R** para rotar los barcos
   - Usa el botón **Auto** para colocación aleatoria automática
3. **Pulsa Iniciar Batalla** cuando todos los barcos estén colocados
4. **Haz clic en el tablero enemigo** para disparar
   - ⏱️ Tienes **15 segundos** por turno
   - Si no disparas a tiempo, se realiza automáticamente
5. **Hunde toda la flota enemiga** para ganar
6. **Revisa tu puntuación** con estadísticas de precisión y velocidad

---

## 🚀 Instalación y ejecución

### Requisitos previos
- Node.js 16+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/naval-tactics.git
cd NavalTatics

# Instalar dependencias
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

### Preview de la build

```bash
npm run preview
```

### 🌐 Deploy en GitHub Pages

El proyecto está configurado para desplegar automáticamente en GitHub Pages.

**Pasos rápidos:**

1. Crea un repositorio en GitHub llamado `BatallaNaval`
2. Configura el remote:
   ```bash
   git remote add origin https://github.com/TU_USUARIO/BatallaNaval.git
   git branch -M main
   git push -u origin main
   ```
3. En GitHub: Settings → Pages → Rama `gh-pages` → Save
4. El workflow automático compilará y desplegará tu aplicación

📖 **[Ver guía completa de deploy →](DEPLOY_GUIDE.md)**

El sitio estará disponible en: `https://TU_USUARIO.github.io/BatallaNaval/`

---

## 📊 Modos de dificultad

### 🟢 Fácil
- La IA dispara de forma **completamente aleatoria**
- Perfecta para aprender las reglas del juego
- Estrategia: Coloca tus barcos de forma dispersa

### 🟡 Normal
- La IA **busca celdas adyacentes** cuando realiza un impacto
- Usa un algoritmo de búsqueda en cruz para localizar barcos
- Estrategia: Espacía bien tus barcos para minimizar impactos

### 🔴 Difícil
- La IA **detecta la dirección** del barco después de impactarlo
- Continúa en esa dirección hasta hundir completamente el barco
- La más desafiante: requiere estrategia defensiva avanzada

---

## 🧠 Sistema de IA

La IA adapta su comportamiento según la dificultad:

- **Fase de caza**: Busca barcos con disparos aleatorios
- **Fase de objetivo**: Una vez encuentra un barco, busca en celdas adyacentes
- **Fase de destrucción**: Detecta la orientación y remata el barco completamente

La IA mantiene un **registro de impactos** para optimizar la búsqueda.

---

## 📈 Sistema de puntuaciones

El juego guarda las mejores partidas en `localStorage` con:
- **Dificultad** seleccionada
- **Número de turnos** jugados
- **Precisión** (aciertos / total de disparos)
- **Fecha y hora** de la partida
- **Victoria/Derrota**

---

## ✨ Características futuras

- [ ] Multiplayer en línea
- [ ] Diferentes tamaños de tablero
- [ ] Poder-ups durante la batalla
- [ ] Sistema de logros y medallas
- [ ] Guardado de partidas en progreso

---

    