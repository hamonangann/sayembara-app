/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'sayembara.json',
);

const getSayembaraFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Sayembara {
  constructor(id, title, content, password) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.password = password;
  }

  save() {
    getSayembaraFromFile((sayembaraList) => {
      if (this.id) { // existed
        const existingIndex = sayembaraList.findIndex(
          (s) => s.id === this.id,
        );
        const updatedSayembara = [...sayembaraList];
        if (bcrypt.compareSync(this.password, updatedSayembara[existingIndex].password) === false) {
          return; // wrong password error
        }

        const hashedPassword = bcrypt.hashSync(this.password, salt);
        this.password = hashedPassword; // save hashed password

        updatedSayembara[existingIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedSayembara), (err) => {
          console.log(err);
        });
      } else { // new
        this.id = Math.random().toString();

        const hashedPassword = bcrypt.hashSync(this.password, salt);
        this.password = hashedPassword; // save hashed password

        sayembaraList.push(this);
        fs.writeFile(p, JSON.stringify(sayembaraList), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteById(id, password) {
    getSayembaraFromFile((sayembaraList) => {
      const sayembara = sayembaraList.find((s) => s.id === id);

      if (bcrypt.compareSync(password, sayembara.password) === false) {
        return; // wrong password error
      }

      const updatedSayembara = sayembaraList.filter((s) => s.id !== id);

      fs.writeFile(p, JSON.stringify(updatedSayembara), (errors) => {
        console.log(errors);
      });
    });
  }

  static fetchAll(cb) {
    getSayembaraFromFile(cb);
  }

  static findById(id, cb) {
    getSayembaraFromFile((sayembaraList) => {
      const sayembara = sayembaraList.find((s) => s.id === id);
      cb(sayembara);
    });
  }
};
