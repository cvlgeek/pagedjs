var editor = ace.edit('codeEditor');
editor.session.setUseWorker(false);
editor.setShowPrintMargin(false);
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");
editor.session.on('change', function(){previewDoc()});    

function previewDoc(){
  var htmlSource = editor.getValue();
  var htmlDoc = document.getElementById('preview').contentDocument;
  htmlDoc.open();
  htmlDoc.write(htmlSource);
  htmlDoc.close();
}
