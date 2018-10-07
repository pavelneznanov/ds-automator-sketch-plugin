export function pages (context) {
  var doc = context.document;
  var pages = doc.pages();
  var selection = context.selection;
  var UI = require('sketch/ui');

  let checkCyrillic;
  pages.forEach(function(page) {
    let pageName = page.name();
    let cyrillicRegex = /[а-яА-Я]/g;
    if (pageName.search(cyrillicRegex) != -1) {
      checkCyrillic = true;
    }
  });
  if (checkCyrillic) {
    UI.alert('Внимание!', 'Названия страниц не должны содержать кириллические символы.');
  } else {

    pages.sort(function(a, b) {
      var pageA = a.name();
      var pageB = b.name();
      // return a-b;
      if (pageA < pageB) {
        return -1;
      }
      if (pageA > pageB) {
        return 1;
      }
      return 0;
    });

    pages.forEach(function(page, i) {
      let pageName = page.name();
      let docRegex = /documentation/g;
      let comRegex = /components|Symbols/g;
      if (pageName.search(docRegex) != -1) {
        let pageMemo = page;
        pageMemo.setName('2-documentation');
        pages.splice(i, 1);
        pages.splice(0, 0, pageMemo);
      }
      if (pageName.search(comRegex) != -1) {
        let pageMemo = pages[i];
        pageMemo.setName('1-components');
        pages.splice(i, 1);
        pages.unshift(pageMemo);
      }
    });
    
    pages.forEach(function(page, i) {
      let pageName = page.name();
      pageName = pageName.trim().replace(' ', '-');
      pageName = pageName.replace(/(_+)|(-)|(\s)/g, '-');
      pageName = pageName.replace(/-+/g, '-');
      pageName = pageName.toLowerCase();
      let numberFilter = /(\d+)-([a-zA-Zа-яА-Я]+|\d+)-*/g;
      if (pageName.search(numberFilter) == -1) {
        page.setName(i+1 + '-' + pageName);
      }
    });
    doc.showMessage('All pages has been formatted.');
  }
}