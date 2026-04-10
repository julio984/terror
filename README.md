# 🔴 MALDIÇÃO - EXPERIÊNCIA DE HORROR INTERATIVA 🔴

## 🎭 Visão Geral

Um website sofisticado e imersivo para evento de terror, desenvolvido com técnicas avançadas de frontend. Este projeto apresenta efeitos complexos e interativos que criam uma experiência assustadora e memorável.

**NOVO:** Agenda interativa + Página de horror psicológico extremo!

---

## 🎨 Recursos Implementados

### 1. **Efeitos de Fundo**
- ✅ **Blood Drip Canvas**: Gotas de sangue caindo com física realista
- ✅ **Particles Canvas**: Neblina/partículas pulsantes
- ✅ **Eyes Canvas**: Olhos assustadores que seguem o mouse
- ✅ **Scanlines & Noise**: Efeito de interferência de TV antiga
- ✅ **Vignette**: Escuridão nas bordas
- ✅ **Glitch Overlay**: Distorções e glitches aleatórios
- ✅ **Distortion Grid**: Grade de distorção animada
- ✅ **Ambient Glow**: Brilho ambiente pulsante

### 2. **Tipografia & Texto**
- ✅ **Glitch Title**: Título com efeito glitch extremo em 3D
- ✅ **Subtitle com Glow**: Subtítulo com halo de brilho animado
- ✅ **Divider Animado**: Divisor com ícone rotativo

### 3. **Componentes Interativos**
- ✅ **Cards com Hover Profundo**: Cards com efeitos 3D, olhos, e brilho
- ✅ **CTA Button Épico**: Botão com efeito holográfico e 3D
- ✅ **Countdown Timer**: Contador regressivo com efeito digital
- ✅ **Info Section**: Seção informativa com animação flutuante
- ✅ **Custom Cursor**: Cursor personalizado tipo gota de sangue

### 4. **Interatividade & Animações**
- ✅ **Screen Shake**: Tremor de tela ao clicar
- ✅ **Particle Splatter**: Partículas que explodem ao clicar
- ✅ **Parallax Scroll**: Efeito de profundidade ao scroll
- ✅ **Card 3D Tilt**: Inclinação 3D ao passar o mouse nos cards
- ✅ **Ambient Glitches**: Glitches aleatórios na interface
- ✅ **Floating Animations**: Animações de flutuação

### 5. **Responsividade**
- ✅ Mobile-friendly design
- ✅ Grid adaptativo
- ✅ Fontes escaláveis

---

## 📁 Estrutura de Arquivos

```
z:\qualquer coisa\
├── horror-site.html      # Página principal (Homepage)
├── schedule.html         # Agenda interativa do evento
├── enter.html           # Página de horror psicológico
├── style.css            # Estilos CSS principais
├── schedule.css         # Estilos da página de agenda
├── enter.css            # Estilos da página de horror
├── horror-engine.js     # Engine JavaScript principal
├── schedule.js          # Lógica interativa da agenda
├── enter.js             # Lógica de horror psicológico
└── README.md            # Este arquivo
```

---

## 🎬 Páginas

### 1. **horror-site.html** - Homepage Principal
Página de boas-vindas com:
- Título animado com glitch extremo
- 3 cards informativos com efeitos 3D e olhos rastreadores
- Contador regressivo épico
- **Dois botões de ação:**
  - 📅 **VER AGENDA** → Vai para schedule.html
  - ☠️ **ENTRAR SE OUSAR** → Vai para enter.html (horror psicológico)

### 2. **schedule.html** - Agenda do Evento
Página interativa com navegação por abas:
- **📅 CRONOGRAMA**: 3 dias de eventos com horários
- **📍 LOCAL**: Informações do local (fictício)
- **⚠️ REGRAS**: "Regras de sobrevivência" do evento

Recursos:
- Efeitos de canvas no fundo
- Navegação responsiva
- Glitch effects ao trocar abas
- Keyboard navigation (setas)

### 3. **enter.html** - Experiência de Horror Psicológico
Página extrema com:
- Textos que desaparecem misteriosamente
- Olhos rastreadores que seguem o cursor em tempo real
- Espelho distorcido mostrando um "reflexo"
- Simulação de batimento cardíaco acelerado
- Efeitos de glitch, flash e chromatic aberration aleatórios
- Texto de "perdição" scrollando
- Interface futurista com carregamento progressivo
- Botão "TENTAR ESCAPAR" que não funciona
- Mensagens psicológicas em fade
- Traps de teclado (Escape desativado)
- Easter eggs com Konami Code

