MyApp.factory("AppService", function($state) {
    return {
      exit: () => {
        localStorage.removeItem("auth");
        $state.go("login");
      },
  
      get: item => {
        const listLocalStotage = localStorage.getItem(item);
        if (listLocalStotage !== null) {
          return JSON.parse(listLocalStotage);
        }
      },
      save: (item, object) => {
        localStorage.setItem(item, JSON.stringify(object));
      }
    };
  });