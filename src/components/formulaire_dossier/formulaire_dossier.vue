<template>
  <div>
    <!-- Bouton principal -->
    <vs-button color="primary" @click="openModal">
      Créer un dossier
    </vs-button>

    <!-- Popup Vuesax Full Screen & Transparent -->
    <vs-popup :active.sync="active" class="popup-full" title="Création / Modification Dossier">
      <div class="modal-container">

        <!-- Formulaire -->
        <div class="form-table">
          <div class="form-row">
            <vs-input label="Numéro dossier" v-model="form.numero_doc" disabled />
            <vs-input label="Date réception" type="date" v-model="form.date_recep" />
            <vs-input label="Date BADT" type="date" v-model="form.date_badt" />
          </div>

          <div class="form-row">
            <vs-input label="Client" v-model="form.client" />
            <vs-input label="Contact client" v-model="form.contact_client" />
            <vs-input label="Adresse client" v-model="form.adresse_client" />
          </div>

          <div class="form-row">
            <vs-select label="Armateur" v-model="form.armateur" placeholder="selectionnez un Armateur">
              <vs-select-item v-for="arm in armateurs" :key="arm" :value="arm" :text="arm" />
            </vs-select>
            <vs-input label="Déclaration" v-model="form.declaration" />
            <vs-input label="BL" v-model="form.bl" />
          </div>
        </div>
        <!-- Zones -->
        <div class="zones-section-admin">
            <div class="zones-header-admin">
                <h4>Zones & Destinations</h4>

                <vs-button icon @click="addZoneSelect" color="success">+ Destination</vs-button>
            </div>

            <div class="zones-table">
                <div class="zones-row" v-for="(z, idx) in form.zones" :key="idx">

                    <!-- Destination d'abord -->
                    <vs-select label="Destination" v-model="z.destinationId" placeholder="selectionnez une destination" @change="onDestinationChange(idx)">
                        <vs-select-item
                        v-for="dest in destinations"
                        :key="dest.id"
                        :value="dest.id"
                        :text="dest.nom"
                        />
                    </vs-select>

                    <!-- Zone auto -->
                    <vs-input
                        v-model="z.zoneName"
                        label="Zone"
                        disabled
                    />

                    <!-- Remove -->
                    <vs-button
                        v-if="form.zones.length > 1"
                        color="danger"
                        icon
                        @click="removeZoneSelect(idx)"
                    >X</vs-button>

                </div>
            </div>
        </div>

        <!-- Actions -->
        <div class="footer-dialog-admin">
          <vs-button color="danger" @click="closeModal">Annuler</vs-button>
          <vs-button color="success" @click="saveDossier">Enregistrer</vs-button>
        </div>

      </div>
    </vs-popup>
  </div>
</template>

<script>
import { dossiersAPI } from "@/api/dossiersAPI";

export default {
  name: "FormulaireDossier",
  data() {
    return {
      active: false,
      armateurs: ["CMA CGM", "MAERSK", "MSC", "BOLLORE"],
      destinations: [
        { id: 1, nom: "Treichville", zone: "Zone 1" },
        { id: 2, nom: "Marcory", zone: "Zone 1" },
        { id: 3, nom: "Marcory Boulevard", zone: "Zone 2" },
        { id: 4, nom: "Koumassi", zone: "Zone 2" },
        { id: 5, nom: "Plateau", zone: "Zone 2" },
        { id: 6, nom: "Port-Bouët", zone: "Zone 2" },
        { id: 7, nom: "Adjamé", zone: "Zone 3" },
        { id: 8, nom: "Yopougon", zone: "Zone 3" },
        { id: 9, nom: "Bingerville", zone: "Zone 3" },
      ],
      form: {
        numero_doc: "",
        date_recep: "",
        date_badt: "",
        client: "",
        armateur: "",
        declaration: "",
        bl: "",
        adresse_client: "",
        contact_client: "",
        zones: [{ destinationId: null, zoneName: "" }],
      },
    };
  },
  methods: {
    async openModal() {
      try {
        // ✅ Génère le numéro depuis le backend selon armateur/mois/année
        if (this.form.armateur) {
          const numero = await dossiersAPI.generateNumero(this.form.armateur);
          this.form.numero_doc = numero;
        } else {
          this.form.numero_doc = "";
        }

        this.form.date_recep = new Date().toISOString().split("T")[0];
        this.active = true;
      } catch (error) {
        console.error("Erreur génération numéro :", error);
        this.$vs.notify({
          color: "danger",
          title: "Erreur",
          text: "Impossible de générer le numéro du dossier",
        });
      }
    },
    closeModal() {
      this.active = false;
    },
    onDestinationChange(idx) {
      const dest = this.destinations.find(
        (d) => d.id === this.form.zones[idx].destinationId
      );
      this.form.zones[idx].zoneName = dest ? dest.zone : "";
    },
    addZoneSelect() {
      this.form.zones.push({ destinationId: null, zoneName: "" });
    },
    removeZoneSelect(idx) {
      this.form.zones.splice(idx, 1);
    },
    async saveDossier() {
      try {
        const response = await dossiersAPI.addDossier(this.form);
        this.$vs.notify({
          color: "success",
          title: "Succès",
          text: "Dossier enregistré avec succès",
        });
        this.closeModal();
        console.log("✅ Dossier créé :", response);
      } catch (error) {
        console.error(error);
        this.$vs.notify({
          color: "danger",
          title: "Erreur",
          text: error.message || "Impossible d'enregistrer le dossier",
        });
      }
    },
  },
};

</script>

<style scoped>
/* vs-popup full screen & transparent */
.popup-full .vs-popup {
  background: rgba(0,0,0,0.4) !important; /* léger fond sombre */
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* Container centré */
.modal-container {
  width: 100%;
  max-width: 900px;
  background: #fff;
  border-radius: 10px;
  padding: 0px;
  animation: fadeIn .25s ease-out;
  gap: 6px;
}

/* Titre */
.modal-title {
  font-weight: bold;
  margin-bottom: 18px;
  font-size: large;
}

/* Layout Form */
.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

/* Zones */
.zones-section-admin {
  margin-top: 16px;
  border-top: 1px solid #ececec;
  padding-top: 1px;
}

.zones-header-admin {
  display: flex;
  justify-content:space-between;
  margin-bottom: 10px;
}
.zones-table {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.zones-row {
  display: flex;
  gap: 2px;
  align-items: center;
}


/* Footer */
.footer-dialog-admin {
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
  gap: 2px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
