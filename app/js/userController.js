/* Controller for users page*/

angular.module("nukernUserController", ['ui.bootstrap'])
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
		}, 
		function(){
			alert("could not connect")
		});

		//create Modal based on id
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
	}]);

/* Controller for single user modal */
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

		//returns edited user data from modal form and posts it
		$scope.ok = function() {
			uibModalInstance.close($scope.user);
			$scope.user = uibModalInstance.result;

			//Posts data
			$http({
				method: "POST",
				url: "clients" + $scope.id + '.json',
				data: $scope.user
			})
			.then(
				function(){

				},
				function(){

				}
			);

		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		}
	}]);