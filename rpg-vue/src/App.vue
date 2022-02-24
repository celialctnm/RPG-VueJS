<template>
  <table style="margin-right: auto; margin-left: auto; padding: 3%; width: 100%">
    <tr>
      <th>
        <team @buy="buy($event)" :item-buy="itemBuy" @changeItemBuy="changeItem($event)" @order="order($event)"></team>
      </th>
      <th>
        <world :towns="towns" :current-shop="currentShop" @selectShop="selectShop($event.id)" @selectStreet="selectStreet($event.id)" @selectTown="selectTown($event.id)" :current-town="currentTown" :current-street="currentStreet"></world>
      </th>
    </tr>
  </table>
</template>



<script>
import World from './components/World';
import Team from "./components/Team";
import {towns} from './model';


export default {
  name: 'App',
  components: {
    World,
    Team
  },
  data: () => {
    return {
      towns,
      currentTown: null,
      currentStreet: null,
      currentShop: null,
      itemBuy: null,
    }
  },
  methods: {
    selectTown(id){
      this.currentTown = this.towns[id];
    },

    selectStreet(id){
      this.currentStreet = this.currentTown.streets[id];
    },

    selectShop(id){
      this.currentShop = this.currentStreet.shops[id];
    },

    changeItem(event){
      let index = event.indexitemBuy;
      this.itemBuy = this.currentShop.itemStock[index];
    },

    buy(event){
      let index = event.indexitemBuy;

      if (this.currentShop != null) {
        if (this.currentShop.itemStock[index] != null){
          if (event.gold > this.itemBuy.price){
            this.itemBuy = this.currentShop.itemStock[index];
            this.currentShop.itemStock.splice(index, 1);
          }
        }
        else
          alert("Vérifiez que l'item selectionné est correct et que vous avez assez d'argent");
        }
      console.log(this.itemBuy);
    },
    order(event){
      if (this.currentShop.itemOrder[event.indexItemOrder] != null){
        this.currentShop.order(event.indexItemOrder);
        this.currentShop.itemOrder.splice(event.indexItemOrder,1);
      }
      else
        alert("L'item choisi n'existe pas");


    }
  },
  computed: {

  }
}
</script>
