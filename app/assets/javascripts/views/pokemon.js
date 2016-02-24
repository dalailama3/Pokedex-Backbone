
window.Pokedex.Views.Pokemon = Backbone.View.extend({

  initialize: function() {
    this.setElement($("#pokedex"));
    this.pokemon;
  },

  events: {
    "click ul li.poke-list-item": "selectPokemonFromList",
    "submit form": "submitPokemonForm"
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
    this.pokemon = new Pokedex.Collections.Pokemon();
    this.pokemon.fetch({
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
      } else if (prop === "moves") {
        var $p = $("<p>");
        $p.text(prop[0].toUpperCase() + prop.slice(1) + ": " + pokemon.attributes[prop].join(", "));
        $div.append($p);
      } else if (prop !== "id") {
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
  },

  createPokemon: function (attributes, cb) {
    var me = this;
    var newPokemon = new Pokedex.Models.Pokemon();
    newPokemon.save(attributes, {
      success: function (model) {
        me.pokemon.push(model);
        me.addPokemonToList(model);
        cb(model);
      },
      error: function (model, response) {
        alert(response.responseText);
      }
    });
  },

  submitPokemonForm: function (event) {
    var me = this;
    var action = event;
    event.preventDefault();
    var form = $(event.currentTarget).serializeJSON();
    this.createPokemon(form, function (model, event) {
      me.renderPokemonDetail(model, action)
    });
  }

});
