# <p align = "center"> RepoProvas </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Guilherme_Matsumura-4dae71?style=flat-square" />
</p>

## :clipboard: Descrição

O RepoProvas é um sistema de compartilhamento de provas entre estudantes! No RepoProvas qualquer pessoa pode procurar provas antigas de suas disciplinas e professores ou enviar provas antigas para ajudar os calouros :)

---

## :computer: Tecnologias e Conceitos

- REST APIs
- Express
- JWTs & refresh tokens
- Node.js
- TypeScript
- PostegreSQL

---

## :rocket: Rotas

```yml
POST /signup
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "email": "SEU_EMAIL@gmail.com",
        "password": "SUA_SENHA",
        "confirmPassword": "SUA_SENHA"
        }
```

```yml
POST /signin
    - Rota para fazer login
    - headers: {}
    - body: {
        "email": "SEU_EMAIL@gmail.com",
        "password": "SUA_SENHA"
    }
```

```yml
POST /exam (autenticada)
    - Rota para cadastrar uma prova
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "NOME",
        "pdfUrl": "URL_DO_PDF",
        "categoryId": CATEGORY_ID,
        "teacherDisciplineId": TEACHER_DISCIPLINE_ID
    }
```

```yml
GET /exam/discipline (autenticada)
    - Rota para listar as provas por disciplina
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

```yml
GET /usuarios/teacher (autenticada)
    - Rota para listar as provas por professor
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
```

---

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/GuiMatsumura/projeto20-repoprovas.git
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Finalizado o processo, é só inicializar o servidor

```
npm start
```
