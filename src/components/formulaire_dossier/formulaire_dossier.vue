<template>
  <div>
    <!-- Modal -->
    <vs-popup v-model="showModalLocal" title="Créer / Modifier Dossier">
      <form @submit.prevent="submitForm" class="form-dossier">

        <vs-input
          label-placeholder="Numéro dossier"
          v-model="form.numero_doc"
          disabled
        />

        <vs-input
          label-placeholder="Date de réception"
          type="date"
          v-model="form.date_recep"
        />

        <vs-input
          label-placeholder="Date BADT"
          type="date"
          v-model="form.date_badt"
        />

        <vs-input
          label-placeholder="Client"
          v-model="form.client"
        />

        <vs-input
          label-placeholder="Armateur"
          v-model="form.armateur"
        />

        <vs-select
          v-model="form.zones"
          multiple
          label-placeholder="Zones"
        >
          <vs-option
            v-for="zone in zones"
            :key="zone.id"
            :value="zone.nom"
          >
            {{ zone.nom }}
          </vs-option>
        </vs-select>

        <vs-input
          label-placeholder="Déclaration"
          v-model="form.declaration"
        />

        <vs-input
          label-placeholder="BL"
          v-model="form.bl"
        />

        <div class="buttons">
          <vs-button type="submit" color="success">Enregistrer</vs-button>
          <vs-button type="button" color="danger" @click="$emit('update:showModal', false)">
            Annuler
          </vs-button>
        </div>

      </form>
    </vs-popup>
  </div>
</template>

<script>
export default {
  name: "FormulaireDossier",
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    dossier: Object // pour édition
  },
  data() {
    return {
      form: {
        numero_doc: "",
        date_recep: new Date().toISOString().substr(0, 10),
        date_badt: "",
        client: "",
        armateur: "",
        zones: [],
        declaration: "",
        bl: ""
      },
      zones: [
        { id: 1, nom: "Zone 1" },
        { id: 2, nom: "Zone 2" },
        { id: 3, nom: "Zone 3" }
      ],
      // copie locale pour manipuler le v-model
      showModalLocal: this.showModal
    };
  },
  watch: {
    // synchroniser la prop avec la copie locale
    showModal(newVal) {
      this.showModalLocal = newVal;
    },
    // synchroniser la copie locale avec le parent
    showModalLocal(newVal) {
      this.$emit('update:showModal', newVal);
    }
  },
  mounted() {
    this.generateNumero();
    if (this.dossier) {
      this.form = { ...this.dossier };
    }
  },
  methods: {
    generateNumero() {
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const random = Math.floor(Math.random() * 1000);
      this.form.numero_doc = `${year}/${month} - ${random}`;
    },
    submitForm() {
      this.$emit("save", this.form);
      this.showModalLocal = false; // ferme le modal
    }
  }
};
</script>

<style lang="stylus" scoped>
.form-dossier
  .vs-input
    margin 10px 0

.buttons
  display flex
  justify-content flex-end
  gap 10px
  margin-top 20px
</style>
