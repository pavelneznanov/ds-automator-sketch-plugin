export function cleanPages (context) {
  var doc = context.document;
  // var ui = require('sketch/ui');
  // var pages = doc.pages();
  // var selection = context.selection; 

  log(test);
  doc.showMessage('test');


  // let checkCyrillic;
  // pages.forEach(function(page) {
  //   let pageName = page.name();
  //   let cyrillicRegex = /[а-яА-Я]/g;
  //   if (pageName.search(cyrillicRegex) != -1) {
  //     checkCyrillic = true;
  //   }
  // });
  // if (checkCyrillic) {
  //   ui.alert('Attention!', 'Artboards names should not contain Cyrillic characters');
  // } else {

  //     doc.showMessage('test');
  //   // pages.forEach(function(page) {
  //   //   let pageName = page.name();
  //   //   pageName = pageName.replace( /[\d]+\-+/, '');
  //   //   page.setName(pageName);
  //   // });

  //   // doc.showMessage('All artboards numbers are deleted');
  // }
}