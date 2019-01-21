export function pages(context) {
  var doc = context.document;
  var pages = doc.pages();
  var selection = context.selection;
  var ui = require('sketch/ui');
  let checkCyrillic;
  pages.forEach(function (page) {
    let pageName = page.name();
    let cyrillicRegex = /[а-яА-Я]/g;
    if (pageName.search(cyrillicRegex) != -1) {
      checkCyrillic = true;
    }
  });
  if (checkCyrillic) {
    ui.alert('Attention!', 'Page names should not contain Cyrillic characters');
  } else {
    pages.sort(function (a, b) {
      let pageA = a.name().toLowerCase();
      let pageB = b.name().toLowerCase();
      let numberFilter = /(\d+)-([a-zA-Zа-яА-Я]+|\d+)-*/g;
      if (pageA.search(numberFilter) == -1 || pageB.search(numberFilter) == -1) {
        if (pageA < pageB) {
          return -1;
        }
        if (pageA > pageB) {
          return 1;
        }
        return 0;
      }
    });
    pages.forEach(function (page, i) {
      let pageName = page.name();
      let docRegex = /documentation/g;
      let comRegex = /components|Symbols/g;
      if (pageName !== '1-components') {
        if (pageName.search(comRegex) != -1) {
          let pageMemo = pages[i];
          pageMemo.setName('1-components');
          pages.splice(i, 1);
          pages.unshift(pageMemo);
        }
      }
    });
    pages.forEach(function (page, i) {
      let pageName = page.name();
      pageName = pageName.trim().replace(' ', '-');
      pageName = pageName.replace(/(_+)|(-)|(\s)/g, '-');
      pageName = pageName.replace(/-+/g, '-');
      pageName = pageName.toLowerCase();
      let numberFilter = /(\d+)-([a-zA-Zа-яА-Я]+|\d+)-*/g;
      if (pageName.search(numberFilter) == -1) {
        page.setName(i + 1 + '-' + pageName);
      }
    });
    doc.showMessage('All pages has been formatted');
  }
}