<template>
  <div id="persoops">
    <h1>
      Opérations
    </h1>
    <!-- Slots et objets achetés -->
    <div v-bind="currentPlayer">
      <div style="width: 100%; display: flex; flex-direction: row;justify-content: center;">
        <div style="width: 150px; padding: 3px; text-align: left">
          <label style="text-align: left;">N° item à acheter </label>
          <input @change="changeItem" type="text" id="IndexitemBuy" style="margin-top: 3px">
        </div>
        <div>
          <img @click="buy" src="../assets/buyV2.png" style="width: 50px; height: 30px; margin-top: 10px; cursor:pointer;"/>
        </div>
        <div style="width: 150px; padding: 3px; text-align: left; margin-left: 20px;">
          <label style="text-align: left;">N° item à commander </label>
          <input @change="changeItem" type="text" id="indexItemOrder" style="margin-top: 3px">
        </div>
        <div>
          <img @click="order" src="../assets/colisV2.png" style="width: 50px; height: 30px; margin-top: 10px; cursor:pointer;"/>
        </div>
      </div>
      <br>
      <div style="width: 100%; display: flex; flex-direction: row;justify-content: center;">
        <div style="width: 200px; padding: 3px; text-align: left">
          <label style="text-align: left;">N° item à vendre</label>
          <input type="text" id="indexItem" style="margin-top: 3px">
        </div>
        <div style="width: 150px; padding: 3px; text-align: left; margin-left: 20px;">
          <label style="text-align: left;">N° slot </label>
          <input  type="text" id="indexSlot" style="margin-top: 3px">
        </div>
        <div>
          <img @click="sell" src="../assets/gold.png" style="width: 50px; height: 30px; margin-top: 10px; cursor:pointer;"/>
        </div>
      </div>
    </div>
  </div>

</template>

<script>



export default {
  name: 'PersoOps',
  emits: ['buy','changeItemBuy', 'sell', 'order'],
  props: {
    currentPlayer: Object,
  },
  methods:{
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