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

editor.commands.addCommand({
                    name: "myCommand",
                    bindKey: { win: "Ctrl-P", mac: "Command-P" },
                    exec: function (editor) {
                              document.getElementById('preview').contentWindow.print();;
                    }
});

var ctrlKeys = {
  p: function(){document.getElementById('preview').contentWindow.print();},
  P: function(){document.getElementById('preview').contentWindow.print();}
}
window.addEventListener('keydown', function (event) {
  if(event.ctrlKey){
    if(ctrlKeys.hasOwnProperty(event.key)){
        ctrlKeys[event.key];
        event.preventDefault();
    }
  }
})
