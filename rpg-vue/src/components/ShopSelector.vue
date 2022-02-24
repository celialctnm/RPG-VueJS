<template>
  <h3 style="color: #192a77">Dans quel magasin voulez-vous entrer ?</h3>
  <!-- Selectionner le magasin courante -->
    <div v-for="(shops,index) in shopTab" :key="index"  :value="index" >
      <input @change="selectShop($event.target.value)" type="radio" :id="index" name="shop" :value="index">
      <label :for="shops.id">{{ shops }}</label>
      <table style="color: #ac56ff; margin: -3px auto 5px auto;">
        <tr>
          <td v-for="(cat,ind) in categorie[index]" :key="ind" :value="index">
            {{cat}}
          </td>
        </tr>
      </table>

    </div>
</template>


<script>
export default {
  name: 'ShopSelector',
  emits: ["selectShop"],
  props: {
    shopTab: Array,
    categorie: Array,
  },
  methods:{
    selectShop(id) {
      this.$emit('selectShop',{id});
    }
  }
}
</script>