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
