# Arquitetura do Sistema

O **BolaoSmart** é uma aplicação web desenvolvida para a criação e gestão de bolões de futebol. A aplicação é composta por dois principais componentes: **Frontend** e **Backend**.

## Frontend

O **Frontend** é responsável pela interface com o usuário e pela interação com a API do **Backend**. Ele é construído com **React** e organiza os componentes e páginas da aplicação. A comunicação com o backend é feita via **API REST**.

- **React**: Framework para construção da interface do usuário.
- **React Router**: Gerencia a navegação entre as páginas.
- **Axios**: Realiza requisições HTTP para o backend.

## Backend

O **Backend** é responsável pela lógica de negócios, processamento e armazenamento de dados. Ele é construído com **Node.js** e **Express**, com comunicação com o banco de dados **Supabase**.

- **Node.js**: Ambiente de execução para JavaScript.
- **Express**: Framework para construção de APIs REST.
- **Supabase**: Plataforma de banco de dados como serviço, baseada no PostgreSQL, para armazenamento de dados.
- **Multer**: Middleware para fazer o upload de arquivos (imagens).

## Arquitetura em Camadas

- **Frontend**: A interface do usuário que interage com a API do backend.
- **Backend**: API REST que processa requisições do frontend e interage com o banco de dados.
- **Supabase**: Serviço que oferece autenticação, banco de dados e armazenamento de arquivos.

## Fluxo de Dados

1. O usuário acessa o frontend e interage com a interface.
2. O frontend faz requisições HTTP ao backend.
3. O backend processa as requisições, acessa o banco de dados (Supabase) e retorna os resultados para o frontend.
4. Quando o usuário faz upload de uma imagem, o frontend envia o arquivo para o backend, que o armazena no diretório ou serviço de armazenamento.

## Tecnologias Utilizadas

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, Supabase, Multer
- **Banco de Dados**: Supabase (PostgreSQL)
- **Armazenamento de Arquivos**: Local (no servidor) ou Supabase Storage
