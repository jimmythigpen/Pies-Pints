(function(){

//
// Menu Item Model
//
var MenuItemModel = Backbone.Model.extend({
  idAttribute: 'objectId'
});

//
// Order Item Model
//
var OrderItemModel = Backbone.Model.extend({
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
// Order Items Collection
//
var OrderItemsCollection = Backbone.Collection.extend({
  model: OrderItemModel,

  url: 'https://api.parse.com/1/classes/orders',

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

  renderApps: function(e) {
    e.preventDefault();
    $('.left-container').html(this.template);
    $('.category-name').text('Apps');
    var self = this;
    _.each(this.categories.Apps, function(item){
      var itemListView = new MenuItemListView({model: item});
      itemListView.render();
    });
  },

  renderSalad: function(e) {
    e.preventDefault();
    $('.left-container').html(this.template);
    $('.category-name').text('Salad');
    var self = this;
    _.each(this.categories.Salad, function(item){
      var itemListView = new MenuItemListView({model: item});
      itemListView.render();
    });
  },

  renderPizza: function(e) {
    e.preventDefault();
    $('.left-container').html(this.template);
    $('.category-name').text('Pizza');
    var self = this;
    _.each(this.categories.Pizza, function(item){
      var itemListView = new MenuItemListView({model: item});
      itemListView.render();
    });
  },

  renderDrinks: function(e) {
    e.preventDefault();
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

  addOrderItem: function(e){
      e.preventDefault();
      this.orderItem = new OrderItemModel({itemName: this.model.attributes.itemName, itemPrice: this.model.attributes.itemPrice});
      window.orderItems.add(this.orderItem);
      this.orderTotal(this.orderItem.attributes.itemPrice);

      _.each(window.orderItems.models, function(Item){
      var orderItemView = new OrderItemListView({model:Item});
      orderItemView.render();

    });
  },

  orderTotal: function(addItem){
    window.total = window.total + addItem;
    $('.order-total').text('$' + window.total);
  },

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
  template: _.template($('[data-template-name=order-item-template]').text()),
  tagName: 'li',
  events: {
    'click .js-delete': 'removeOrderItem'
  },


  render: function(){
      var OrderlistItems = this.$el.html(this.template(this.model.toJSON()));
        _.each(OrderlistItems, function(item){
          var orderItemView = new OrderItemView({model: item});
          orderItemView.render();
      });
    },

    removeOrderItem: function(){
      window.total = window.total - this.model.attributes.itemPrice;
      $('.order-total').text('$' + window.total);
      window.orderItems.remove(this.model);
      this.remove();
    }
});

//
// Order Item View
//
var OrderItemView = Backbone.View.extend({
  template: _.template($('[data-template-name=order-item-list-template]').text()),
  el: '.js-order-list',
  events: {
    'click .submit': 'submitOrder'
  },

  submitOrder: function(){
    console.log('Hi');
    console.log(window.orderItems.toJSON());
    $('.right-container').html('<h2>Thank your for your order!</h2>');
    setTimeout(function(){   location.reload(); }, 2000);



  },

  initialize: function(){
     this.listenTo(window.orderItems, 'add', this.renderList);
   },

  renderList: function(){
    $('.right-container').html(this.template);
  },

  render: function(){
      this.$el.prepend(this.model);
  },

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
    window.orderItems = new OrderItemsCollection();
    this.categoryItemListView = new CategoryItemListView({collection: this.menuItems});
    this.orderItemView = new OrderItemView();

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
  window.total = 0;
  window.router = new AppRouter();
  Backbone.history.start();
});

}());
