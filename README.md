# UploadDragNDrop
jquery plugin for uploading files by drag n drop

#Usage
```
$('#dropZone').uploadDragNDrop({
	'upload' : 'upload.php', 
});
```
##Full example:
```
<!DOCTYPE html>
<html>
<head>
	<style type="text/css">
	.hover {
		border: 3px dashed blue !important;		
	}
	.error {
		background-color: red;
	}
	.dropZone {
		width: 500px;
		height: 500px;
		border: 1px solid black;
		float: left;
		margin-right: 20px;
	}	
	</style>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.js"></script>
	<script src="uploadDragNDrop.js"></script>
	<script>
		$(document).ready(function() {
			var settings = {
				'upload' : 'upload.php', 
				'hoverCssClass' : 'hover', 
				'errorCssClass' : 'error',
				'maxFileSize' : 1000000,
				'uploadProgressHandler' : function(event) {
					var percent = parseInt(event.loaded / event.total * 100);
					this.text('Loading: ' + percent + '%');
				},
				'okHandler' : function (settings) {					
					this.removeClass(settings['errorCssClass']);
					this.text('Files has been uploaded!');
				},
				'errorHandler' : function (settings, errorType) {				
					this.addClass(settings['errorCssClass']);
					switch (errorType) {
						case $.fn.uploadDragNDrop.errors.UPLOAD_ERROR:
							this.text('Error occured!');	
							break;
						case $.fn.uploadDragNDrop.errors.FILE_IS_TOO_BIG:
							$(this).text('The file is too big');
							break;
					}
				}
			};
			
			$('#dropZone').uploadDragNDrop(settings);
			settings['upload'] = 'badurl.php';
			$('#dropZoneError').uploadDragNDrop(settings);
		});  
	</script>
	<style>
	</style>
</head>
<body>    
	<div id="dropZone" class="dropZone">
        drag and drop a file to upload it
    </div>
	<div id="dropZoneError" class="dropZone">
        drag and drop a file to upload it (error)
    </div>
</body>
</html>
```
you can see example here: http://xn--c1abmgrdmpk4e.xn--p1ai/javascript/uploadjs/

##server side (PHP):
```
<?php
$uploaddir = getcwd().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR;
$uploadfile = $uploaddir.basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
?>
```