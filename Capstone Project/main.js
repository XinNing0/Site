
const app = angular.module('app', []);
app.controller('ctrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    // $scope.request = function () {
    //     $.get("http://localhost:3000/search?request=" + angular.uppercase($scope.name), function () {
    //     });
    // }

    $scope.trustSrc = (src) => {
        return $sce.trustAsResourceUrl(src);
    }

    console.log('yo');
    $(document).ready(function(){
        console.log('done');

    $(window).resize(function() {
        if($(window).width() < 700) {
            $("#CitPage").css("margin-right", "10px");
            $("#HowPage").css("margin-right", "10px");
        }
        if($(window).width() >= 700) {
            $("#CitPage").css("margin-right", "25px");
            $("#HowPage").css("margin-right", "25px");
        }
    });

});
}]);
