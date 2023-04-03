// INITIALIZE EDITOR
var editor = ace.edit('codeEditor');
editor.session.setUseWorker(false);
editor.setShowPrintMargin(false);
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");
editor.session.on('change', function(){parseDoc();});
editor.insert("Hello World");

// PARSE EDITOR CONTENT
function parseDoc(){
  var a = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'>";
  a = a + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  a = a + "<script>window.PagedConfig={auto:false,after:(flow)=>{console.log('after',flow)},};</script>";
  a = a + "<script src='https://cvlgeek.github.io/pagedjs/scripts/paged.polyfill.js'>";
  a = a + "</script><link href='https://cvlgeek.github.io/pagedjs/styles/paged.css' rel='stylesheet' type='text/css'/></head><body>";
  var b = editor.getValue(); // parse this for Markdown flags
  var c = "<script>window.PagedPolyfill.preview();</script>"; // may need to call math.js and mathjax before PagedPolyfill.preview()
  c = c + "</body></html>";
  var htmlSource = a+b+c;
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
    aKeys = ctrlKeys.keys();
    sKey = (event.key).toUpperCase();
    if(aKeys.includes(sKey)){
      event.preventDefault();
      ctrlKeys[sKey].func();
    }
  }
})

// ADD SHORTCUT KEYS TO EDITOR
function add2Ace(){
  aKeys = ctrlKeys.keys();
  aKeys.forEach(function(v,i,a){
    editor.commands.addCommand({
      name: ctrlKeys[aKeys[i]].name,
      bindKey: { win: "Ctrl-"+aKeys[i], mac: "Command-"+aKeys[i] },
      exec: ctrlKeys[aKeys[i]].func
    });
  })
}
