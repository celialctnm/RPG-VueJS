<template>
  <h3 style="color: #192a77">Où souhaitez-vous vous rendre ?</h3>
  <div v-for="(town,index) in townsTab" :key="index">
    <input @change="selectTown($event.target.value)" type="radio" :id="index" name="town" :value="index">
    <label :for="townsTab">{{ town }}</label>
  </div>
</template>


<script>



export default {
  name: 'TownSelector',
  emits: ["selectTown"],
  props: {
    townsTab: Array,
  },
  methods:{
    selectTown(id) {
      this.$emit('selectTown',{id});
    }
  }
}
</script>