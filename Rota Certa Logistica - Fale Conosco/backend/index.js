const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const porta = 3000
const app = express()

//importa o módulo de conexão com o DB
const conexao = require('./db.js')

app.use(cors())
// puxando do 
app.use(express.json())
console.log("Servidor rodando !")
app.listen(porta, ()=>{
})

app.post("/faleconosco", async (req, res) => {
    try {
        console.log("Dados recebidos:", req.body);
         const { nome, email, telefone, empresa, assunto, mensagem } = req.body
        
        if (!mensagem || mensagem.length < 6) {
            return res.json({ "resposta": "A mensagem deve conter no mínimo 6 caracteres" })
        
        } else if (!email || email.length < 6) {
            return res.json({ "resposta": "Preencha um e-mail válido" })
        
        } else if (!nome || nome.length < 6) {
            return res.json({ "resposta": "Preencha o seu nome inteiro" })
        
        } else if (!telefone || telefone.length < 8) {
            return res.json({ "resposta": "Preencha o seu telefone" })
        
        } else if (!empresa || empresa.length < 3) {
            return res.json({ "resposta": "Preencha com o nome da sua empresa" })
        
        } else if (!assunto || assunto.length < 5) {
            return res.json({ "resposta": "Preencha com o assunto da conversa" })
        }

        const sql = `INSERT INTO fale_conosco (nome, email, telefone, empresa, assunto, mensagem, data_envio, status) VALUES (?, ?, ?, ?, ?, ?, NOW(), 'Aguardando Leitura')`
        
        await conexao.query(sql, [nome, email, telefone, empresa, assunto, mensagem])
        
        res.json({ "resposta": "Sucesso!!" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ "resposta": "Erro no servidor. Verifique o terminal." })
    }
})