
//
// Menu Category List View
//
var MenuCategoryListView = Backbone.View.extend({
  // el: '.category-list',
  //
  // initialize: function() {
  //   this.listenTo(this.collection, 'sync', this.createCategories);
  // },
  //
  // createCategories: function(){
  //   var categories = this.collection.groupBy(function(model){
  //     return model.get('itemCategory');
  // });
  //   console.log(categories);
  //   var itemView = new MenuCategoryItemView({model: categories});
  //   itemView.render();
  //   this.$el.append(itemView.el);
  // },
//   render: function(){
//     var self = this;
//     // this.$el.empty();
//
//     this.collection.each(function(item){
    // var itemView = new MenuCategoryItemView({model: categories});
//
//       itemView.render();
//       self.$el.append(itemView.el);
//       // console.log(itemView.pluck, 'itemCategory');
//     });
//
  // return this;
// }
});
//
// Menu Category Item View
//
var MenuCategoryItemView = Backbone.View.extend({
  // tagName: 'li',
  // template: _.template($('[data-template-name=category-list-template]').text()),
  //   render: function(){
  //     // console.log(this.model);
  //     // var category = this.model.uniq(function(item){
  //     //   return item.get('itemCateogry');
  //     // });
  //     console.log(this.model.attributes);
  //     this.$el.append(this.template(this.model[0]));
  //     // console.log(category);
  // },
});
