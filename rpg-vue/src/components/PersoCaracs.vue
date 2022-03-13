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
    <div>
      <div id="combat">
        <h1 style="padding-top: 10px">Combat</h1>
        <p> Vous venez de boire une potion afin de vous donner du courage, vous avez maintenant 10 000 points de vie jusqu'à la fin du combat</p>
        <div style="display: flex; margin-right: auto; margin-left: auto">
          <div style="width: 170px;">
            Vie {{ this.currentPlayer.name }}
            <br>
            {{ vieJoueur }}
          </div>
          <div style="width: 170px; margin-left: 280px">
            Vie T-Rex
            <br>
            {{attaquer.vieMonstre}}
            <img style="height: 200px" src="../assets/dragon.png">
          </div>
        </div>
        <br>
        <p id="texteCombat">
          {{this.currentPlayer.name}} est prêt à se battre
        </p>
        <button id="boutonAttaquer" @click="isTrue"> attaquer </button>
        <button id="boutonEsquiver" @click="isTrueEsquive"> esquiver </button>
      </div>
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
        this.isFalseEsquive();
        this.isFalse();
        let texte = document.getElementById("texteCombat");
        texte.innerText = this.currentPlayer.name + " vient de lancer une attaque";
      }

      if (this.esquive === true && monstres[0].vie > 0){
        let texte = document.getElementById("texteCombat");
        texte.innerText = this.currentPlayer.name + " vient d'esquiver";
        this.isFalseEsquive();
        this.isFalse();
      }

      if (this.vieJoueurCombat < 0){
        let texte = document.getElementById("texteCombat");
        texte.innerText = this.currentPlayer.name + " a été tué";
        return vie;
      }

      if (monstres[0].vie < 0){
        let texte = document.getElementById("texteCombat");
        texte.innerText = monstres[0].name + " a été tué";
        monstres[0].vie = 0;
        return vie;
      }
      return vie;
    },

    vieJoueur(){
      return this.vieJoueurCombat;
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