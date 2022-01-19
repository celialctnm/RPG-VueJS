<template>
  <div>
    <slot name="title"> Nom boutique </slot>
  </div>
  <br>
<div style="width: 100%;
     display: flex;
     flex-direction: row;
     justify-content: center;">
  <table>
    <slot name="titleStock"> Title </slot>
    <tr  v-for="(item,index) in currentShop.itemStock" :key="index" style="text-align: left;">
      <th style="border: black solid 1px; padding: 5px"> {{index}} {{item.name}} {{item.price}} $ </th>
    </tr>
  </table>

  <table style="margin-left: 5px;">
  <slot name="titleOrder"> Title </slot>
  <tr  v-for="(item,index) in currentShop.itemOrder" :key="index" style="text-align: left">
    <th style="border: black solid 1px;"> {{index}} {{item.name}} {{item.price}} $ </th>
  </tr>
</table>
</div>
</template>


<script>
export default {
  name: 'Shop',
  emits: ["SShop"],
  props: {
    currentShop: Object,
  },
  methods:{
    selectShop(id) {
      this.$emit('SShop',{id});
    },
  }
}
</script>