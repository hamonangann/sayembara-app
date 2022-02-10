/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
const Sayembara = require('../models/sayembara');

exports.getAddForm = (req, res, next) => {
  res.render('admin/edit-sayembara', {
    pageTitle: 'Tambah Sayembara',
    path: '/admin/post',
    editing: false,
  });
};

exports.postAddForm = (req, res, next) => {
  const { title, content, password } = req.body;

  const newSayembara = new Sayembara(null, title, content, password);
  newSayembara.save();
  res.redirect('/');
};

exports.getAll = (req, res, next) => {
  Sayembara.fetchAll((sayembaraList) => {
    res.render('admin/sayembara', {
      prods: sayembaraList,
      pageTitle: 'Admin - Daftar Sayembara',
      path: '/admin',
    });
  });
};

exports.getEditForm = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const sayembaraId = req.params.id;
  Sayembara.findById(sayembaraId, (curSayembara) => {
    if (!curSayembara) { // doesnt existed
      return res.redirect('/');
    }
    res.render('admin/edit-sayembara', {
      pageTitle: 'Edit Sayembara',
      path: '/admin/update',
      editing: editMode,
      sayembaraId: curSayembara.id,
      sayembaraTitle: curSayembara.title,
      sayembaraContent: curSayembara.content,
    });
  });
};

exports.postEditForm = (req, res, next) => {
  const {
    id, title, content, password,
  } = req.body;
  const updatedSayembara = new Sayembara(
    id,
    title,
    content,
    password,
  );
  updatedSayembara.save();
  res.redirect('/');
};

exports.getDeleteForm = (req, res, next) => {
  const sayembaraId = req.params.id;
  Sayembara.findById(sayembaraId, (curSayembara) => {
    if (!curSayembara) { // doesnt existed
      return res.redirect('/');
    }
    res.render('admin/delete-sayembara', {
      pageTitle: 'Delete Sayembara',
      path: '/admin/delete',
      sayembaraId,
    });
  });
};

exports.postDeleteForm = (req, res, next) => {
  const { id, password } = req.body;
  Sayembara.deleteById(id, password);
  res.redirect('/');
};
