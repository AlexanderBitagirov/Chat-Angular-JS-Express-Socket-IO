function loginController($scope, $state, AppService) {

    $scope.login = (user) => {
        let a = user
        AppService.save("Auth", a)
        $state.go("chat")
    }
}


angular.module("MyApp").component("login", {
    controller: loginController,
    templateUrl: "./components/login/login.html"
});