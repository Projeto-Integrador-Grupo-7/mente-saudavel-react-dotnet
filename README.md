# Projeto Mente Saudável (React + ASP.NET Core)

### Para rodar o BackEnd (Visual Studio):
Clicar com botão direito no projeto do backend (MenteSaudavel.Server) -> Clicar em "Set as Startup Project" -> Agora lá em cima no meio, onde tem um botão verde de play, selecionar "https" e dar play.

### Para rodar o BackEnd (Visual Studio Code):
Abrir o terminal do Visual Studio Code -> Navegar até a pasta do projeto backend (MenteSaudavel.Server) -> Digitar "dotnet run --launch-profile "https" -> Copiar o url que aparecer e colar no browser para testar a API.

### Para rodar o FrontEnd (Visual Studio e Visual Studio Code):
Abrir o terminal -> Navegar até a pasta do projeto frontend (mentesaudavel.client) -> Digitar "npm run dev" -> Copiar o url que aparecer e colar no browser para visualizar o frontend. 

### Erro "Connection String not initialized":
Clicar com botão direito no projeto do backend (MenteSaudavel.Server) -> Clicar em Manage User Secrets e colar essa connection string:
```
{
  "ConnectionStrings:DefaultConnectionString": "Server=localhost;Database=MenteSaudavelDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

## Explicação da estrutura do FrontEnd:
### Components
A pasta "components" é onde ficará os componentes que nós iremos reutilizar em outras partes do código, então, a primeira pessoa que for criar um botão por exemplo, deve criar ele lá dentro, dessa forma, quando outra pessoa precisar utilizar um botão em alguma outra tela, ela poderá chamar esse componente, apenas passando o texto que o botão deve ter, a cor dele, o tamanho, etc...

### Pages
Aqui ficarão as "Views", ou seja, o conteúdo de visualização das páginas.

## Explicação da estrutura do BackEnd:
### 01.API
Essa é a parte superior da API, onde ficam as controllers que recebem as requisições do frontend. Nessa camada não deverá ter regras de negócio, apenas receber a requisição e passar adiante pra próxima camada e após receber a resposta, retornar ao frontend.

### 02.Services
Essa é a camada onde o banco de dados está configurado, juntamente com as services que é onde ficarão as regras de negócio, e as repositories que servem para fazer as queries do banco de dados. Nessa camada também se encontram as migrations, que geram as alterações no banco.

### 03.Entities
Camada que ficam as entidades do sistema, ou seja, basicamente as tabelas mapeadas como classes do sistema.

### 04.Infrastructure
Nessa última camada ficarão os Enums, Helpers, Extensions, e demais classes e métodos que auxiliam o sistema como um todo.
