# 🚀 Guía de Deploy en GitHub Pages

## Pasos para desplegar el proyecto:

### 1. Preparar el repositorio en GitHub

1. Ve a https://github.com/new (debes estar logueado)
2. Crea un nuevo repositorio llamado `NavalTatics` (o el nombre que prefieras)
3. **NO inicialices** con README, .gitignore o licencia (tu proyecto ya los tiene)

### 2. Sincronizar localmente

```bash
cd /home/offz/IdeaProjects/NavalTatics

# Configurar el remote
git remote add origin https://github.com/TU_USUARIO/NavalTatics.git

# Cambiar rama a main (si está en master)
git branch -M main

# Agregar cambios
git add .

# Commit
git commit -m "Initial commit"

# Push a GitHub
git push -u origin main
```

### 3. Configurar GitHub Pages

1. Ve a **Settings** de tu repositorio en GitHub
2. En el menú lateral, selecciona **Pages**
3. En **Source**, selecciona:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
4. Click en **Save**

GitHub Pages se desplegará automáticamente en `https://TU_USUARIO.github.io/NavalTatics/`

### 4. El workflow automático

Cada vez que hagas push a la rama `main`, el workflow `.github/workflows/deploy.yml` ejecutará:

1. ✅ Instalar dependencias
2. ✅ Compilar el proyecto
3. ✅ Desplegar automáticamente a GitHub Pages

### ⚠️ Importante: Verificar la ruta base

En `vite.config.js` está configurado:
```javascript
base: '/NavalTatics/',
```

**Si tu repositorio tiene otro nombre, cambia `NavalTatics` por el nombre de tu repo.**

Ejemplo:
```javascript
base: '/mi-juego/', // si tu repo se llama 'mi-juego'
base: '/', // si tu repo se llama 'TU_USUARIO.github.io'
```

### 📱 Después del primer deploy

- Espera 1-2 minutos después del push
- Visita `https://TU_USUARIO.github.io/NavalTatics/`
- ¡Tu juego estará en línea! 🎉

### 🔧 Solucionar problemas

**Si ves errores en la consola del navegador:**
- Abre DevTools (F12)
- Revisa la consola y Network tabs
- Asegúrate que el `base` en `vite.config.js` sea correcto

**Si el workflow falla:**
- Ve a **Actions** en GitHub
- Abre el workflow fallido
- Lee los logs para identificar el error
- Comúnmente: mal nombre de repo o dependencias faltantes

### 📝 Ficheros modificados

- ✅ `vite.config.js` - Agregado `base` y config de build
- ✅ `.github/workflows/deploy.yml` - Workflow automático (creado)

### ✨ Opcional: Agregar un custom domain

Si tienes un dominio, puedes configurarlo en GitHub Pages:
1. Settings → Pages
2. Custom domain: `juegonaval.com` (ejemplo)
3. Crea un archivo `CNAME` en la raíz con: `juegonaval.com`

---

**¡Listo! Ya tienes todo configurado para desplegar en GitHub Pages! 🚀**

