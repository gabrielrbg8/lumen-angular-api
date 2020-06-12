# lumen-angular-api
Projeto feito com Angular, Lumen+JWT e MysQL.# Título do projeto

Este projeto foi proposto por uma empresa como teste para processo seletivo, onde criei uma API em Lumen, e a consumi no Angular. A ideia base da aplicação era consulta, inserção e manutenção de protótipos de sistemas, utilizando JWT para a auntenticação. Veja mais abaixo.

## Getting Started

Para executar o projeto, você precisará de dois terminais (cmd) abertos, um para servir a aplicação Angular, e outra para a aplicação PHP.
Navegue até a pasta raiz e digite o seguinte comando:

PHP:
composer install - para instalar as dependências do projeto.
php -S localhost:8080 -t public (a baseUrl do projeto está configurada na porta 8080).

Angular:
npm install - para instalar as dependências do projeto. 
npm run ng serve - isso iniciará um servidor Angular para que você o execute no navegador.

### Prerequisites
PHP
Lumen
JWT
Composer
npm
Angular
MySQL
Postman
```
Na pasta scripts-sql-database você encontra os arquivos em formato .sql para criar o banco de dados.
Obs.: Você também pode usar as migrations.
O retorno dos métodos são um JSON e statusCode da requisição.
Abaixo você verá os endpoints da API, organizados da seguinte maneira:
```
````````````````````````
MÉTODO HTTP - Ação
Endpoint {parameters}
Retorno em caso de sucesso
Retorno em caso de falha
```````````````````````````

### Os endpoints de Autenticação que utilizei, são os padrão do Lumen.

Para entender mais sobre os endpoints de autenticação, visite: https://jwt-auth.readthedocs.io/en/develop/lumen-installation/

### Endpoints de manipulação de usuários 
Nota: você precisará de um usuário logado para criar outros via web (utilizando a aplicação angular).
Para inserir um usuário, utilize o Postman, Insomnia ou outro aplicativo para inserir um usuário.

```
POST - Create
baseUrl/api/user/create {name, email, password, profile_id}
statusCode:200 - {dados do usuário}
statusCode:304 - "Falha ao criar usuário"
```

### Endpoints de manipulação de sistemas
```
POST - Create
baseUrl/api/system/create {description, email, initials, status, url}
statusCode:200 - {dados do sistema} - "Operação realizada com sucesso."
statusCode:304 - "Falha ao criar sistema"
```
```
POST - Search
baseUrl/api/system/search {description, initials, email} - parâmetros não obrigatórios. Caso não informe parâmetros, serão retornados todos os sistemas.
statusCode : 200 - {dados do sistema}
statusCode: 304 - "Nenhum sistema foi encontrado. Favor revisar os critérios da sua pesquisa!"
```
```
PUT - Update
baseUrl/api/system/update/{id} {description, email, initials, status, url} - parâmetros não obrigatórios.
statusCode:200 - {dados do sistema} - "Operação realizada com sucesso."
statusCode:304 - "Falha ao atualizar sistema"
```
```
GET - Dados da última modificação feita no sistema
baseUrl/api/system/last-modification/{id} {}.
statusCode : 200 - {dados da última alteração do sistema} - "Operação realizada com sucesso."
*statusCode : 200 - "Nenhuma alteração foi feita nesse sistema.'* - Não é uma falha.
```
```
GET - View
baseUrl/api/system/view/{id} {}.
statusCode:200 - {dados do sistema} 
statusCode:404 - "Sistema não encontrado."
```

Sugestões e elogios: gabrielrbg8@outlook.com :)
