var zumWaypointContainer = function zumWaypointContainer() {
	'use strict';

	return {
		restrict: 'A',
		// We have to use controller instead of link here so that it will
		// always run earlier than nested waypoint directives
		controller: ['$scope', '$element', function ($scope, $element) {
			$element.data('WaypointContainer', $element);
		}]
	};
};

var zumWaypoint = function zumWaypoint($window, WaypointService) {
	return {
		controller : 'WaypointController',
		scope : {
			up : '@',
			down : '@',
			offset : '@',
			waypoints : '=?zumWaypoint'
		},
		link : function zumWaypointLink(scope, element, attrs, ctrl) {
			var callback = angular.bind(ctrl, ctrl.processWaypoint);
			/*jshint -W031 */

			var options = {
				element: element[0],
				handler : WaypointService.getHandlerSync(scope, callback),
				offset : scope.offset || 0
			};

			var $context = element.inheritedData('WaypointContainer');
			if($context){
				options.context = $context.context;
			}

			new $window.Waypoint(options);
			/*jshint +W031 */
		}
	};
};
