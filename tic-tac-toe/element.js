'use strict';

class DataStore {

  constructor($http) {
    this.http = $http;
    this.title = '[Element name]';
  }
}

class MainController {

  static factory(dataStore) {
    return new MainController(dataStore);
  }

  constructor(dataStore) {
    this.title = dataStore.title;
  }

}

angular
  .module('main', [])
  .service('DataStore', ['$http', DataStore])
  .controller('mainController', ['DataStore', MainController.factory]);
