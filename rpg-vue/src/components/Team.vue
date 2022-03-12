<template>
  <!-- Selectionner le personnage courant -->
  <perso-selector :teams="teams" @sPlayer="selectPlayer($event.id)"></perso-selector>
  <perso :current-player="currentPlayer" @changeItemBuy="buyV2($event)" @order="order($event)" @sell="sell($event)" @buy="buy($event)" @assign="assign($event)" @dassign="dassign($event)" @loadCurrentPlayer="loadCurrentPlayer"></perso>
  <combat :monstres="monstre" :current-player="currentPlayer"></combat>
</template>


<script>
import {teams, monstres} from '../model';
import PersoSelector from "./PersoSelector";
import Perso from "./Perso";
import Combat from "./Combat";

export default {
  name: 'Team',
  emits: ['buy', 'changeItemBuy', 'order'],
  components: {Combat, PersoSelector, Perso},
  props: {
    itemBuy: Object,
  },
  data: () => {
    return {
      teams,
      currentPlayer: teams[0],
      monstre: monstres[0],
    }
  },
  computed: {
  },
  methods: {
    //associer le personnage courant en fonction de la liste déroulante
    selectPlayer(id)  {
      this.currentPlayer = this.teams[id];
    },


    selectStreet(id) {
      this.currentStreet = this.currentTown.streets[id];
    },

    selectShop(id) {
      this.currentShop = this.currentStreet.shops[id];
    },


    assign(event) {
      console.log(event.idB, event.idS);
      if ((this.currentPlayer.boughtItems[event.idB] != null) && (this.currentPlayer.slots[event.idS].items != null)){
        if ((this.currentPlayer.boughtItems[event.idB].effect[0] === "a") || (this.currentPlayer.boughtItems[event.idB].effect[0] === "s") ||(this.currentPlayer.boughtItems[event.idB].effect[0] === "l")) {
          this.currentPlayer.assign(event.idB, 4);
        }
        else {
          this.currentPlayer.assign(event.idB, event.idS);
        }
      }
      this.loadCurrentPlayer();
    },

    dassign(event){
      if ((this.currentPlayer.slots[event.indexSlot] != null) && (this.currentPlayer.slots[event.indexSlot].items[event.indexItemSlot])){
        this.currentPlayer.dassign(event.indexItemSlot, event.indexSlot);
      }
      this.loadCurrentPlayer();

    },

    loadCurrentPlayer(){
      console.log("dans load");
      this.currentPlayer.life = this.currentPlayer.life + 0;
    },

    buy(event) {
      let indexitemBuy = event.indexitemBuy;
      let gold = event.gold;
      console.log("Buy dans Team", indexitemBuy);
      this.$emit('buy', {indexitemBuy, gold});

      if (this.itemBuy == null){
        console.log("item nul");
      }
      else{
        this.currentPlayer.buy(this.itemBuy);
      }


    },

    sell(event){
      let intIndexItem = event.intIndexItem;
      let intIndexSlot = event.intIndexSlot;

      if ((!isNaN(intIndexItem)) && (!isNaN(intIndexSlot))){
        if (this.currentPlayer.slots[intIndexSlot].items[intIndexItem] != null){
          let priceItem = this.currentPlayer.slots[intIndexSlot].items[intIndexItem].price;
          this.currentPlayer.sell(intIndexSlot,intIndexItem,priceItem-(10/100)*priceItem);
      }
      }
    },
    buyV2(event){
      let indexitemBuy = event.indexitemBuy;
      this.$emit('changeItemBuy', {indexitemBuy});
    },

    async order(event){
      let indexItemOrder = event.indexItemOrder;
      this.$emit('order', {indexItemOrder});
    },
  }
}
</script>