angular.module('CrudApp', ['ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'assets/tpl/lists.html', controller: ListCtrl}).
      when('/add-user', {templateUrl: 'assets/tpl/add-new.html', controller: AddCtrl}).
      when('/edit/:id', {templateUrl: 'assets/tpl/edit.html', controller: EditCtrl}).
      otherwise({redirectTo: '/'});
}]);

function ListCtrl($scope, $http) {
  $http.get('http://localhost/api/users').success(function(data) {
    $scope.users = data;
    console.log($scope.users);
  });
}

function AddCtrl($scope, $http, $location) {
  $scope.master = {};
  $scope.activePath = null;

  $scope.add_new = function(user, AddNewForm) {

    $http.post('http://localhost/api/new', user).success(function(){
      $scope.reset();
      $scope.activePath = $location.path('/');
    }).error(function (error) {
      console.log(error);

    });

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

  };
}

function EditCtrl($scope, $http, $location, $routeParams) {
  var id = $routeParams.id;
  $scope.activePath = null;

  $http.get('http://localhost/api/users/'+id).success(function(data) {
    $scope.users = data;

  });

  $scope.update = function(user){

    $http.put('http://localhost/api/update/'+id, user).success(function(data) {
      $scope.users = data;
      console.log($scope.users);

   $scope.activePath = $location.path('/');
    });
  };

  $scope.delete = function(user) {
    console.log(user);

    var deleteUser = confirm('Are you absolutely sure you want to delete?');
    if (deleteUser) {
      $http.delete('http://localhost/api/delete/'+user.id);
        $http.get('http://localhost/api/users').success(function(data) {
    $scope.users = data;
    console.log($scope.users);
  });
      $scope.activePath = $location.path('/');
    }
  };
}