window.Pokedex = {

  Models: {},
  Collections: {},
  Views: {},

  initialize: function () {
    var thing = new Pokedex.Views.Pokemon();
    thing.refreshPokemon();

    $("body").append(thing.$el);

  }
};


$(Pokedex.initialize);
