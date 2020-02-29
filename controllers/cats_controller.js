const connection = require('../config/connection');

// get all cats
const getCats = () => {
  return new Promise((resolve, reject) =>{
    connection.query('SELECT * FROM cats', (err, catdata) => {
      if (err) {
        console.log(err);
        //THIS WILL GO TO PROMISE'S .catch()
        return reject(err);
      }
      // THIS WILL GO TO PROMISE'S .then()
      resolve(catdata);
    });
  });
};

// create a cat
/* accepts obejct parameter => {cat_name: "Mr. Mustaphales"} */
const createCat = (catObj) => {
  return new Promise ((resolve, reject) => {

    connection.query("INSERT INTO cats SET ?", catObj, (err, catdata) => {
      if (err) {
        console.log(err);
        //THIS WILL GO TO PROMISE'S .catch()
        return reject(err);
      }
      // THIS WILL GO TO PROMISE'S .then()
      resolve(catdata);
    });
  });
};

// Update a cat's adoption status
// catObj => {adopted: true} or {adopted: false}
const updateCat = (catObj, catId) => {
  return new Promise((resolve, reject) => {

    connection.query('UPDATE cats SET ? WHERE id = ?', [catObj, catId], (err, catdata) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else if (catdata.affectedRows === 0) {
        return resolve({message: "Couldn't find cat with that id!"});
      }
      resolve({message: "Cat updated successfully!"});
    });
  });
};

// Delete a cat
const deleteCat = (catId) => {
  return new Promise((resolve, reject) => {

    connection.query('DELETE FROM cats WHERE id = ?', [catId], (err, catdata) => {
      if (err) {
        console.log(err);
        return reject(err);
      } else if (catdata.affectedRows === 0) {
        return resolve({message: "Couldn't find a cat with that id!"});
      }
      resolve({message: "Cat deleted Successfully!"});
    });
  });
};

module.export = { getCats, createCat, updateCat, deleteCat };