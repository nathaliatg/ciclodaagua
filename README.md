# Jogo Educativo — Ciclo da Água

[![Stack](https://img.shields.io/badge/HTML5%20CSS3%20JavaScript-0A84FF)]()

## Visão Geral
Jogo educativo sobre o **Ciclo da Água**. A **lógica de conteúdo** é separada e carregada via **`jogo.json`** (texto não é fixo no código). O projeto foi construído utilizando HTML, CSS e JavaScript puros, com foco em interatividade pedagógica, layout responsivo e uma estrutura de código escalável.

O projeto pode ser visualizado no [Github Pages](https://nathaliatg.github.io/ciclodaagua/)!

![Prévia](https://i.imgur.com/TasyrWY.gif)

## Funcionalidades
- Tela inicial com título, instruções e botão **Iniciar**.
- 4 alvos (Evaporação, Condensação, Precipitação, Infiltração).
- 4 blocos arrastáveis com descrições (drag-and-drop nativo).
- Validação: acerto bloqueia o item no alvo e o marca; erro mostra feedback visual temporário e o bloco arrastável retorna.
- **Temporizador regressivo de 3 minutos** com tela final adaptada para tempo esgotado.
- **Pontuação em tempo real** e **tela final** com total.
- **Responsivo** e **dados dinâmicos via JSON**.

## Estrutura
```
📁 raiz/
├── index.html
├── style.css
├── script.js
├── jogo.json
└── README.md
```

## Como Executar
1) Baixe/clon​e o repositório.  
2) Abra `index.html` no navegador.  
3) Verifique o carregamento do `jogo.json` (deve estar na mesma pasta).

## Roteiro Seguido (implementado)
1. HTML base com tela inicial, área do jogo e tela final.  
2. Carregamento dos dados via `jogo.json`.  
3. Montagem dinâmica de **alvos** e **arrastáveis** a partir do JSON.  
4. Drag-and-drop com HTML5/JS puro.  
5. Validação e **contador de pontuação**.  
6. Estilização em CSS puro.  
7. Testes de **responsividade** e clareza de interação.  
8. README com instruções e explicações.

## Reflexão de Automação
- **Padrão único de JSON** (título, etapas[nome, descrição]).  
- **Engine de jogo genérica** que lê o JSON e instancia componentes (targets/drag).  
- **Temas e layout configuráveis** (CSS classes/variáveis).  
- Suporte a **múltiplos capítulos**: carregar `jogo.json` por parâmetro/rota (`?capitulo=3`).  
- Pronto para integrar com **CMS/API** (mesmo contrato de dados).


---
Autora: **Nathalia Gonçalves** · [LinkedIn](https://www.linkedin.com/in/nathaliatg)
