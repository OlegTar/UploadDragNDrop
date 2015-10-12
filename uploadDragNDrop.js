(function( $ ) {			
	function defaultUploadProgress(event) {
		var percent = parseInt(event.loaded / event.total * 100);
		this.text('Loading: ' + percent + '%');
	}
	
	function defaultOkHandler(settings) {
		this.text('Done!');
		
		if (settings['errorCssClass'] !== '') {
			this.removeClass(settings['errorCssClass']);
		}
	}
	
	function defaultErrorHandler(settings, typeOfError) {
		switch (typeOfError) {
			case $.fn.uploadDragNDrop.errors.UPLOAD_ERROR:
				this.text('Error occured!');	
				break;
			case $.fn.uploadDragNDrop.errors.FILE_IS_TOO_BIG:
				$(this).text('The file is too big');
				break;
		}
		
		if (settings['errorCssClass'] !== '') {
			this.addClass(settings['errorCssClass']);
		}
	}	
	
	function stateChange(event) {
		if (event.target.readyState == 4) {
			var $element = this['$element']
			delete this['$element'];
			
			if (event.target.status == 200) {			
				this['settings']['okHandler'].call($element, this['settings']);
			} else {				
				this['settings']['errorHandler'].call($element, this['settings'], $.fn.uploadDragNDrop.errors.UPLOAD_ERROR);
			}
		}
	}	

	$.fn.uploadDragNDrop = function(options) {
		var settings = $.extend({
			'hoverCssClass' : '',
			'errorCssClass' : '',
			'maxFileSize' : 5000000,
			'uploadProgressHandler': defaultUploadProgress,
			'okHandler': defaultOkHandler,
			'errorHandler': defaultErrorHandler,
		}, options);			
		
		if (typeof settings['upload'] !== 'string') {
			throw('uploadDragNDrop: upload is not set');
		}

		this.bind('dragover', function () {
			if (settings['hoverCssClass'] !== '') {
				$(this).addClass(settings['hoverCssClass']);
			}
			return false;
		});
		
		this.bind('dragleave', function () {			
			if (settings['hoverCssClass'] !== '') {
				$(this).removeClass(settings['hoverCssClass']);
			}
			return false;
		});
		
		this.bind('drop', function (event) {
			event.preventDefault();
			if (settings['hoverCssClass'] !== '') {
				$(this).removeClass(settings['hoverCssClass']);
			}
			
			var file = event.originalEvent.dataTransfer.files[0];
        
			if (file.size > settings['maxFileSize']) {
				settings['errorHandler'].call($(this), settings, $.fn.uploadDragNDrop.errors.FILE_IS_TOO_BIG);
				return false;
			}
			
			var formData = new FormData();
			formData.append('file', file);
			
			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener('progress', settings['uploadProgressHandler'].bind($(this)), false);
			var obj = {
				$element: $(this),
				settings: settings
			};			
			xhr.onreadystatechange = stateChange.bind(obj);
			xhr.open('POST', settings['upload']);
			xhr.send(formData);
		});
		return this;
	};
	
	$.fn.uploadDragNDrop.errors = {
		FILE_IS_TOO_BIG: 1,
		UPLOAD_ERROR: 2,
	};
})(jQuery);
