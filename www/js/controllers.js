angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope,HomeExchangeList,Search,$log) {
  var hhhh = Search.all();
  var dd=[];
  var j=0;
  for(var i=0;i< hhhh.length;i++)
  {
    if(hhhh[i].checked==true)
    {
      HomeExchangeList.getHomeExchange(hhhh[i].id1,hhhh[i].image).success(function(data) {
        dd[j++]=data;
      });
    }
  }
  $scope.playlists =dd;
  $scope.$on("Ctr1NameChange", function (event, msg) {
  if(hhhh[msg].checked==true){
    hhhh[msg].checked=false;
  }
    else{
    hhhh[msg].checked=true;
  }
    for(var i=0;i< hhhh.length;i++)
    {
      if(hhhh[i].checked==true)
      {
        HomeExchangeList.getHomeExchange(hhhh[i].id1).success(function(data) {
          dd[j++]=data;
        });
      }
    }
    $scope.playlists =dd;
    $scope.$apply();
  });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
  .controller('LoginCtrl', function($scope, $stateParams) {
  })
.controller('searchCtrl', function($scope, $stateParams,Search) {
  $scope.items = Search.all();
  $scope.myFunc = function(ff) {
    $scope.$broadcast("Ctr1NameChange",ff);
  };
});
