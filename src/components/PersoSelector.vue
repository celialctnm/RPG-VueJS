<template>
  Sélectionner un personnage
  <!-- Selectionner le personnage courant -->
  <select @change="selectPlayer($event.target.value)">
    <option v-for="(player,index) in teams" :key="index" v-bind:value="index">
      {{player.name}}
    </option>
  </select>
</template>

<script>

export default {
  name: 'PersoSelector',
  emits: ["sPlayer"],
  props: {
    teams: Array,
  },

  methods:{
    selectPlayer(id) {
      this.$emit('sPlayer',{id});
    }
  }
}
</script>