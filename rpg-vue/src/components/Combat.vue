<template>
  <div id="combat">
    <h1>
      Combat
    </h1>
    <div v-bind="currentPlayer">
      <button @click="attaquer"> Attaquer </button>
    </div>

  </div>

</template>

<script>

import {monstres} from "../model";

export default {
  name: 'Combat',
  emits: ['attaquer','esquiver'],
  props: {
    currentPlayer: Object,
  },
  methods:{
    attaquer(){
      let vie = monstres[0].vie;
      console.log("Combat vie :" + vie);
      vie = vie - (this.currentPlayer.strength/100);
      console.log("Combat après : " + vie )
      monstres[0].vie = vie;
    },
    buy(){
      let indexitemBuy = document.getElementById("IndexitemBuy").value;
      let gold = this.currentPlayer.gold;
      console.log("Click buy dans persoOps : ", indexitemBuy);
      this.$emit('buy', {indexitemBuy, gold});
      document.getElementById("IndexitemBuy").value = "";
    },

    changeItem(){
      let indexitemBuy = document.getElementById("IndexitemBuy").value;
      this.$emit('changeItemBuy', {indexitemBuy});
    },

    sell(){
      let indexItem = document.getElementById("indexItem").value;
      let indexSlot = document.getElementById("indexSlot").value;
      let intIndexItem = parseInt(indexItem);
      let intIndexSlot = parseInt(indexSlot);

      this.$emit('sell', {intIndexItem, intIndexSlot});
    },

    order(){
      let indexItemOrder = document.getElementById("indexItemOrder").value;
      this.$emit('order', {indexItemOrder});
    }

  },

}
</script>