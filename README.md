# API Aeroporto

## Tecnologias:

### TypeScript:

- [TypeScript](https://www.typescriptlang.org/)

### EXPRESS:

- Biblioteca utilizada para a criação do servidor.

### PG:

- Biblioteca utilizada para a conexão com o banco de dados.

### Joi:

- Biblioteca utilizada para a validação de body da request.

### Swagger:

- Biblioteca utilizada para a criação da documentação da API.
<hr>

## BASE DE DADOS:

### [POSTGRESQL](https://www.postgresql.org/):

- [Documentação](https://www.postgresql.org/docs/)
- [Tutorial para download da imagem docker do postgres](https://felixgilioli.medium.com/como-rodar-um-banco-de-dados-postgres-com-docker-6aecf67995e1)

<hr>

## INICIANDO O PROJETO:

### Variaveis de ambiente (arquivo .env):
- Crie um arquivo .env na raiz do projeto e adicione as seguintes variaveis:
<pre>
	ENVIRONMENT = development

	# config for the production environment
	BASE_URL = http://localhost
	PORT = 3333


	# db settings
	DB_HOST = localhost
	DB_USER = postgres
	DB_PASSWORD = 1234
	DB_PORT = 5432
</pre>

### execute o banco de dados com o comando:

<pre>
 docker run -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres
</pre>

### clone o projeto:

<pre>
  git clone https://github.com/devsergionunes/api-aeroporto.git
</pre>

### Iniciar aplicação:

<pre>
 npm install && npm start
</pre>
