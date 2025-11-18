const mysql = require('mysql2/promise')

//pool de conexão
const conexao = mysql.createPool({
    //criar configurações do BD
    //host é o endereço do BD
    host:"localhost",           //local do servidor
    user:"root",                //usuário
    password:"",               //senha
    port:3306 ,               //porta padrão do mysql
    database:"rota_certa",        //nome do banco
    waitForConnections:true,   //aviso de limite de pessoas conectadas
    connectionLimit:10,        //limite de conexões ao mesmo tempo
    queueLimit:0

})
//exportando arquivo BD como
module.exports = conexao