export function artboards(context) {
  var doc = context.document;
  var pages = doc.pages();
  pages.forEach(function(page) {
    //console.log(page);
    //console.log(page.name());
    //console.log(page.artboards());
    let artboardList = page.artboards();
    artboardList.forEach(function(artboard) {
      console.log(artboard.name());
      let artboardName = artboard.name();
      artboardName = artboardName.replace(/([\s]+|[_]+|[-]+)+/g, '-').toLowerCase();
      artboard.setName(artboardName);
      console.log(artboard.name());
    });
  });
  doc.showMessage('All artboards renamed');
};
// artboards(context);