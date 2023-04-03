    function previewDoc(){
      var htmlSource = editor.getValue();
      var htmlDoc = document.getElementById('preview').contentDocument;
      htmlDoc.open();
      htmlDoc.write(htmlSource);
      htmlDoc.close();
    }
