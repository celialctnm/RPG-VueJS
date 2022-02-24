<template>
  <h3 style="color: #192a77"> Veuillez choisir une rue !</h3>
  <div>
    <div v-for="(street,index) in streetTab" :key="index"  :value="index" >
      <input @change="selectStreet($event.target.value)" type="radio" :id="index" name="street" :value="index">
      <label :for="street">{{ street }}</label>
      <p style="color: #ac56ff; margin-top: -2px"> {{nbrBoutique[index]}} magasins - {{somme[index]}} objets</p>
    </div>
  </div>
</template>


<script>
export default {
  name: 'StreetSelector',
  emits: ["selectStreet"],
  props: {
    streetTab: Array,
    nbrBoutique: Array,
    somme: Array,
  },
  methods:{
    selectStreet(id) {
      this.$emit('selectStreet',{id});
    }
  }
}
</script>