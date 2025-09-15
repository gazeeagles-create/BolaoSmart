# Configuração

Este documento explica como configurar as integrações necessárias para rodar o projeto, incluindo o **Supabase** e o **Docker**.

## Configuração do Supabase

### Passo 1: Criar uma Conta no Supabase
1. Acesse o [site do Supabase](https://supabase.com/).
2. Crie uma conta e faça login.
3. Crie um novo projeto e forneça as informações necessárias (nome, região, etc.).
4. Após a criação do projeto, vá para a seção **Settings** > **API** e copie a **URL da API** e a **Chave Anônima**.

### Passo 2: Configurar Variáveis de Ambiente
No arquivo **`.env`** do **backend**, adicione as seguintes variáveis de ambiente:

```bash
SUPABASE_URL=https://rwngziyldsirpxzadqgy.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3bmd6aXlsZHNpcnB4emFkcWd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NTE5MDksImV4cCI6MjA3MzUyNzkwOX0.hlpzYlbB2zhT3xDidOiYZ1wJLoQXUaKWCGGNplf4gy8
