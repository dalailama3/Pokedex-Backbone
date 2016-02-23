
window.Pokedex.Views.Pokemon = Backbone.View.extend({

  // initialize: function () {
  //   this.listenTo(this.$pokeList, this.selectPokemonFromList);
  // },

  events: {
    'click ul li.poke-list-item': 'selectPokemonFromList'
  },

  addPokemonToList: function (pokemon) {
    var $pokeList = $("<ul>");
    var $li = $("<li>").text(pokemon.get("name")).addClass("poke-list-item");
    $li.data("data-id", pokemon.get("id"));
    $pokeList.append($li);

    this.$el.append($pokeList);
    return this;
  },

  refreshPokemon: function () {
    var me = this;
    me.pokemon = new Pokedex.Collections.Pokemon();
    me.pokemon.fetch({
      success: function () {
        me.pokemon.each(function(pokemon) {
          me.addPokemonToList(pokemon);
        });
      }
    });

  },

  renderPokemonDetail: function (pokemon, event) {

    var $div = $("<div>").addClass("detail");
    $div.html("<img>");

    for (prop in pokemon.attributes) {
      if (prop === "image_url") {
        $div.find("img").attr("src", pokemon.attributes.image_url);
      } else if (prop !== "id") {
        $div.data("data-" + prop, pokemon.attributes[prop]);
        var $p = $("<p>");
        $p.text(prop[0].toUpperCase() + prop.slice(1) + ": " + pokemon.attributes[prop]);
        $div.append($p);
      }
    }

    this.$pokeDetail = $div;

    $(event.currentTarget).append(this.$pokeDetail);



  },

  selectPokemonFromList: function (event) {
    var pokeId = $(event.currentTarget).data("data-id");
    var selectedPokemon = this.pokemon._byId[pokeId];
    this.renderPokemonDetail(selectedPokemon, event);
  }


});
