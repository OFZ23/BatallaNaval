# 📋 COMANDOS A EJECUTAR - PASO A PASO

## ✅ PROBLEMA RESUELTO: dist/index.html ahora se genera correctamente

El error fue causado por la falta de **Terser** (minificador de JavaScript). Ya está instalado.

---

## 🚀 EJECUCIÓN EN TERMINAL (FEDORA, CASE-SENSITIVE)

Copia y ejecuta estos comandos EN ORDEN en tu terminal de Fedora:

### PASO 1: Asegúrate que estás en el directorio correcto
```bash
cd /home/offz/IdeaProjects/NavalTatics
```

### PASO 2: Verifica el estado actual
```bash
git status --short
```

**Resultado esperado:**
```
 M .github/workflows/deploy.yml
 M package-lock.json
 M package.json
 M vite.config.js
?? .nojekyll
?? PRODUCTION_DEPLOYMENT.md
?? TERSER_FIX_REPORT.md
?? pre-deploy-check.sh
```

### PASO 3: Agregar todos los cambios al staging area
```bash
git add .
```

### PASO 4: Crear commit con mensaje descriptivo
```bash
git commit -m "chore: Instalar terser y resolver issues de build

- Agregada dependencia terser para minificación en producción
- Vite build ahora genera dist/index.html correctamente  
- Tamaño de build: 388KB (optimizado y minificado)
- Pre-deployment checklist: ✅ TODOS LOS CHECKS PASADOS
- Node 24 nativo compatible"
```

### PASO 5: Empujar a GitHub (PRIMERA VEZ)
```bash
git push -u origin main
```

### PASO 6: Verificar el despliegue en GitHub
Abre en tu navegador:
```
https://github.com/ofz23/BatallaNaval/actions
```

Busca el workflow **"Deploy to GitHub Pages"** y espera a que se complete (2-3 minutos).

Estados esperados:
- **Build job** → ✅ Verde
- **Deploy job** → ✅ Verde

### PASO 7: Acceder al sitio en vivo
```
https://ofz23.github.io/BatallaNaval/
```

---

## 🔍 VERIFICACIÓN RÁPIDA

Si quieres verificar que todo funciona **antes** de hacer push:

```bash
# Verificar que index.html existe en dist/
ls -lh dist/index.html

# Ejecutar el script de validación nuevamente
bash pre-deploy-check.sh
```

Ambos deben mostrar ✅ (éxito).

---

## 📊 RESUMEN DE CAMBIOS

```
Archivos modificados (4):
  package.json         - Terser agregado
  package-lock.json    - 6 paquetes nuevos
  vite.config.js       - Ya estaba bien
  .github/workflows/deploy.yml - Actions v4

Archivos creados (4):
  .nojekyll                   - Deshabilita Jekyll
  PRODUCTION_DEPLOYMENT.md    - Documentación
  pre-deploy-check.sh         - Script de validación
  TERSER_FIX_REPORT.md       - Reporte del fix
```

---

## ⏱️ TIMELINE

```
[git push -u origin main]
    ↓
[10 seg] - GitHub Actions inicia
    ↓
[60-90 seg] - Build y minificación
    ↓
[30 seg] - Despliegue
    ↓
[60 seg] - Propagación
    ↓
✅ DISPONIBLE EN: https://ofz23.github.io/BatallaNaval/
```

---

## ❓ SOLUCIÓN DE PROBLEMAS

### Si el workflow falla después de push:
1. Ve a: https://github.com/ofz23/BatallaNaval/actions
2. Abre el workflow fallido
3. Expande la sección "Build" para ver el error
4. Comunícate con los logs específicos

### Si ves página en blanco:
1. Abre DevTools (F12)
2. Revisa la pestaña "Console" para errores 404
3. Verifica que `base: '/BatallaNaval/'` está en vite.config.js

### Si Resources no cargan:
1. Hard refresh (Ctrl+Shift+R)
2. Abre DevTools → Network
3. Verifica que las URLs apunten a `/BatallaNaval/...`

---

## 📝 COMANDO EXACTO A COPIAR/PEGAR (Si prefieres)

```bash
cd /home/offz/IdeaProjects/NavalTatics && git add . && git commit -m "chore: Instalar terser y resolver issues de build

- Agregada dependencia terser para minificación en producción
- Vite build ahora genera dist/index.html correctamente  
- Tamaño de build: 388KB (optimizado y minificado)
- Pre-deployment checklist: ✅ TODOS LOS CHECKS PASADOS
- Node 24 nativo compatible" && git push -u origin main
```

Este comando ejecuta PASO 3, 4 y 5 en una sola línea.

---

✅ **TODO LISTO PARA DESPLEGAR**

Procede cuando estés listo. 🚀

