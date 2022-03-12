<template>
  <div>
    <slot name="title"> Nom boutique </slot>
  </div>
  <br>
  <div style="width: 100%;
     display: flex;
     flex-direction: row;
     justify-content: center;">
    <div>
      <table id="stock">
        <slot name="titleStock"> Title </slot>
        <tr  v-for="(item,index) in currentShop.itemStock" :key="index" style="text-align: left;">
          <th style="padding: 5px 5px 5px 10px;"> {{index}} {{item.name}} {{item.price}} $ </th>
        </tr>
      </table>
    </div>
    <div>
      <table id="order" style="margin-left: 10px">
        <slot name="titleOrder"> Title </slot>
        <tr  v-for="(item,index) in currentShop.itemOrder" :key="index" style="text-align: left">
          <th style="padding: 5px 5px 5px 10px"> {{index}} {{item.name}} {{item.price}} $ </th>
        </tr>
      </table>
    </div>
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