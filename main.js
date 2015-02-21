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
// Category Item List View
//
var CategoryItemListView = Backbone.View.extend({
template: _.template($('[data-template-name=category-item-list-template]').text()),
el: '.category-list',
events: {
  'click .apps': 'renderApps',
  'click .salad': 'renderSalad',
  'click .pizza': 'renderPizza',
  'click .drinks': 'renderDrinks',
},


createCategories: function(){
 this.categories = this.collection.groupBy(function(model){
   return model.get('itemCategory');

 });
},

renderApps: function() {

  $('.left-container').html(this.template);
  $('.category-name').text('Apps');
  var self = this;
  _.each(this.categories.Apps, function(item){
    var itemListView = new MenuItemListView({model: item});
    itemListView.render();
  });

},

renderSalad: function() {
  $('.left-container').html(this.template);
  $('.category-name').text('Salad');
  var self = this;
  _.each(this.categories.Salad, function(item){
    var itemListView = new MenuItemListView({model: item});
    itemListView.render();
  });
},

renderPizza: function() {
  $('.left-container').html(this.template);
  $('.category-name').text('Pizza');
  var self = this;
  _.each(this.categories.Pizza, function(item){
    var itemListView = new MenuItemListView({model: item});
    itemListView.render();
  });
},

renderDrinks: function() {
  $('.left-container').html(this.template);
  $('.category-name').text('Drinks');
  var self = this;
  _.each(this.categories.Drinks, function(item){
    var itemListView = new MenuItemListView({model: item});
    itemListView.render();
  });
},
});

//
// Menu Item List View
//
var MenuItemListView = Backbone.View.extend({
  template: _.template($('[data-template-name=category-item-template]').text()),
  tagName: 'li',
  className: 'category-item',
  events: {
    'click button': 'addOrderItem',
  },

  render: function(){
      var listItems = this.$el.html(this.template(this.model.toJSON()));
      _.each(listItems, function(item){
        var itemView = new MenuItemView({model: item});
        itemView.render();
      });
    },

    addOrderItem: function(){
        console.log(this.model);
    }
});

//
// Menu Item View
//
var MenuItemView = Backbone.View.extend({
  template: _.template($('[data-template-name=category-item-list-template]').text()),
  el: '.category-item-list',

  render: function(){
      this.$el.append(this.model);

    },
});

//
// Order Item List View
//
var OrderItemListView = Backbone.View.extend({

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
    this.menuItemListView = new MenuItemListView({collection: this.menuItems});
    this.categoryItemListView = new CategoryItemListView({collection: this.menuItems});
    // this.orderItemListView = new OrderItemListView();
  },

  index: function(){
    var self = this;
    this.menuItems.fetch().done(function(){
    self.categoryItemListView.createCategories();
    });
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
