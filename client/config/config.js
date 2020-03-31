MyApp.config(function($stateProvider, $urlRouterProvider) {
    let loginState = {
      name: "login",
      url: "/login",
      component: "login"
    };
  
    let chatPanel = {
      name: "chat",
      url: "/chat",
      component: "chat"
    };
  
    $stateProvider.state(loginState);
    $stateProvider.state(chatPanel);
  
    $urlRouterProvider.otherwise("/login");
  });
  