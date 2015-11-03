/* Controller for users page*/

angular.module("nukernUserController", ['ui.bootstrap'])
.controller("UserCtrl" ,['$http', '$scope', '$uibModal',

	function($http, $scope, $uibModal){

		//Alerts
		$scope.alerts = [];


		//Close the alert
		$scope.closeAlert = function(index) {
    		$scope.alerts.splice(index, 1);
  		};

		//get single user info
		$http({
			method: 'GET',
			url: 'http://nukern-test.herokuapp.com/api/clients'
        })
		.then(function(data){
			$scope.users = data.data;
		}, 
		function(){
			$scope.alerts.push({type:'danger', msg: 'Could Not Connect'});
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

			//Gets results from Modal to return alert messages
			modalInstance.result.then(function(alerts){
				$scope.alerts.push(alerts[0]);
			});
		}


		//create Modal to add single user
		$scope.newUserModalClick = function() {

			var modalInstance = $uibModal.open({

				templateUrl:"partials/newUserModal.html",
				controller: "AddModalUserCtrl",
				size: "lg"
			});

			//Gets results from Modal to return alert messages
			modalInstance.result.then(function(alerts){
				$scope.alerts.push(alerts[0]);
			});
		}


		
	}]);

/* Controller to edit single user modal */
angular.module("nukernUserController").controller("ModalUserCtrl", [ '$http', '$scope', '$uibModalInstance', 'id',
	function($http, $scope, $uibModalInstance, id){

		//Save the id to scope
		$scope.id = id;

		//Alerts
		$scope.alerts = [];

		//Gets a single client's data or errors out
		$http({
			method: 'GET',
			url: 'clients' + $scope.id + '.json'
		})
		.then(function(data){
				$scope.user = data.data;
				console.log($scope.user);
			},
			function(){
				$scope.alerts.push({type:'danger', msg: 'Could Not Connect'});
			}
		);

		$scope.ok = function() {


			//PUTS data
			$http({
				method: "PUT",
				url: "http://nukern-test.herokuapp.com/api/clients/" + $scope.id,
				data: $scope.user
			})
			.then(
				function(){
					$scope.alerts.push({type:'success', msg: 'Edits Saved'});
					$uibModalInstance.close($scope.alerts);
				},
				function(){
					$scope.alerts.push({type:'danger', msg: 'Edits Not Saved'});
					$uibModalInstance.close($scope.alerts);
				}
			);

		};

		//function if user presses cancel on modal
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		}


	}]);




/*Controller to add a  user modal */

angular.module("nukernUserController").controller("AddModalUserCtrl", [ '$http', '$scope', '$uibModalInstance',
	function($http, $scope, $uibModalInstance){

		$scope.user;
		$scope.alerts = [];

		$scope.ok = function() {


			//Posts data
			$http({
				method: "POST",
				url: "http://nukern-test.herokuapp.com/api/clients/",
				data: $scope.user
			})
			.then(
				function(){
					$scope.alerts.push({type:'success', msg: 'New Edits Saved'});
					$uibModalInstance.close($scope.alerts);
				},
				function(){
					$scope.alerts.push({type:'danger', msg: 'New User Not Saved'});
					$uibModalInstance.close($scope.alerts);
				}
			);

		};

		//function if user presses cancel on modal
		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		}
	}]);