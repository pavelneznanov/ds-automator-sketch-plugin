import './message.js'

var pages = function (context) {
  var doc = context.document;
  // var pages = [doc pages];
  var pages = doc.getLayers();
  pages.sort(function(a, b) {
    // var pageA = [a name];
    // var pageB = [b name];
    var pageA = a.getLayersNamed(name);
    var pageB = b.getLayersNamed(name);
    if (pageA < pageB) {
      return -1;
    }
    if (pageA > pageB) {
      return 1;
    }
    return 0;
  });

  pages.forEach(function(page, i) {
    // let pageName = [page name];
    let pageName = page.getLayersNamed(name);
    let docRegex = /documentation/g;
    let comRegex = /components|Symbols/g;
    if (pageName.search(docRegex) != -1) {
      let pageMemo = pages[i];
      pageMemo.setName('1-documentation');
      pages.splice(i, 1);
      pages.unshift(pageMemo);
    }
    if (pageName.search(comRegex) != -1) {
      let pageMemo = pages[i];
      pageMemo.setName('0-components');
      pages.splice(i, 1);
      pages.unshift(pageMemo);
    }
  });

  pages.forEach(function(page, i) {
    // let pageName = [page name];
    let pageName = page.getLayersNamed(name);
    pageName = pageName.trim().replace(' ', '-');
    pageName = pageName.replace(/(_+)|(-+)/g, '-');
    pageName = pageName.replace(/-+/g, '-');
    let numberFilter = /[\d+]\-(\w+)/;
    if (pageName.search(numberFilter) == -1) {
      page.setName(i + '-' + pageName);
    }
  });

  message(doc, 'Список страниц оформатирован');
}

