# 🚀 Configuración de Despliegue en Producción
## BatallaNaval - GitHub Pages (Node 24, Vite, GitHub Actions v4)

### 📋 ESTADO DE CONFIGURACIÓN

✅ **Archivos de configuración actualizados:**
- `vite.config.js` - Optimizado para Node 24+ con output en `dist/`
- `.github/workflows/deploy.yml` - Actions v4, Node 24 nativo, `actions/deploy-pages@v4`
- `.nojekyll` - Previene procesamiento de Jekyll en GitHub Pages
- `index.html` - Punto de entrada principal (minúsculas)

✅ **Base path configurado:**
```
base: '/BatallaNaval/'
```

---

### 🔧 COMANDOS DE TERMINAL (Fedora Linux)

#### 1. **Inicializar Git (Primera vez)**
```bash
cd /home/offz/IdeaProjects/NavalTatics

# Verificar estado actual
git status

# Si ya existe remote, mostrar:
git remote -v
```

#### 2. **Actualizar origin remoto** (si ya existe pero está mal)
```bash
# Listar remotes actuales
git remote -v

# Si existe 'origin', cambiar URL:
git remote set-url origin https://github.com/ofz23/BatallaNaval.git

# Si NO existe 'origin', agregarlo:
git remote add origin https://github.com/ofz23/BatallaNaval.git
```

#### 3. **Preparar rama principal**
```bash
# Cambiar a rama 'main' (si está en 'master'):
git branch -M main

# Verificar rama actual:
git branch -a
```

#### 4. **Confirmar cambios** (una sola vez con todos los cambios)
```bash
# Agregar TODOS los archivos modificados (config de despliegue):
git add .

# Verificar qué se va a commitear:
git status

# Commit con mensaje descriptivo:
git commit -m "chore: Actualizar configuración de despliegue para GitHub Pages

- Vite config optimizado para Node 24+
- GitHub Actions v4 (actions/deploy-pages@v4)
- Base path: /BatallaNaval/
- Output directo en dist/ (sin Jekyll)
- Minificación terser con tree-shaking"
```

#### 5. **Empujar a GitHub** (Primera vez con -u)
```bash
git push -u origin main
```

#### 6. **Empujes posteriores** (commits futuros)
```bash
git push origin main
```

---

### 📱 VERIFICAR DESPLIEGUE EN GITHUB

1. **Ir a repositorio:** https://github.com/ofz23/BatallaNaval/

2. **Verificar Actions:**
   - Haz clic en **Actions** → Busca el workflow `Deploy to GitHub Pages`
   - Estado: ✅ Verde = éxito, ❌ Rojo = error

3. **Revisar logs si falla:**
   - Click en el workflow fallido
   - Sección "Build" → Expande pasos para ver errores
   - Comúnmente: dependencias, permisos de Pages

4. **Configurar Pages** (One-time):
   - Settings → Pages
   - Branch: `gh-pages` (automáticamente creada por Actions)
   - Folder: `/ (root)`
   - Click Save

5. **URL en vivo:**
   - https://ofz23.github.io/BatallaNaval/

---

### 🔐 ALTERNATIVA: Usar GitHub CLI (gh)

Si prefieres usar `gh` (GitHub CLI) en lugar de HTTPS:

#### Autenticar:
```bash
gh auth login
# Seleccionar: 'GitHub.com'
# Seleccionar: 'SSH' o 'HTTPS' según tu PAT
```

#### Usar configuración con gh:
```bash
# En lugar de git push, puedes usar:
gh repo create BatallaNaval --source=. --remote=origin --push
```

---

### ✨ VERIFICACIÓN FINAL PRE-PUSH

Ejecutar antes de hacer `git push`:

```bash
# 1. Verificar que la build local funciona:
npm run build

# Debe generar carpeta 'dist/' sin errores

# 2. Verificar tamaño de dist:
du -sh dist/

# Ideal: < 5MB

# 3. Verificar que index.html existe:
ls -la dist/index.html

# 4. Verificar que main.jsx está en el bundle:
grep -r "main.jsx\|bundle" dist/ || echo "✓ Build optimizado (sin referencias a main.jsx)"

# 5. Verificar ruta base:
grep "base:" vite.config.js
```

---

### ⚠️ TROUBLESHOOTING

**Problema:** "404 - main.jsx not found"
```
→ Causas: base path incorrecto en vite.config.js
→ Solución: Verificar que sea: base: '/BatallaNaval/'
```

**Problema:** "Página en blanco sin errores"
```
→ Causas: GitHub Pages aún procesando (tarda 1-2 min)
→ Solución: Esperar, luego recargar (Ctrl+Shift+R = hard refresh)
```

**Problema:** "Actions workflow falla"
```
→ Causas: Node version incompatible, dependencias sin instalar
→ Solución: Revisar logs en Actions → Build step
```

**Problema:** "Jekyll interfiere (recursos rotos)"
```
→ Causas: Archivos con guiones bajos no procesados
→ Solución: Ya incluido `.nojekyll` archivo (problema resuelto)
```

---

### 📊 FLUJO COMPLETO (Resumen)

```bash
# 1. Preparar
cd /home/offz/IdeaProjects/NavalTatics
git status
git remote set-url origin https://github.com/ofz23/BatallaNaval.git

# 2. Actualizar config
# (Ya realizado: vite.config.js, deploy.yml, .nojekyll)

# 3. Comprometerse
git branch -M main
git add .
git commit -m "chore: Configuración de despliegue GitHub Pages v4"

# 4. Empujar
git push -u origin main

# 5. Esperar 2 minutos y verificar en:
# https://ofz23.github.io/BatallaNaval/
```

---

### 📝 INFORMACIÓN CRÍTICA PARA TU REFERENCIA

| Propiedad | Valor |
|-----------|-------|
| **Base Path** | `/BatallaNaval/` |
| **Output Dir** | `dist/` |
| **Actions Version** | v4 (Node 24 native) |
| **Deploy Method** | `actions/deploy-pages@v4` |
| **URL en Vivo** | https://ofz23.github.io/BatallaNaval/ |
| **Node Version** | 24+ (LTS 2026) |

---

**Configuración lista para producción. Procede con los comandos git cuando estés listo. 🚀**

