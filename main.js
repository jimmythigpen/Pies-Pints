(function(){

//
// Menu Item Model
//
var MenuItemModel = Backbone.Model.extend({
  idAttribute: 'objectId'
});

//
// Menu Items Collection
//
var MenuItemsCollection = Backbone.Collection.extend({
  model: MenuItemModel,

  url: 'https://api.parse.com/1/classes/menuItems',

  parse: function(response){
    return response.results;
  }

});

//
// Menu Category List View
//
var MenuCategoryListView = Backbone.View.extend({

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.createCategories);
  },

  createCategories: function(){

    var categories = this.collection.groupBy(function(model){
      return model.get('itemCategory');
  });

    console.log(categories);
},

});

//
// Menu Category Item View
//
var MenuCategoryItemView = Backbone.View.extend({
  tagName: 'h3',


});

//
// App Router
//
var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function(){
    this.menuItems = new MenuItemsCollection();
    this.menuCategoryListView = new MenuCategoryListView({collection: this.menuItems});
  },

  index: function(){
    this.menuItems.fetch();
  }

});

//
// Config
//

$.ajaxSetup({
  headers: {
  "X-Parse-Application-Id": "t7T9Y0bRekt4CoVhSC5FQYMtv32wTSfkCbAVmOmk",
  "X-Parse-REST-API-Key": "Yebr0pFWRf9n3m5gpTj81e2a7NMXRcwsrbexxlJb"
  }
});

//
// Glue Code
//
$(document).ready(function(){
  window.router = new AppRouter();
  Backbone.history.start();
});

}());
