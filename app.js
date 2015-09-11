(function() {
  var app = angular.module('exercise', ['exercise']);

  app.factory('GitHub', function GitHub($http) {
    return {
      searchRepos: function searchRepos(query, callback) {
        $http.get('https://api.github.com/search/repositories', {
            params: {
              q: query
            }
          })
          .success(function(data) {
            callback(null, data);
          })
          .error(function(e) {
            callback(e);
          });
      }
    };
  });

  app.controller('mainController', function mainController($scope, GitHub) {
    $scope.executeSearch = function() {
      GitHub.searchRepos($scope.query, function (error, data) {
        if (!error) {
          $scope.repos = data.items;
        }
      });
    }
  });

})();
