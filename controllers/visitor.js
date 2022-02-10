/* eslint-disable no-unused-vars */
const Sayembara = require('../models/sayembara');

exports.getAll = (req, res, next) => {
  Sayembara.fetchAll((sayembaraList) => {
    res.render('visitor/sayembara', {
      prods: sayembaraList,
      pageTitle: 'Daftar Sayembara',
      path: '/',
    });
  });
};
