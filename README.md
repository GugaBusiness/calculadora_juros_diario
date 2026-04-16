# Núcleo Soluções - Simulador de Empréstimos

Uma aplicação Web de Página Única (SPA) desenvolvida em **React**, **Vite** e **Tailwind CSS**, desenvolvida para simular juros de amortização diária e facilitar o envio de cobranças estruturadas via WhatsApp.

## 🚀 Tecnologias Utilizadas

- **Framework:** React 19 + Vite
- **Estilização:** Tailwind CSS (v4)
- **Requisições API:** Axios
- **Formatação de Datas:** `date-fns`
- **Ícones:** Lucide React
- **Notificações:** Sonner

## 📁 Estrutura de Pastas

A arquitetura do projeto segue o padrão profissional de organização de componentes do ecossistema React:

```
├── public/                 # Favicon e assets públicos
├── src/                    # Código fonte
│   ├── assets/             # Imagens e assets internos
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── LoanForm.jsx    # Formulário de simulação com inputs e máscaras
│   │   └── ResultsArea.jsx # Exibição de resultados e integração WhatsApp
│   ├── App.jsx             # Orquestrador da Interface e estados
│   ├── index.css           # Configurações globais e do Tailwind CSS v4
│   └── main.jsx            # Entrypoint da SPA
├── .gitignore              # Arquivos locais não rastreados pelo Git
├── eslint.config.js        # Regras de linting
├── package.json            # Dependências NPM e scripts do projeto
├── README.md               # Documentação inicial do sistema
└── vite.config.js          # Configuração do empacotador Vite
```

## ⚙️ Instalação e Execução Local

Siga as etapas abaixo para ter o ambiente de desenvolvimento rodando na sua máquina:

1. Instale as dependências:
```bash
npm install
```

2. Rode o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra `http://localhost:5173` no seu navegador.

## 📦 Construindo para Produção (Build)

Para colocar a aplicação no ar, gere a versão otimizada com o comando:

```bash
npm run build
```

O código final será exportado para a pasta `/dist`. Esses arquivos podem ser hospedados em qualquer provedor de hospedagem de front-end (Vercel, Netlify, S3, Apache, etc).

## 🧩 Modificações Comuns

**Webhook (API)**
Se precisar alterar o servidor do n8n (Webhook API), você pode configurar a _URL_ diretamente na função `handleSubmit` dentro de `src/App.jsx`.

**Customizações de Formatação (WhatsApp)**
O modelo do texto submetido ao WhatsApp fica isolado em `src/components/ResultsArea.jsx` na função de envio. Modifique as strings de formatação de negrito (`*`), caso seja requisitado. O projeto foi blindado (`encodeURIComponent`) contra bugs do SO na geração de caracteres do WhatsApp Web.
