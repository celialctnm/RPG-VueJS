<template>
  <div v-bind="currentPlayer" class="perso">
    <div>
      <table>
        <tr>
          <th id="box_perso_g">
            <div>
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
            <div id="box_perso_c">
              <div class="box_perso_competence" style="background-color: #fffc00; border: #fffc00">
                <div>
                  Vitalité {{calculerEffet.vitalite}}
                </div>
              </div>
              <div class="box_perso_competence" style="background-color: #70e5ff; border: #70e5ff">
                <div>
                  Force {{ calculerEffet.force }}
                </div>
              </div>
              <div class="box_perso_competence" style="background-color: #d3d3d3; border: #d3d3d3">
                <div>
                  Armure {{calculerEffet.armure}}
                </div>
              </div>
            </div>

            <div id="orVie">
              <slot name="or">
                Or
              </slot>
              <div id="vie">
                {{calculerEffet.vie}}
                <img src="../assets/coeur.png"/>
              </div>
            </div>
          </th>
        </tr>
      </table>
    </div>
    <div style="background-color: #ac56ff">
      <h1>Combat</h1>
      <div style="display: flex; background-color: #d53f92; width: 170px; margin-right: auto; margin-left: auto">
        <div>
          Vie joueur
          <br>
          {{ vieJoueur }}
        </div>
       <div v-if="this.action === true">
         {{this.currentPlayer.name}} a lancé une attaque
       </div>
        <div style="margin-left: 10px">
          Vie monstre
          <br>
          {{attaquer.vieMonstre}}
        </div>
      </div>
      <br>
      <button @click="isTrue"> attaquer </button>
      <button @click="isTrueEsquive"> esquiver </button>
    </div>
  </div>
</template>

<script>



import {monstres} from "../model";

export default {
  name: 'PersoCaracs',
  emits: ['calculerEff'],
  props: {
    currentPlayer: Object,
  },
  data: () => {
    return {
      action: false,
      esquive: false,
      vieJoueurCombat: 10000,
      image: true,
    }
  },
  methods:{
    removeFirstCharacter(chaine){
      return parseInt(chaine.slice(1));
    },

    isImage(){
      this.image = true;
    },

    isImageFalse(){
      this.image = false;
    },

    isTrue(){
      this.action = true;
    },

    isFalse(){
      this.action = false;
    },

    vie(){
      this.vieJoueurCombat = this.currentPlayer.life;
    },

    vieJoueurPerd(){
      this.vieJoueurCombat -= (200+monstres[0].force*Math.floor(Math.random() * 10) + 1);
      return this.vieJoueurCombat;
    },

    isTrueEsquive(){
      this.esquive = true;
    },

    isFalseEsquive(){
      this.esquive = false;
    },
  },
  computed: {

    attaquer(){
      let vie = {
        vieMonstre: monstres[0].vie,
      }

      if (this.action === true && monstres[0].vie > 0){
        monstres[0].vie = monstres[0].vie- (this.currentPlayer.strength/100)*Math.floor(Math.random() * 100) + 1;
        this.isImage();
        //Monstre attaque
        this.vieJoueurPerd();
        console.log("Vie joueur : " + this.vieJoueurCombat)
        //this.isFalse();
      }

      if (this.vieJoueurCombat < 0){
        console.log("Le joueur est mort");
        return vie;
      }

      if (monstres[0].vie < 0){
        console.log("est mort")
        return vie;
      }
      return vie;
    },

    vieJoueur(){
      return this.vieJoueurCombat;
    },

    esquiver(){
      if (this.esquive === true){
        console.log("esquive")
      }
      return null;
    },

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