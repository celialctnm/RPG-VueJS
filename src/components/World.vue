<template>
  <town-selector :towns-tab="TownTab" @selectTown="selectTown($event.id)"></town-selector>

  <div v-if="currentTown!=null">
    <h1 style="color: #fca500"> Bienvenue à {{ this.currentTown.name }}</h1>
  </div>

  <div v-if="currentTown!=null">
    <street-selector :street-tab="StreetTab" :nbr-boutique="nbrBoutique" :somme="sommeObj" @selectStreet="selectStreet($event.id)"></street-selector>
  </div>

  <div v-if="currentStreet!=null">
    <h3 style="color: #f10000"> Vous êtes actuellement à {{this.currentStreet.name}}</h3>
    <shop-selector :shop-tab="ShopTab" :categorie="categorie" @selectShop="selectShop($event.id)"></shop-selector>
  </div>

  <div v-if="currentShop!=null">
    <h3 style="color: #57ce1b"> Vous avez choisi {{this.currentShop.name}}</h3>
  </div>


  <div v-if="currentShop!=null">
    <shop :current-shop="currentShop">
      <template v-slot:title>
        <div style=" width: 120px; margin-right: auto; margin-left: auto; color: #f10000">
          <h2>{{this.currentShop.name}}</h2>
        </div>

      </template>
      <template v-slot:titleStock>
        <h3 style="color: #192a77"> En stock </h3>
      </template>
      <template v-slot:titleOrder>
        <h3 style="color: #d53f92"> En commande </h3>
      </template>
    </shop>
  </div>
</template>


<script>
import TownSelector from "./TownSelector";
import StreetSelector from "./StreetSelector";
import ShopSelector from "./ShopSelector";
import Shop from "./Shop";

export default {
  name: 'World',
  emits: ["selectTown", "selectStreet", "selectShop"],
  components: {TownSelector, StreetSelector, ShopSelector, Shop},
  props: {
    towns: Array,
    currentTown: Object,
    currentStreet: Object,
    currentShop: Object,
  },

  computed: {

    TownTab(){
      let townsTab = [];
      for (let i = 0; i<this.towns.length; i++){
        townsTab.push(this.towns[i].name);
      }
      return townsTab;
    },

  StreetTab() {
    let streetTab = [];
    for (let i = 0; i<this.currentTown.streets.length; i++){
      streetTab.push(this.currentTown.streets[i].name);
    }

    return streetTab;
  },

    nbrBoutique() {
      let nbrBoutique = [];
      for (let i = 0; i<this.currentTown.streets.length; i++){
        nbrBoutique.push(this.currentTown.streets[i].shops.length);
      }

      return nbrBoutique;
    },

    nbrObjetOrder() {
      let nbrObjet = [];
      let item;
      let i = 0;
      for(let z = 0; z<this.currentTown.streets.length;z++){
        for (i = 0; i<this.currentTown.streets[z].shops.length; i++){
          item = this.currentTown.streets[z].shops[i].itemOrder.length;
        }
        nbrObjet.push(item*i);
      }
      return nbrObjet;
    },

    nbrObjetStock() {
      let nbrObjet = [];
      let item;
      let i = 0;
      for(let z = 0; z<this.currentTown.streets.length;z++){
        for (i = 0; i<this.currentTown.streets[z].shops.length; i++){
          item = this.currentTown.streets[z].shops[i].itemStock.length;
        }
        nbrObjet.push(item*i);
      }
      return nbrObjet;
    },

    sommeObj(){
      let somme = [];
      for (let i = 0; i<this.nbrObjetStock.length; i++){
        somme[i] = this.nbrObjetStock[i] + this.nbrObjetOrder[i];
      }
      return somme;
    },

    ShopTab(){
      let shopTab = [];
      for (let i = 0; i<this.currentStreet.shops.length; i++){
        shopTab.push(this.currentStreet.shops[i].name);
      }
      return shopTab;
    },

    categorie() {
      let categorie = [];
      let tab  = []

      for (let i = 0; i<this.currentStreet.shops.length; i++){
        for (let j = 0; j<this.currentStreet.shops[i].itemCat.length; j++){
          tab.push(this.currentStreet.shops[i].itemCat[j]);
        }
        categorie.push(tab);
        tab = [];
      }
      return categorie;
    },
},

  methods: {
    selectTown(id) {
      this.$emit('selectTown',{id});
    },
    selectPlayer(id)  {
      this.currentPlayer = this.teams[id];
    },
    selectStreet(id) {
      this.$emit('selectStreet',{id});
    },
    selectShop(id) {
      this.$emit('selectShop',{id});
    },
  }
}
</script>