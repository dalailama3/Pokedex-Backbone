window.Pokedex.Collections.Toys = Backbone.Collection.extend({
  model: Pokedex.Models.Toy,

  // url: function () {
  //   return this.pokemon.url() + "/toys/" + this.pokemon.id;
  // },

  initialize: function (models, options) {
    this.pokemon = options.pokemon;
  }

});
