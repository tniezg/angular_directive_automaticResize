define(['jquery'], function ($) {
	var automaticResize = ['$sniffer', '$parse', function ($sniffer, $parse) {
			return {
				restrict: 'A',
				require: '?ngModel',
				link:function(scope, element, attributes, ctrl){
					if(!ctrl) return;

					var resize=function(scope){
						var minWidth=attributes.minWidth||100;
	        	var maxWidth=attributes.maxWidth||500;
	        	var newWidth;
	        	var jqElement=$(element);
	        	// it should return by itself to the position of the cursor
	        	// search for better solution, without changing the width to 0
	        	minWidth=parseInt(minWidth);
	        	maxWidth=parseInt(maxWidth);
	        	jqElement.width(minWidth);
	        	jqElement.scrollLeft(1e10);
	        	newWidth=jqElement.scrollLeft()+minWidth;
	        	if(newWidth>maxWidth){
	        		jqElement.width(maxWidth);
	        	}else{
	        		jqElement.width(newWidth);
	        	}
					};

					ctrl.$render = function() {
	          element.val(ctrl.$viewValue || '');
	          resize(scope);
	        };

	        if ($sniffer.hasEvent('input')) {
	        	element.bind('input', function() {
		          scope.$apply(read);
		        });	
	        }else{
		        element.bind('keydown change', function() {
		          scope.$apply(read);
		        });
		      }

	        // Write data to the model
	        function read() {
	          ctrl.$setViewValue(element.val());
	          resize(scope);
	        }

					scope.$watch(function(scope) {
		        	return scope.$eval(attributes.minWidth);
		        },function(value){
		        	resize(scope);
		      });

		      scope.$watch(function(scope) {
		        	return scope.$eval(attributes.maxWidth);
		        },function(value){
		        	resize(scope);
		      });
				}
			}
		}];

	return automaticResize;
});