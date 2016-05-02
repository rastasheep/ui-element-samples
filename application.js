angular
.module('main', [])
.controller('mainCtrl', function ($scope) {
	$scope.matchIndex = 1;
	$scope.numberOfMatches = 0;
	$scope.keyword = 'china';
	$scope.demoText = 'China cut interest rates unexpectedly on Friday, stepping up a campaign to prop up growth in the world\'s second-largest economy as it heads toward its slowest growth in nearly a quarter century. <br /> The cut-the first such move in over two years-came as factory growth has stalled and the property market, long a pillar of growth, has remained weak, dragging on broader activity and curbing demand for everything from furniture to cement and steel. <br /> "It\'s a surprise, another Friday night special," said Mark Williams, chief Asia economist with Capital Economics in London. "It may not have a major impact on GDP growth-that depends on if policymakers also allow the rate of credit growth to pick up." <br />Read MoreOil nears $80 on China rate cut, possible OPEC move<br /> The People\'s Bank of China said it was cutting one-year benchmark lending rates by 40 basis points to 5.6 percent. It lowered one-year benchmark deposit rates by less-25 basis points. The changes take effect from Saturday. <br />The central bank also took a step to free up deposit rates, allowing banks to pay depositors 1.2 times the benchmark level, up from 1.1 times previously. <br /> "They are cutting rates and liberalising rates at the same time so that the stimulus won\'t be so damaging," said Li Huiyong, an economist at Shenyin and Wanguo Securities. <br /> Bank lending tumbled in October and money supply growth cooled, raising fears of a sharper economic slowdown and prompting calls for more stimulus measures, including cutting interest rates. <br /> But many analysts had expected the central bank to hold off on reducing rates for now, since it has opted instead for measures like fiscal spending while trying to balance the need to reform the economy. <br /> Chinese leaders have also repeatedly stressed they would tolerate somewhat slower growth as long as the jobs market remained resilient, even as they rolled out a series of more modest stimulus measures this year. <br /> The risks faced by China\'s economy are not that scary and the government is confident it can head off the dangers, President Xi Jinping told global business leaders earlier this month, seeking to dispel worries about the world\'s economy. <br /> In a speech to chief executives at the Asia Pacific Economic Cooperation CEO Summit, Xi said even if China\'s economy were to grow 7 percent, that would still rank it at the forefront of the world\'s economies. China cut interest rates unexpectedly on Friday, stepping up a campaign to prop up growth in the world\'s second-largest economy as it heads toward its slowest growth in nearly a quarter century. <br /> The cut-the first such move in over two years-came as factory growth has stalled and the property market, long a pillar of growth, has remained weak, dragging on broader activity and curbing demand for everything from furniture to cement and steel. <br /> "It\'s a surprise, another Friday night special," said Mark Williams, chief Asia economist with Capital Economics in London. "It may not have a major impact on GDP growth-that depends on if policymakers also allow the rate of credit growth to pick up." <br />Read MoreOil nears $80 on China rate cut, possible OPEC move<br /> The People\'s Bank of China said it was cutting one-year benchmark lending rates by 40 basis points to 5.6 percent. It lowered one-year benchmark deposit rates by less-25 basis points. The changes take effect from Saturday. <br />The central bank also took a step to free up deposit rates, allowing banks to pay depositors 1.2 times the benchmark level, up from 1.1 times previously. <br /> "They are cutting rates and liberalising rates at the same time so that the stimulus won\'t be so damaging," said Li Huiyong, an economist at Shenyin and Wanguo Securities. <br /> Bank lending tumbled in October and money supply growth cooled, raising fears of a sharper economic slowdown and prompting calls for more stimulus measures, including cutting interest rates. <br /> But many analysts had expected the central bank to hold off on reducing rates for now, since it has opted instead for measures like fiscal spending while trying to balance the need to reform the economy. <br /> Chinese leaders have also repeatedly stressed they would tolerate somewhat slower growth as long as the jobs market remained resilient, even as they rolled out a series of more modest stimulus measures this year. <br /> The risks faced by China\'s economy are not that scary and the government is confident it can head off the dangers, President Xi Jinping told global business leaders earlier this month, seeking to dispel worries about the world\'s economy. <br /> In a speech to chief executives at the Asia Pacific Economic Cooperation CEO Summit, Xi said even if China\'s economy were to grow 7 percent, that would still rank it at the forefront of the world\'s economies.';
	$scope.nextMatch = function () {
		if ($scope.matchIndex < $scope.numberOfMatches ){
			$scope.matchIndex++;
		} else {
			$scope.matchIndex = 1;
		}
	}
	$scope.previousMatch = function () {
		if ($scope.matchIndex > 1){
			$scope.matchIndex--;
		} else {
			$scope.matchIndex = $scope.numberOfMatches;
		}
	}
}	)
.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if(event.which === 13) {
				if (event.shiftKey) {
					var func = attrs.ngShiftEnter
				} else{
					var func = attrs.ngEnter
				}
				scope.$apply(function(){
				scope.$eval(func, {'event': event});
				});

				event.preventDefault();
			}
		});
	};
})
.directive('highlight', function() {
	var currentMatch = 1;
	var component = function(scope, element, attrs) {

		if (!attrs.highlightClass) {
			attrs.highlightClass = 'angular-highlight';
		}

		var replacer = function(match, item) {
			scope.numberOfMatches++;
			currentMatch++
			if (currentMatch-1 === scope.currentMatchIndex){
				highlightClass = 'angular-highlight-current';
			}else{
				highlightClass = attrs.highlightClass;
			}
			return '<span class="'+highlightClass+'">'+match+'</span>';
		}

		var isScrolledIntoView = function(el) {
			if (!el) {
				return true
			}
			var elemTop = el.getBoundingClientRect().top;
			var elemBottom = el.getBoundingClientRect().bottom;

			var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
			return isVisible;
		}

		scope.$watch('keyword', function() {
			scope.currentMatchIndex = 1;
		});
		scope.$watchGroup(['keyword','currentMatchIndex'] , function() {
			// console.log("scope.keyword",scope.keyword);
			scope.numberOfMatches = 0;
			currentMatch = 1;
			if (!scope.keyword || scope.keyword == '') {
				scope.currentMatchIndex = 0;
				element.html(scope.highlight);
				return false;
			}

			var regex = new RegExp('('+scope.keyword.replace(/ /g,"\\s")+')', 'gmi')
			// console.log("regex",regex);

			// Find the words
			var html = scope.highlight.replace(regex, replacer);
			if(scope.numberOfMatches === 0){
				scope.currentMatchIndex = 0;
			}

			element.html(html);

			var selected = $(".angular-highlight-current")[0]
			if (!isScrolledIntoView(selected))
			$('html,body').animate({scrollTop: $(".angular-highlight-current").offset().top - 100 }, "fast");
		});
	}
	return {
		link:	component,
		replace: false,
		scope: {
			currentMatchIndex: '=',
			numberOfMatches: '=',
			highlight:	'=',
			keyword:	'='
		}
	};
});