#### Modificar Data do Countdown
Em `horror-engine.js`:
```javascript
const target = new Date();
target.setDate(target.getDate() + 7);  // 7 dias
target.setHours(23, 59, 59, 0);        // 23:59:59
```

---

## 💡 Técnicas Avançadas Utilizadas

### CSS
- **3D Transforms**: `perspective()`, `rotateX()`, `rotateY()`
- **Gradients**: Linear e radial gradients com múltiplos stops
- **Animations**: Keyframes complexas com timing functions
- **Filters**: Blur, drop-shadow, brightness, hue-rotate
- **Backdrop Filter**: Efeito de vidro translúcido
- **Grid & Flexbox**: Layout responsivo moderno

### JavaScript
- **Canvas API**: Rendering 2D com física de partículas
- **RequestAnimationFrame**: Animações smooth 60fps
- **Event Listeners**: Interatividade com mouse e scroll
- **Classes ES6**: Estrutura orientada a objetos
- **Trigonometria**: Cálculos de ângulos e distâncias
- **Dynamic Styling**: Manipulação inline de estilos

### Performance
- ✅ Otimizado para 60fps
- ✅ Canvas rendering eficiente
- ✅ Lazy initialization
- ✅ Memory cleanup

---

## 🎯 Efeitos Principais

### 1. **Blood Drip Engine**
Gotas de sangue com:
- Física realista com gravidade
- Oscilação natural
- Pools (poças) acumulativas
- Gradientes suaves
- Efeito de reflexo

### 2. **Glitch Effects**
- Translação aleatória
- Clipping de elementos
- Mudanças de hue
- Skew distortions

### 3. **Parallax**
- Movimento baseado em scroll
- Diferentes velocidades por camada
- Efeito de profundidade

### 4. **3D Card Tilt**
- Rotação baseada na posição do mouse
- Transformação em perspectiva
- Shadow dinâmica
- Glow effect

### 5. **Eyes Following**
- 5 pares de olhos espalhados
- Pupila que segue o mouse
- Atualização suave
- Efeito assustador

---

## 🔧 Customizações Avançadas

### Alterar Quantidade de Gotas de Sangue
```javascript
// Em horror-engine.js
const MAX_DRIPS = 25;  // Altere este valor
```

### Adicionar Novos Eyes
```javascript
const eyePositions = [
  { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
  { x: window.innerWidth * 0.8, y: window.innerHeight * 0.2 },
  // Adicione mais aqui...
];
```

### Modificar Duração de Animações
```css
/* Em style.css */
h1 {
  animation: glitch-base 4s infinite;  /* Altere 4s */
}
```

---

## 📊 Browser Compatibility

| Browser | Suporte |
|---------|---------|
| Chrome  | ✅ Total |
| Firefox | ✅ Total |
| Safari  | ✅ Total |
| Edge    | ✅ Total |
| IE 11   | ❌ Não   |

---

## 🎬 Demonstração

### Interações:
1. **Mover mouse**: Olhos seguem o cursor
2. **Clicar**: Partículas explodem + tremor + sangue
3. **Scroll**: Efeito parallax + mudanças de opacidade
4. **Hover Cards**: 3D tilt + brilho + aparecimento de olhos
5. **Hover Button**: Efeito holográfico + escala

---

## 📝 Notas Técnicas

### Performance
- Canvas é renderizado em 60fps
- Particles reciclados para eficiência de memória
- CSS animations usam GPU quando possível
- Lazy loading de elementos

### Acessibilidade
- Cursor customizado, mas mouse padrão ainda funciona
- Sem conteúdo crítico em JavaScript
- Fallback para usuários sem suporte CSS

### SEO
- Meta tags completas
- Semântica HTML apropriada
- Viewport configurado

---

## 🎓 Aprendizado

Este projeto demonstra:
- Programação JavaScript avançada
- Manipulação de Canvas
- CSS 3D transforms
- Física de partículas
- Otimização de performance
- Design responsivo moderno
- UX interativa

---

## 📄 Licença

Projeto criado como frontend de demonstração para evento de terror.

---

## 🤝 Próximas Melhorias (Sugestões)

- [ ] Adicionar áudio ambiente
- [ ] WebGL para efeitos mais complexos
- [ ] Animações CSS mais sofisticadas
- [ ] Integração com API de eventos
- [ ] Dark mode automático
- [ ] Análise de performance
- [ ] PWA capabilities

---

## 📞 Suporte

Para problemas ou sugestões, verifique:
1. Console do navegador (F12)
2. Network tab para erros de arquivo
3. Performance profiler para otimizações

---

**🩸 Desenvolvido com terror e precisão 🩸**

*"Você já estava condenado"* - © 2026
