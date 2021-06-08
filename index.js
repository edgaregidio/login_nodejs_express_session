const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser')

const port = 3000;
const path = require('path');
const app = express();

var login = "admin";
var password = "123123";

app.use(session({
  secret: 'oviah24o18f0a9sfm10f89j28dvoin'
}));

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/views'));

app.post('/', (req, res) => {
  if (req.body.password == password && req.body.login == login) {
    // Logado com sucesso
    req.session.login = login;
    res.render('logado', {login: login});
  }else{
    res.render('index')
  }
})

app.get('/', (req, res) => {
  if (req.session.login) {
    res.render('logado', {login: login})
    console.log('o meu usuário logado é ' + req.session.login);
  } else {
    res.render('index');
  }
})

app.listen(port, () => {
  console.log('Servidor está rodando')
});