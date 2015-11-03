/* Controller for users page*/

angular.module("nukernUserController", ['ui.bootstrap'])
.controller("UserCtrl" ,['$http', '$scope', '$uibModal',

	function($http, $scope, $uibModal){

		//get single user info
		$http({
			method: 'GET',
			url: 'http://nukern-test.herokuapp.com/api/clients'
        })
		.then(function(data){
			$scope.users = data.data;
		}, 
		function(){
			alert("could not connect");
		});

		//create Modal to edit single user
		$scope.userModalClick = function(id) {
			$scope.id = id;
			var modalInstance = $uibModal.open({

				templateUrl:"partials/userModal.html",
				controller: "ModalUserCtrl",
				size: "lg",
				resolve: {
					id: function() {

						return $scope.id;
					}
				}
			});
		}

		//create Modal to add single user
		$scope.newUserModalClick = function() {

			var modalInstance = $uibModal.open({

				templateUrl:"partials/newUserModal.html",
				controller: "AddModalUserCtrl",
				size: "lg"
			});

		}
		
	}]);

/* Controller to edit single user modal */
angular.module("nukernUserController").controller("ModalUserCtrl", [ '$http', '$scope', '$uibModalInstance', 'id',
	function($http, $scope, $uibModalInstance, id){


		$scope.id = id;

		//Gets a single client's data or errors out
		$http({
			method: 'GET',
			//"http://nukern-test.herokuapp.com/api/clients" + id
			url: 'clients' + $scope.id + '.json'
		})
		.then(function(data){
				$scope.user = data.data;
				console.log($scope.user);
			},
			function(){
				alert("NOOO");
			}
		);

		$scope.ok = function() {

			$uibModalInstance.close();

			//Posts data
			$http({
				method: "PUT",
				url: "http://nukern-test.herokuapp.com/api/clients/" + $scope.id,
				data: $scope.user
			})
			.then(
				function(){
				},
				function(){
				}
			);

		};

		//function if user presses cancel on modal
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		}


	}]);


/* Add User Controller */

angular.module("nukernUserController")
.controller("NewUserCtrl" ,['$http', '$scope', '$uibModal',

	function($http, $scope, $uibModal){

		//create Modal to add single user
		$scope.newUserModalClick = function() {

			var modalInstance = $uibModal.open({

				templateUrl:"partials/newUserModal.html",
				controller: "AddModalUserCtrl",
				size: "lg"
			});

		}
		
	}]);


/*Controller to add a  user modal */

angular.module("nukernUserController").controller("AddModalUserCtrl", [ '$http', '$scope', '$uibModalInstance',
	function($http, $scope, $uibModalInstance){

		$scope.user;

		$scope.ok = function() {

			$uibModalInstance.close();

			//Posts data
			$http({
				method: "POST",
				url: "http://nukern-test.herokuapp.com/api/clients/",
				data: $scope.user
			})
			.then(
				function(){
				},
				function(){
				}
			);

		};

		//function if user presses cancel on modal
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		}
	}]);