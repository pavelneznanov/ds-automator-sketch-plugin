export function artboards(context) {
  var doc = context.document;
  var pages = doc.pages();
  let renamedArtboardsCounter = 0;
  pages.forEach(function(page) {
    //console.log(page);
    //console.log(page.name());
    //console.log(page.artboards());
    let artboardList = page.artboards();
    artboardList.forEach(function(artboard) {
      //console.log(artboard.name());
      let artboardName = artboard.name();
      if (artboardName.match(/[\s]|[\.]|[\\]|[_]|\w*copy\w*|-{2}/g)) {
        artboardName = artboardName.toLowerCase().trim().replace(/(\\+)|(\.+)|\s+\b(\w*copy\w*)|\s+\d+\b/g, '');
        artboardName = artboardName.trim().replace(/([\s]+|[_]+|[-]+)+/g, '-');
        artboard.setName(artboardName);
        renamedArtboardsCounter ++;
      }
      //console.log(artboard.name());
    });
  });
  if (renamedArtboardsCounter === 0) {
    doc.showMessage('All artboard titles is perfect');
    //console.log('All artboard titles is perfect');
  } else {
    doc.showMessage(renamedArtboardsCounter + ' artboards has been renamed');
    //console.log(renamedArtboardsCounter + ' artboards renamed');
  }
};
 //artboards(context);