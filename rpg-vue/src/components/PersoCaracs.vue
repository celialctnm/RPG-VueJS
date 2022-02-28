<template>
  <div v-bind="currentPlayer" class="perso">
    <table style="margin-right: auto; margin-left: auto; padding: 3%; width: 100%">
      <tr>
        <th id="box_perso_g">
          <div>
            <slot name="or">
              Or
            </slot>
            <slot name="level">
              Niveau
            </slot>
          </div>
          <div style="display: flex;flex-direction: row;" id="box_image">
            <div v-if="this.currentPlayer.name === 'Neon' ">
              <div>
                <img src="../assets/neon.gif"/>
              </div>
            </div>
            <div v-if="this.currentPlayer.name === 'Kururo' ">
              <div>
                <img src="../assets/kururo.gif"/>
              </div>
            </div>
            <div v-if="this.currentPlayer.name === 'Hisoka' ">
              <div>
                <img src="../assets/hisoka.gif"/>
              </div>
            </div>
            <div v-if="this.currentPlayer.name === 'Killua' ">
              <div>
                <img src="../assets/killua.gif"/>
              </div>
            </div>
          </div>
          <h2> {{ this.currentPlayer.name}}</h2>
        </th>
        <th id="box_perso_d">
          <div style="display: flex; flex-direction: row;width: 400px; margin-right: auto; margin-left: auto; margin-bottom: 20px">
            <div style="margin-right: 10px">
              <div class="" style="background-color: #6ef12b; border: #6ef12b">
                <div>
                  Vie {{calculerEffet.vie}}
                </div>
              </div>
              <div class="" style="background-color: #fffc00; border: #fffc00">
                <div>
                  Vitalité {{calculerEffet.vitalite}}
                </div>
              </div>
              <div class="" style="background-color: #ff2121; border: #ff2121">
                <div>
                  Force {{ calculerEffet.force }}
                </div>
              </div>
              <div class="" style="background-color: #d3d3d3; border: #d3d3d3">
                <div>
                  Armure {{calculerEffet.armure}}
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PersoCaracs',
  emits: ['calculerEff'],
  props: {
    currentPlayer: Object,
  },
  methods:{
    removeFirstCharacter(chaine){
      return parseInt(chaine.slice(1));
    },
  },
  computed: {
    calculerEffet(){
      let attr = {
        armure: this.currentPlayer.armor,
        vitalite: this.currentPlayer.vitality,
        force: this.currentPlayer.strength,
        vie: this.currentPlayer.life,
      }
      for (let i = 0; i <this.currentPlayer.slots.length; i++) {
        let slot = this.currentPlayer.slots[i];
        if(slot !== "bag"){
          for (let j = 0; j < slot.items.length ; j++) {
            let item = slot.items[j];
            switch (item.effect[0]){
              case "A":
              case "a":
                attr.armure = attr.armure + this.removeFirstCharacter(item.effect);
                break;
              case "L":
                attr.vitalite = attr.vitalite + this.removeFirstCharacter(item.effect);
                break;
              case "S":
              case "s":
                attr.force = attr.force + this.removeFirstCharacter(item.effect);
                break;
              case "l":
                attr.vie = attr.vie + this.removeFirstCharacter(item.effect);
                break;
            }
          }
        }
      }
      return attr;
    }
  },
}
</script>