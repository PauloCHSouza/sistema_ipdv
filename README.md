GUIA PARA CONFIGURAÇÃO


Middlewares utilizados
  1. Express
  2. Consign
  3. Express-validator
  4. Express-session
  5. Body-parser

DATABASE

  Para criação do banco de dados poderá ser utilizado o SQL contido na pasta "dataBase" deste projeto.
  
  Foi utilizado como serviço de banco de dados para este projeto MYSQL 5.7, a escolha do banco foi feita simplesmente pela facilidade ao realizar o projeto.
  

OBS

  Para instalação dos middlewares foi utilizado o NPM para instalação.
  
  O projeto está configurado para responder na porta 3000.
  
  Os modelos JSON para utilização estáo disponíveis ma pasta "modelos".
  
  
END POINTS

  /sis/autenticar (POST)
  
  /sis/importacoes/usuarios (POST)
  
  /usu/usuarios/index (GET)
  
  /usu/usuarios/salvar (POST)
  
  /usu/usuarios/editar (POST)
  
  /usu/usuarios/excluir (DELETE)
  
  /usu/usuarioDepartamento/index (GET)
  
  /usu/departamentos/index (GET)
  
  /usu/departamentos/salvar (POST)
  
  /usu/departamentos/editar (POST)
  
  /usu/departamentos/excluir (DELETE)
  
  /usu/departamentosCentroCusto/index (GET)
  
  /fin/centrosCusto/index (GET)
  
  /fin/centrosCusto/salvar (POST)
  
  /fin/centrosCusto/editar (POST)
  
  /fin/centrosCusto/excluir (DELETE)
  
  /usu/cargos/index (GET)
  
  /usu/cargos/salvar (POST)
  
  /usu/cargos/editar (POST)
  
  /usu/cargos/excluir (DELETE)
