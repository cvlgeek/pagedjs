// INITIALIZE EDITOR
var editor = ace.edit('codeEditor');
editor.session.setUseWorker(false);
editor.setShowPrintMargin(false);
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");
editor.session.on('change', function(){parseDoc();});

editor.setValue(`# Heading 1
## Heading 2
### Heading 3
This is paragraph 1 with **bold** words and an [image](https://d33wubrfki0l68.cloudfront.net/f1f475a6fda1c2c4be4cac04033db5c3293032b4/513a4/assets/images/markdown-mark-white.svg).
This is paragraph 2 with \\italic\\ words and a [hyperlink](https://www.google.com).
> blockquote
$$a^2+b^2=c^2$$
`);

// PARSE EDITOR CONTENT
function parseDoc(){
  var a = `<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta http-equiv='X-UA-Compatible' content='IE=edge'>
<meta name='viewport' content='width=device-width, initial-scale=1.0'>
<script>window.PagedConfig={auto:false,after:(flow)=>{console.log('after',flow)},};</script>
<script src='https://cvlgeek.github.io/pagedjs/scripts/paged.polyfill.js'></script>
<script src='https://cvlgeek.github.io/pagedjs/scripts/math.js'></script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<link href='https://cvlgeek.github.io/pagedjs/styles/paged.css' rel='stylesheet' type='text/css'/></head><body>`
  var b = editor.getValue(); // parse this for Markdown flags
    b = b.replace(/^### (.*$)/gim, '<h3>$1</h3>'); //### at beginning of line for H3
    b = b.replace(/^## (.*$)/gim, '<h2>$1</h2>'); // ## at beginning of line for H2
    b = b.replace(/^# (.*$)/gim, '<h1>$1</h1>'); // # at beginning of line for H1
    b = b.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>'); // > at beginning of line for blockquotes
    b = b.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>'); // **bold**
    b = b.replace(/\\\\(.*)\\\\/gim, '<i>$1</i>'); // \\italics\\
    b = b.replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />"); // ![alt text](image,jpg)
    b = b.replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>"); // [title](https://www.google.com)
    b = b.replace(/\n$/gim, '<br />'); // line break at each new line
    b = b.replace(/$$(.*)$$/gim, '<script>math.evaluate($1)</script>'); // $$ASCI math$$
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
    aKeys = Object.keys(ctrlKeys);
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
