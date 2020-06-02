const admin = require('firebase-admin');
const path = require('path');

const { Router } = require('express');
const { DATA_BASE_URL, GOOGLE_APPLICATION_CREDENTIAL } = process.env;

const serviceAccount = require(path.resolve(GOOGLE_APPLICATION_CREDENTIAL));
const router = Router();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: DATA_BASE_URL
});

const db = admin.database();

router.get('/', (req, res) => {
  db.ref('contacts').once('value', snapshot => {
    const data = snapshot.val();
    res.render('index', { contacts: data });
  });
});

router.get('/delete-contact/:id', (req, res) => {
  db.ref(`contacts/${req.params.id}`).remove();
  res.redirect('/');
});

router.post('/new-contact', (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  db.ref('contacts').push({ firstname, lastname, email, phone });
  res.redirect('/');
});

module.exports = router;
