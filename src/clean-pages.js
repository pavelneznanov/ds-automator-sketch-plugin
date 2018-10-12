export function cleanCurrentArtboards (context) {
  var doc = context.document;
  var pages = doc.pages();
  var selection = context.selection;
  var ui = require('sketch/ui');

  let checkCyrillic;
  pages.forEach(function(page) {
    let pageName = page.name();
    let cyrillicRegex = /[а-яА-Я]/g;
    if (pageName.search(cyrillicRegex) != -1) {
      checkCyrillic = true;
    }
  });
  if (checkCyrillic) {
    ui.alert('Attention!', 'Page names should not contain Cyrillic characters');
  } else {

    pages.forEach(function(page) {
      let pageName = page.name();
      pageName = pageName.replace( /[\d]+\-+/, '');
      page.setName(pageName);
    });

    doc.showMessage('All page numbers are deleted');
  }
}