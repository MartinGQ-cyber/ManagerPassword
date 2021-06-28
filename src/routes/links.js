const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
//Para añadir/modificar de manera encriptada llamamos a las librerias
const CryptoJS = require('crypto-js');
//const {key} = require('../')
key = "AhG?=24*/@-kl"; //Aqui puedes poner lo que quieras es tu clave privada para encriptar luego más abajo
router.get('/add', isLoggedIn , (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn , async (req, res) => {
    const { title, url, email, password} = req.body; //recibo los datos del formulario
    const Password =  await CryptoJS.AES.encrypt(password, key); //Si comento esto no se encripta
    const Email =  await CryptoJS.AES.encrypt(email, key);//Si comento esto no se encripta
    const newLink = {
        title,
        url,
        Email,
        Password,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success', 'Cuenta añadida correctamente');
    res.redirect('/links');
    
});

router.get('/', isLoggedIn, async (req, res) => {   
    const links = await pool.query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    //Recorro los objetos y cogo las contraselas nada mas y las desencripto y las reescribo
    //console.log(links); 
    for (var i=0; i < links.length; i++){
         links[i].password =  await CryptoJS.AES.decrypt(links[i].password,key ).toString(CryptoJS.enc.Utf8);
         links[i].email =  await CryptoJS.AES.decrypt(links[i].email,key ).toString(CryptoJS.enc.Utf8);
        
    };
    //console.log(links);
    res.render('links/list',{links});

});


router.get('/delete/:id', isLoggedIn ,async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id = ?', [id]); //cambiado
    req.flash('success', 'Cuenta borrada correctamente'); ///Cambiado
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn ,async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    links[0].password = await CryptoJS.AES.decrypt(links[0].password,key ).toString(CryptoJS.enc.Utf8); //Desencripto aqui
    links[0].email = await CryptoJS.AES.decrypt(links[0].email,key ).toString(CryptoJS.enc.Utf8); //Desencripto aqui
   // console.log('GET',links);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id',isLoggedIn , async (req, res) => {
    const { id } = req.params;
    const { title, url, email, password} = req.body; 
    const Password =  await CryptoJS.AES.encrypt(password, key); //Encrypto aqui
    const Email =  await CryptoJS.AES.encrypt(email, key); //Encrypto aqui
    const newLink = {
        title,
        url,
        Email,
        Password,
        user_id: req.user.id
    };

    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Cuenta modificada correctamente');///Cambiado
    res.redirect('/links');
});

module.exports = router;