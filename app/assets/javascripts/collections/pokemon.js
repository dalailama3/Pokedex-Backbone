window.Pokedex.Collections.Pokemon = Backbone.Collection.extend({
    url: "api/pokemon",
    model: Pokedex.Models.Pokemon,
    initialize: function (models, options) {

    }
});
