<template>
  <!-- Slots et objets achetés -->
  <div v-bind="currentPlayer">
    <div id="tab_equipement">
      <table border="1">
        <tr v-for="(slot,index) in currentPlayer.slots" :key="index">
          <td>
            {{ slot.name }}
          </td>
          <td v-for="(item,index) in slot.items" :key="index">
            {{item.name}}
          </td>
        </tr>
      </table>
    </div>


    <div id="assign">
      <div>
        Items achetés
        <br>
        <input readonly="readonly" :value="itemAchete" style="width: 300px; height: 20px; margin-top: 5px">
      </div>
      <div style="display: flex; flex-direction: column;">
        <div class="blocAD">
          <h3> Assigner un item</h3>
          <div class="row">
            <div class="divAssDessa">
              <label style="text-align: left;">N° dans item acheté</label>
              <input type="text" id="boughtId" style="margin-top: 3px">
            </div>
            <div class="divAssDessa" style="width: 150px">
              <label style="text-align: left;">N° slot</label>
              <input type="text" id="slotId" style="margin-top: 3px">
            </div>
          </div>
          <div>
            <button class="bouton" @click="assign"> assigner </button>
          </div>
        </div>
        <div class="blocAD">
          <h3> Désassigner un item</h3>
          <div class="row">
            <div class="divAssDessa" style="width: 150px">
              <label style="text-align: left;">N° item</label>
              <input type="text" id="dassignItemSlot" style="margin-top: 3px">
            </div>
            <div class="divAssDessa" style="width: 150px; margin-left: 40px">
              <label style="text-align: left;">N° slot </label>
              <input  type="text" id="dassignSID" style="margin-top: 3px">
            </div>
          </div>
          <div>
            <button class="bouton" @click="desassign"> désassigner </button>
          </div>
        </div>
      </div>
    </div>
    </div>


</template>


<script>

export default {
  name: 'PersoSlots',
  emits: ['assign', 'dassign', 'buy'],
  props: {
    currentPlayer: Object,
    itemBuy: Object,
  },
  computed: {
    itemAchete(){
      let name = "";
      for (let i = 0; i <this.currentPlayer.boughtItems.length ; i++) {
        name = name  + " " + i + " " + this.currentPlayer.boughtItems[i].name;
        console.log(this.currentPlayer.boughtItems[i]);
      }
      console.log(name);
      return name;

    }
  },
  methods:{
    assign(){
      let idB = document.getElementById("boughtId").value;
      let idS = document.getElementById("slotId").value;
      console.log("PersoSlot : ", idB, idS);
      this.$emit('assign',{idB, idS});
    },
    desassign(){
      let indexItemSlot = document.getElementById("dassignItemSlot").value;
      let indexSlot = document.getElementById("dassignSID").value;
      this.$emit('dassign',{indexItemSlot, indexSlot});
    }

  }
}
</script>