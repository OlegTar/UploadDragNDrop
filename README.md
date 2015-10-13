# UploadDragNDrop
JQuery plugin for uploading files by drag n drop.

#Usage
```
$('#dropZone').uploadDragNDrop({
	'upload' : 'upload.php', 
});
```
##Parameters:
* ``` upload ``` — url for uploading files
* ``` hoverCssClass ``` - css class when you drag file over html element
* ``` errorCssClass ``` - css class when error happens (also you can define own error handler function)
* ``` maxFileSize ``` - max size of file
* ``` uploadProgressHandler ``` - function for showing progress, ***this*** is jquery object for drag'n'drop element, formal parameter is event, event.loaded - loaded bytes, event.total - total bytes
* ``` okHandler ``` - handler when uploading is successful, ***this*** is jquery object for drag'n'drop element, formal parameter is Settings object
* ``` errorHandler ``` - handler when uploading is successful, ***this*** is jquery object for drag'n'drop element, first formal parameter is Settings object, second is type of error:
	1. ``` $.fn.uploadDragNDrop.errors.FILE_IS_TOO_BIG ``` - file is too big
	2. ``` $.fn.uploadDragNDrop.errors.UPLOAD_ERROR ``` - upload error

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
You can see this example here: http://xn--c1abmgrdmpk4e.xn--p1ai/javascript/uploadjs/

##Server side (PHP):
```
<?php
$uploaddir = getcwd().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR;
$uploadfile = $uploaddir.basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
?>
```
