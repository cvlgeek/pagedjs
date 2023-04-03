// INITIALIZE EDITOR
var editor = ace.edit('codeEditor');
editor.session.setUseWorker(false);
editor.setShowPrintMargin(false);
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");
editor.session.on('change', function(){parseDoc();});    

// PARSE EDITOR CONTENT
function parseDoc(){
  var sHead = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><script>window.PagedConfig={auto:false,after:(flow)=>{console.log('after',flow)},};</script><script src='https://cvlgeek.github.io/pagedjs/scripts/paged.polyfill.js'></script><link href='https://cvlgeek.github.io/pagedjs/styles/paged.css' rel='stylesheet' type='text/css'/></head><body>"
  var htmlSource = sHead + editor.getValue() + "<script>window.PagedPolyfill.preview();</script></body></html>";
  previewDoc(htmlSource);
}

// UPDATE PREVIEW ON EDITOR UPDATE
function previewDoc(htmlSource){
  var htmlDoc = document.getElementById('preview').contentDocument;
  htmlDoc.open();
  htmlDoc.write(htmlSource);
  htmlDoc.close();
}

// SHORTCUT KEYS
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

// ADD SHORTCUT KEYS TO APP
window.addEventListener('keydown', function (event) {
  if(event.ctrlKey){
    if(ctrlKeys.hasOwnProperty(event.key)){
      event.preventDefault();
      ctrlKeys[event.key].func();  
    }
  }
})

// ADD SHORTCUT KEYS TO EDITOR
for(i=0; i<ctrlKeys.length; i++){
  editor.commands.addCommand({
    name: ctrlKeys[i].name,
    bindKey: { win: "Ctrl-" + ctrlKeys[i].key, mac: "Command-" + ctrlKeys[i].key },
    exec: ctrlKeys[i].func
  });
}
