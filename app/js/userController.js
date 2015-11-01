/* Controller for users page*/

angular.module("nukernUserController" ,[])
.controller("UserCtrl" ,['$http', '$scope', '$uibModal',

	function($http, $scope, $uibModal){

		//get single user info
		$http({
			method: 'GET',
			//http://nukern-test.herokuapp.com/api/clients
			url: 'clients.json'
        })
		.then(function(data){
			$scope.users = data.data;
			console.log($scope.users);
		}, 
		function(){
			alert("could not connect")
		});

		//create Modal based on id
		$scope.userModalClick = function(id) {
			var modalInstance = $uibModal.open({

				templateUrl:"partials/userModal.html",
				controller: "",
				resolve: {
					user: function() {

						return id;
					}
				}
			});
		}
	}]);

/* Controller for single user modal */
