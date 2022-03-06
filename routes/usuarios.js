const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt')

router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if(err) { return res.status(500).send({ error: error})}
        conn.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], (error, results) => {
            if (error) { return res.status(500).send({ error: error})}
            if (results.length > 0){
                res.status(401).send({ mensagem: 'Usuario já cadastrado'})
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if(errBcrypt) { return res.status(500).send({ error: errBcrypt})}
                    conn.query(
                        'INSERT INTO usuarios (email,senha) VALUES (?,?)', 
                        [req.body.email, hash],
                        (error, results) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error})}
                            response = {
                                mensagem: 'Usuario criado',
                                usuarioCriado: {
                                    id_usuario: results.insertId,
                                    email: req.body.email
                                }
                            }
                            return res.status(201).send(response)
                        })
                })
            }
        })
        
    })
});

router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error})}
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        conn.query(query,[req.body.email],(error,results,fields) => {
            conn.release();
            if(error) { return res.status(500).send({ error: error})}
            if(results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha no login'})
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if(err) {
                    return res.status(401).send({ mensagem: 'Falha no login'})
                }
                if(result) {
                    return res.status(200).send({ mensagem: 'Login com sucesso'})
                }
                return res.status(401).send({ mensagem: 'Falha no login'})
            })
        })
    })
})

module.exports = router