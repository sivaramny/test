    // define the module we're working with
    var app = angular.module('sse', []);
 
    // define the ctrl
    function statCtrl($scope) {
 
        // the last received msg
        $scope.msg = {};

        console.log(JSON.stringify($scope.msg));
    
        // handles the callback from the received event
        var handleCallback = function (msg) {
            $scope.$apply(function () {
                $scope.msg = JSON.parse(msg);
                 console.log($scope.msg);
            });

        }
 
        var source = new EventSource('/stats');
        console.log(source);
        source.addEventListener('message', function(e) {
          var data = JSON.parse(e.data);
          console.log(data.id, data.msg);
        }, false);
      }
