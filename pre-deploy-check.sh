#!/bin/bash
# Production deployment checklist for BatallaNaval
# Run this script before pushing to GitHub: bash ./pre-deploy-check.sh

echo "🔍 PRE-DEPLOYMENT VERIFICATION CHECKLIST"
echo "=========================================="
echo ""

# Check 1: vite.config.js
echo "1️⃣  Verificando vite.config.js..."
if grep -q "base: '/BatallaNaval/'" vite.config.js; then
    echo "   ✅ Base path configurado correctamente"
else
    echo "   ❌ Base path INCORRECTO o falta configuración"
    exit 1
fi

# Check 2: index.html exists
echo "2️⃣  Verificando index.html..."
if [ -f "index.html" ]; then
    echo "   ✅ index.html encontrado"
    if grep -q '<div id="root"></div>' index.html; then
        echo "   ✅ Root element presente"
    else
        echo "   ⚠️  Root element podría no estar configurado correctamente"
    fi
else
    echo "   ❌ index.html NO encontrado"
    exit 1
fi

# Check 3: Deploy workflow
echo "3️⃣  Verificando .github/workflows/deploy.yml..."
if grep -q "actions/checkout@v4" .github/workflows/deploy.yml; then
    echo "   ✅ Checkout v4 configurado"
else
    echo "   ❌ Actions no está en v4"
    exit 1
fi

if grep -q "node-version: '24'" .github/workflows/deploy.yml; then
    echo "   ✅ Node 24 configurado"
else
    echo "   ⚠️  Node 24 no configurado (puede haber v23 o anterior)"
fi

if grep -q "actions/deploy-pages@v4" .github/workflows/deploy.yml; then
    echo "   ✅ Deploy Pages v4 configurado"
else
    echo "   ⚠️  Deploy method podría no ser v4"
fi

# Check 4: .nojekyll file
echo "4️⃣  Verificando .nojekyll..."
if [ -f ".nojekyll" ]; then
    echo "   ✅ .nojekyll presente (Jekyll deshabilitado)"
else
    echo "   ❌ .nojekyll falta"
    exit 1
fi

# Check 5: package.json scripts
echo "5️⃣  Verificando scripts en package.json..."
if grep -q '"dev": "vite"' package.json; then
    echo "   ✅ Script 'dev' presente"
else
    echo "   ⚠️  Script 'dev' podría estar faltante"
fi

if grep -q '"build": "vite build"' package.json; then
    echo "   ✅ Script 'build' presente"
else
    echo "   ❌ Script 'build' NO encontrado - REQUERIDO"
    exit 1
fi

# Check 6: node_modules
echo "6️⃣  Verificando node_modules..."
if [ -d "node_modules" ]; then
    echo "   ✅ node_modules instalado"
else
    echo "   ⚠️  node_modules no está instalado - ejecutar: npm install"
fi

# Check 7: Build dist
echo "7️⃣  Construyendo proyecto con Vite..."
npm run build > /dev/null 2>&1
if [ -d "dist" ]; then
    echo "   ✅ Carpeta 'dist' generada correctamente"

    # Check 7.1: index.html in dist
    if [ -f "dist/index.html" ]; then
        echo "   ✅ dist/index.html presente (output minúsculas)"
    else
        echo "   ❌ dist/index.html NO encontrado"
        exit 1
    fi

    # Check 7.2: Size
    SIZE=$(du -sh dist | cut -f1)
    echo "   ℹ️  Tamaño de build: $SIZE"
else
    echo "   ❌ Build FALLÓ - revisar npm run build"
    exit 1
fi

# Check 8: Git configuration
echo "8️⃣  Verificando configuración de Git..."
if git remote -v | grep -q "BatallaNaval"; then
    echo "   ✅ Remote 'origin' apunta a BatallaNaval"
else
    echo "   ⚠️  Remote podría estar mal configurado"
    echo "      Ejecutar: git remote set-url origin https://github.com/ofz23/BatallaNaval.git"
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "main" ]; then
    echo "   ✅ Rama actual: 'main'"
else
    echo "   ⚠️  Rama actual: '$CURRENT_BRANCH' (debería ser 'main')"
    echo "      Ejecutar: git branch -M main"
fi

# Check 9: Uncommitted changes
echo "9️⃣  Verificando cambios sin commitear..."
if [ -z "$(git status --porcelain)" ]; then
    echo "   ✅ No hay cambios sin commitear"
else
    echo "   ⚠️  Hay cambios sin stagear:"
    git status --short | head -5
fi

# Final summary
echo ""
echo "=========================================="
echo "✨ VERIFICACION COMPLETADA"
echo "=========================================="
echo ""
echo "📝 Próximos pasos:"
echo "  1. git add ."
echo "  2. git commit -m \"chore: Configuración de despliegue\""
echo "  3. git push -u origin main"
echo ""
echo "🌐 URL en vivo (después de 2 minutos):"
echo "   https://ofz23.github.io/BatallaNaval/"

