<template>
  <!-- Afficher les infos du personnage courant -->
  <div>
    <perso-caracs :current-player="currentPlayer">
      <template v-slot:level>
        <div>
          <div class="caracs">
            {{this.currentPlayer.level}}
          </div>
        </div>
      </template>
      <template v-slot:or>
        <div style=" width: 100px; height: 60px; margin-right: 10px">
          <div class="" style="background-color: #60dfff; border: #60dfff">
            or {{this.currentPlayer.gold}}
          </div>
        </div>
      </template>
    </perso-caracs>
  </div>
  <div>
    <perso-slots :current-player="currentPlayer" @assign="assign($event)" @dassign="dassign($event)"></perso-slots>
  </div>
  <div>
    <perso-ops :current-player="currentPlayer" @order="order($event)" @changeItemBuy="changeItem($event)" @buy="buy($event)" @sell="sell($event)"></perso-ops>
  </div>
</template>


<script>
import PersoCaracs from "./PersoCaracs";
import PersoSlots from "./PersoSlots";
import PersoOps from "./PersoOps";




export default {
  name: 'Perso',
  emits: ['calculerEff', 'assign', 'loadCurrentPlayer', 'dassign', 'buy', 'changeItemBuy', 'sell', 'order'],
  components: {PersoCaracs, PersoSlots, PersoOps},
  props: {
    currentPlayer: Object,
    itemBuy: Object,
  },
  methods:{
    buy(event) {
      let indexitemBuy = event.indexitemBuy;
      let gold = event.gold;
      this.$emit('buy', {indexitemBuy, gold});
    },

    changeItem(event) {
      let indexitemBuy = event.indexitemBuy;
      this.$emit('changeItemBuy', {indexitemBuy});
    },

    sell(event){
      let intIndexItem = event.intIndexItem;
      let intIndexSlot = event.intIndexSlot;
      this.$emit('sell', {intIndexItem, intIndexSlot});
    },

    order(event){
      let indexItemOrder = event.indexItemOrder;
      this.$emit('order', {indexItemOrder});
    },

    load(){
      this.$emit('loadCurrentPlayer');
    },


    assign(event){
      console.log(event);
      let idB = event.idB;
      let idS = event.idS;
      this.load();
      this.$emit('assign',{idB, idS});
    },

    dassign(event){
      console.log(event);
      let indexItemSlot = event.indexItemSlot;
      let indexSlot = event.indexSlot;
      this.load();
      this.$emit('dassign',{indexItemSlot, indexSlot});
    }
  }
}
</script>