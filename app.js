(function() {
  var app = angular.module('exercise', ['exercise','ui.bootstrap']);

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
          $scope.totalItems = $scope.repos.length;
          $scope.currentPage = 1;
          $scope.itemsPerPage = 5;
        }
      });
    }
  });

})();
