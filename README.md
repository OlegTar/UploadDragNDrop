# UploadDragNDrop 1.1
JQuery plugin for uploading files by drag n drop.

#Usages
```javascript
$('#dropZone').uploadDragNDrop({
	'upload' : 'upload.php', 
});
```
```javascript
$('#dropZone').uploadDragNDrop({
	'upload' : 'upload.php', 
	'okHandler' : function (settings) {					
		this.text('File has been uploaded!');
	}
});
```
```javascript
$('#dropZone').uploadDragNDrop({
	'upload' : 'upload.php', 
	'maxFileSize' : 5000000,
	'hoverCssClass' : 'myHoverClass',
	'okHandler' : function (settings) {					
		this.text('File has been uploaded!');
	}
});
```
##Parameters
* ``` upload ``` — url for uploading files, *requrired*
* ``` hoverCssClass ``` - css class when you drag file over html element *(optional, default: '')*
* ``` errorCssClass ``` - css class when error happens (also you can define own error handler function) *(optional, default: '')*
* ``` maxFileSize ``` - max size of file *(optional, default: 5000000)*
* ``` uploadProgressHandler ``` - ``` function(event) ```
	* ``` event ``` - event object, event.loaded is loaded bytes, event.total is total bytes
	* **this** is jquery object for drag'n'drop element
* ``` okHandler ``` - ``` function(responseText, settings) ```, handler when uploading is successful
	* ```responseText``` - response from server
	* ```settings``` - object passed to uploadDragNDrop constructor
	* **this** is jquery object for drag'n'drop element,
* ``` errorHandler ``` - ``` function(settings, typeOfError) ``` - handler when uploading is not successful
	* ```settings``` - object passed to uploadDragNDrop constructor
	* ```error``` - type of error:
		- ``` $.fn.uploadDragNDrop.errors.FILE_IS_TOO_BIG ``` - file is too big
		- ``` $.fn.uploadDragNDrop.errors.UPLOAD_ERROR ``` - upload error
	* **this** is jquery object for drag'n'drop element 
* ``` paramName ``` - parameter name in http request of file attachment *(optional, default: 'file')*

##Full example
```html
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
				'okHandler' : function (responseText, settings) {					
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

#Server Side Example (PHP)
```php
<?php
$uploaddir = getcwd().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR;
$uploadfile = $uploaddir.basename($_FILES['file']['name']);
move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile);
?>
```
