# DEPLOY PARA O MUNDO 🚀

Este guia é para levar seu projeto MALDIÇÃO para o deploy e conquistar o mundo com a beleza do horror!

## 🎯 Métodos de Deploy (Escolha Um)

---

## 1️⃣ **GitHub Pages (RECOMENDADO - GRÁTIS)**

### Passo 1: Crie um repositório GitHub

```bash
# Inicialize git
git init

# Adicione todos os arquivos
git add .

# Faça o primeiro commit
git commit -m "🔴 MALDIÇÃO - Experiência de Horror Interativa"

# Renomeie branch para main
git branch -M main

# Conecte ao seu repositório (copie a URL do seu repo GitHub)
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git

# Faça o push
git push -u origin main
```

### Passo 2: Configure GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings**
3. No menu lateral, clique em **Pages**
4. Em "Source", selecione **main branch**
5. Clique em **Save**
6. Aguarde 1-2 minutos

### ✅ Site estará disponível em:
```
https://seu-usuario.github.io/seu-repo
```

---

## 2️⃣ **Netlify (MUITO FÁCIL)**

### Passo 1: Conecte seu repositório

```bash
# Primeiro, faça push para GitHub (mesmo que método anterior)
git push
```

### Passo 2: Deploy no Netlify

1. Vá para [netlify.com](https://netlify.com)
2. Clique em **Sign up** (com GitHub)
3. Autorize o Netlify a acessar seus repositórios
4. Clique em **New site from Git**
5. Selecione seu repositório
6. Clique em **Deploy site**

### ✅ Site estará disponível em:
```
https://seu-site.netlify.app
```

---

## 3️⃣ **Vercel (ULTRA-RÁPIDO)**

### Passo 1: Instale Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Faça deploy

```bash
cd "z:\qualquer coisa"
vercel
```

### Passo 3: Siga as instruções

Responda as perguntas:
- Qual é a raiz do projeto? **. (ponto)**
- Qual é o diretório de saída? **. (deixe vazio)**

### ✅ Site estará disponível em:
```
https://seu-site.vercel.app
```

---

## 4️⃣ **Firebase Hosting (GOOGLE)**

### Passo 1: Instale Firebase Tools

```bash
npm install -g firebase-tools
firebase login
```

### Passo 2: Configure o projeto

```bash
cd "z:\qualquer coisa"
firebase init hosting
```

Respostas sugeridas:
- **Escolha um projeto**: Create a new project
- **Public directory**: . (ponto)
- **Single-page app**: **N**
- **Delete file**: **N**

### Passo 3: Deploy

```bash
firebase deploy
```

### ✅ Site estará disponível em:
```
https://seu-projeto.web.app
```

---

## 5️⃣ **AWS S3 + CloudFront (PROFISSIONAL)**

### Passo 1: Configure AWS CLI

```bash
aws configure
```

Adicione suas credenciais AWS.

### Passo 2: Crie um bucket S3

```bash
aws s3 mb s3://seu-bucket-maldincao --region us-east-1
```

### Passo 3: Upload dos arquivos

```bash
aws s3 sync . s3://seu-bucket-maldincao/ --exclude ".git/*" --exclude "node_modules/*"
```

### Passo 4: Configure como website estático

```bash
aws s3 website s3://seu-bucket-maldincao/ \
  --index-document horror-site.html \
  --error-document horror-site.html
```

### ✅ Site estará disponível em:
```
http://seu-bucket-maldincao.s3-website-us-east-1.amazonaws.com
```

---

## 🌍 DOMÍNIO PRÓPRIO

### Registre um domínio em:
- [Namecheap](https://namecheap.com)
- [GoDaddy](https://godaddy.com)
- [Google Domains](https://domains.google)

### Configure DNS para GitHub Pages:
1. Vá para configurações do domínio
2. Configure DNS records:

```
CNAME → seu-usuario.github.io
```

ou para Netlify:

```
CNAME → seu-site.netlify.app
```

---

## 📊 OTIMIZAÇÃO PARA DEPLOY

### 1. Minify CSS e JavaScript

```bash
npm install -g csso-cli terser
csso style.css -o style.min.css
csso schedule.css -o schedule.min.css
csso enter.css -o enter.min.css
```

### 2. Comprimir Imagens (se houver)

```bash
npm install -g imagemin-cli
imagemin *.png *.jpg --out-dir=compressed
```

### 3. Criar Sitemap (SEO)

```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://seu-dominio.com/horror-site.html</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://seu-dominio.com/schedule.html</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://seu-dominio.com/enter.html</loc>
    <priority>0.9</priority>
  </url>
</urlset>
```

### 4. Adicionar robots.txt

```
# robots.txt
User-agent: *
Allow: /
Sitemap: https://seu-dominio.com/sitemap.xml
```

---

## 🔒 SSL/HTTPS

**GitHub Pages, Netlify e Vercel** fornecem SSL grátis automaticamente! ✅

Para AWS S3:
- Use CloudFront com AWS Certificate Manager

---

## 📈 ANALYTICS

### Google Analytics

Adicione antes de `</head>` em cada página:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Hotjar (Para ver usuario clicando)

```html
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:123456,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>
```

---

## 🎯 CHECKLIST PRÉ-DEPLOY

- [ ] Todos os arquivos criados: HTML, CSS, JS
- [ ] Links funcionando (testar cliques)
- [ ] Responsivo em mobile (teste em phone)
- [ ] Sem erros no console do navegador
- [ ] Performance otimizada (no máximo 3 segundos para carregar)
- [ ] SEO tags adicionadas
- [ ] Sitemap criado
- [ ] robots.txt criado
- [ ] Analytics configurado
- [ ] Custom domain configurado (opcional)
- [ ] SSL/HTTPS habilitado

---

## 🚨 TROUBLESHOOTING

### GitHub Pages não apareceu depois de push

```bash
# Aguarde 2-5 minutos
# Se ainda não funcionar, faça:
git push origin main --force
```

### Recursos CSS/JS não carregam

- Verifique se o caminho está correto (relativo, não absoluto)
- Não use `z:\qualquer coisa\` em links, use `.` (ponto)

### Página em branco

- Abra DevTools (F12)
- Vá para **Console** e procure por erros
- Verifique se o arquivo `horror-site.html` está na raiz

---

## 🌟 PRÓXIMOS PASSOS

1. **Compartilhe em Redes Sociais**
   - Twitter/X: `Confira minha experiência de horror interativa! #WebDevelopment`
   - Reddit: Post em r/webdev
   - Dev.to: Escreva um artigo

2. **Adicione no Portfolio**
   - GitHub README
   - LinkedIn
   - Portfolio pessoal

3. **Otimizações Futuras**
   - Adicionar vídeos de horror
   - Sistema de notifications
   - Multiplayer mode
   - PWA (Progressive Web App)
   - Mobile app

---

## 💡 DICAS IMPORTANTES

✅ **Sempre use HTTPS** - GitHub Pages faz isso automaticamente
✅ **Mobile first** - Testa em celular antes de fazer deploy
✅ **Performance matters** - Use PageSpeed Insights do Google
✅ **SEO é importante** - Adicione meta tags
✅ **Analytics** - Saiba quantas pessoas visitam
✅ **Versão** - Use tags de versão no Git

---

## 🎓 Recursos Úteis

- [GitHub Pages Docs](https://pages.github.com)
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [Google PageSpeed Insights](https://pagespeed.web.dev)
- [Web.dev](https://web.dev)

---

**Seus sites de horror agora CONQUISTARÃO O MUNDO! 🌍🔴☠️**

---

_Última atualização: 18 de Março de 2026_
