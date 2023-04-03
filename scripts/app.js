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

var ctrlKeys = {
  P: {
    name: "Print",
    func: function(){
      document.getElementById('preview').contentWindow.print();
    }
  },
  S: {
    name: "Save",
    func: function(){
      alert("I don't know how to save this yet.");
    }
  }
}

for(i=0; i<ctrlKeys.length; i++){
  editor.commands.addCommand({
    name: ctrlKeys[i].name,
    bindKey: { win: "Ctrl-" + ctrlKeys[i].key, mac: "Command-" + ctrlKeys[i].key },
    exec: ctrlKeys[i].func
  });
}

window.addEventListener('keydown', function (event) {
  if(event.ctrlKey){
    alert(event.key.toUpperCase(););
    if(ctrlKeys.hasOwnProperty(event.key)){
        ctrlKeys[event.key].func();
        event.preventDefault();
    }
  }
})
