<template>
  <div>
    <!-- Bouton pour ouvrir la modale -->
    <vs-button color="primary" type="filled" @click="openModal">
      Créer un dossier
    </vs-button>

    <!-- Modale large -->
    <vs-popup :active.sync="active" title="Création / Modification Dossier" class="popup-large">
      <div class="form-grid">

        <!-- Colonne gauche -->
        <div class="form-column">
          <vs-input label="Numéro dossier" v-model="form.numero_doc" disabled />
          <vs-input label="Date de réception" type="date" v-model="form.date_recep" />
          <vs-input label="Date BADT" type="date" v-model="form.date_badt" />
          <vs-input label="Client (Entreprise)" v-model="form.client" />
          <vs-input label="Armateur" v-model="form.armateur" />
        </div>

        <!-- Colonne droite -->
        <div class="form-column">
          <vs-input label="Déclaration" v-model="form.declaration" />
          <vs-input label="BL" v-model="form.bl" />
          <vs-input label="Nb Tcs" type="number" v-model.number="form.nb_tcs" />
          <vs-input label="Adresse client" v-model="form.adresse_client" />
          <vs-input label="Contact client" v-model="form.contact_client" />
        </div>
      </div>

      <!-- Zones dynamiques (sous la grille) -->
      <div class="zones-section">
        <div class="zones-header">
          <h4>Zones & Destinations</h4>
          <vs-button icon size="small" color="success" @click="addZoneSelect" title="Ajouter une zone">
            <i class="bx bx-plus"></i>
          </vs-button>
        </div>

        <div class="zone-item" v-for="(z, idx) in form.zones" :key="z.id">
          <div class="zone-row">
            <!-- Select Zone -->
            <vs-select
              v-model="form.zones[idx].zoneId"
              placeholder="Sélectionner une zone"
              clearable
              @change="onZoneChange(idx)"
            >
              <vs-option v-for="zone in availableZones" :key="zone.id" :value="zone.id" :label="zone.nom">
                {{ zone.nom }}
              </vs-option>
            </vs-select>

            <!-- Multi destinations filtered by selected zone -->
            <vs-select
              v-model="form.zones[idx].destinations"
              multiple
              placeholder="Sélectionner destination(s)"
              :disabled="!form.zones[idx].zoneId"
            >
              <vs-option
                v-for="dest in getDestinationsForZone(form.zones[idx].zoneId)"
                :key="dest.id"
                :value="dest.nom"
                :label="dest.nom"
              >
                {{ dest.nom }}
              </vs-option>
            </vs-select>

            <!-- Boutons actions -->
            <div class="zone-actions">
              <vs-button icon size="small" color="danger" v-if="form.zones.length > 1" @click="removeZoneSelect(idx)">
                <i class="bx bx-trash"></i>
              </vs-button>
            </div>
          </div>

          <!-- Affichage résumé (optionnel) -->
          <div class="zone-summary">
            <small v-if="form.zones[idx].zoneId">
              <strong>Zone:</strong>
              {{ getZoneName(form.zones[idx].zoneId) || '-' }}
              — <strong>Dest:</strong> {{ (form.zones[idx].destinations || []).join(', ') || '-' }}
            </small>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer-dialog">
        <vs-button color="danger" @click="closeModal">Annuler</vs-button>
        <vs-button color="success" @click="saveDossier">Enregistrer</vs-button>
      </div>
    </vs-popup>

    <!-- Liste des dossiers enregistrés localement -->
    <div v-if="savedDossiers.length" class="list-container">
      <h4>📁 Dossiers créés :</h4>
      <ul>
        <li v-for="(d, i) in savedDossiers" :key="i">
          {{ d.numero_doc }} — {{ d.client }} — Zones: {{ d.zones.map(z => z.zoneName).join('; ') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let zoneCounterId = 1; // id local pour chaque zone-item

export default {
  name: "FormulaireDossier",
  data() {
    return {
      active: false,
      form: {
        numero_doc: "",
        date_recep: "",
        date_badt: "",
        client: "",
        armateur: "",
        // zones: tableau d'objets { id: number, zoneId: number|null, zoneName: string, destinations: [] }
        zones: [
          { id: zoneCounterId++, zoneId: null, zoneName: "", destinations: [] }
        ],
        declaration: "",
        bl: "",
        nb_tcs: 0,
        adresse_client: "",
        contact_client: ""
      },
      // jeux de données locaux (simulent les tables zone / destination)
      availableZones: [
        { id: 1, nom: "Zone 1" },
        { id: 2, nom: "Zone 2" },
        { id: 3, nom: "Zone 3" }
      ],
      destinations: [
        // zone 1
        { id: 1, zoneId: 1, nom: "Treichville" },
        { id: 2, zoneId: 1, nom: "Marcory" },
        // zone 2
        { id: 3, zoneId: 2, nom: "Koumassi" },
        { id: 4, zoneId: 2, nom: "Plateau" },
        { id: 5, zoneId: 2, nom: "Port-Bouët" },
        // zone 3
        { id: 6, zoneId: 3, nom: "Adjamé" },
        { id: 7, zoneId: 3, nom: "Yopougon" },
        { id: 8, zoneId: 3, nom: "Bingerville" }
      ],
      savedDossiers: []
    };
  },
  methods: {
    openModal() {
      this.generateNumeroDoc();
      this.form.date_recep = new Date().toISOString().split("T")[0];
      this.active = true;
    },
    closeModal() {
      this.active = false;
      this.resetForm();
    },
    generateNumeroDoc() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const count = this.savedDossiers.length + 1;
      this.form.numero_doc = `DOS-${year}${month}-${String(count).padStart(4, "0")}`;
    },

    /* ---------- Zones management ---------- */
    addZoneSelect() {
      this.form.zones.push({ id: zoneCounterId++, zoneId: null, zoneName: "", destinations: [] });
    },
    removeZoneSelect(index) {
      this.form.zones.splice(index, 1);
    },
    onZoneChange(index) {
      const z = this.form.zones[index];
      // mettre à jour zoneName pour affichage et reset destinations sélectionnées
      z.zoneName = this.getZoneName(z.zoneId);
      z.destinations = [];
    },
    getZoneName(zoneId) {
      const found = this.availableZones.find(z => z.id === zoneId);
      return found ? found.nom : "";
    },
    getDestinationsForZone(zoneId) {
      if (!zoneId) return [];
      return this.destinations.filter(d => d.zoneId === zoneId);
    },

    /* ---------- Save ---------- */
    saveDossier() {
      if (!this.form.client || !this.form.armateur) {
        this.$vs.notification({
          title: "Champs manquants",
          text: "Veuillez remplir au moins le client et l’armateur.",
          color: "warning"
        });
        return;
      }

      // Validation minimale : s'assurer qu'au moins une zone est sélectionnée
      const validZones = this.form.zones.filter(z => z.zoneId);
      if (validZones.length === 0) {
        this.$vs.notification({
          title: "Zones manquantes",
          text: "Veuillez sélectionner au moins une zone.",
          color: "warning"
        });
        return;
      }

      // Préparer payload (copie propre)
      const payload = {
        ...this.form,
        zones: this.form.zones.map(z => ({
          zoneId: z.zoneId,
          zoneName: this.getZoneName(z.zoneId),
          destinations: Array.isArray(z.destinations) ? z.destinations.slice() : []
        }))
      };

      this.savedDossiers.push(payload);
      this.$vs.notification({
        title: "Succès",
        text: "Dossier créé avec succès (local).",
        color: "success"
      });

      this.closeModal();
    },

    resetForm() {
      zoneCounterId = 1;
      this.form = {
        numero_doc: "",
        date_recep: "",
        date_badt: "",
        client: "",
        armateur: "",
        zones: [{ id: zoneCounterId++, zoneId: null, zoneName: "", destinations: [] }],
        declaration: "",
        bl: "",
        nb_tcs: 0,
        adresse_client: "",
        contact_client: ""
      };
    }
  }
};
</script>

<style scoped>
.popup-large {
  width: 85vw;
  max-width: 1100px;
}

/* grille deux colonnes pour les champs principaux */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  padding: 10px 4px;
}

/* colonne */
.form-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* section zones */
.zones-section {
  margin-top: 18px;
  padding: 12px;
  border-radius: 6px;
  background: #ffffff;
  box-shadow: 0 1px 0 rgba(0,0,0,0.04);
}

.zones-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

/* item zone (select + destinations + actions) */
.zone-item {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 6px;
  background: #fbfbfb;
  border: 1px solid #efefef;
}

.zone-row {
  display: grid;
  grid-template-columns: 2fr 2fr 40px;
  gap: 10px;
  align-items: center;
}

.zone-summary {
  margin-top: 6px;
  color: #666;
}

/* actions + footer */
.zone-actions {
  display: flex;
  justify-content: center;
}

.footer-dialog {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

/* liste locales */
.list-container {
  margin-top: 20px;
  background: #fafafa;
  padding: 12px;
  border-radius: 8px;
}

/* responsive */
@media (max-width: 900px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  .zone-row {
    grid-template-columns: 1fr;
  }
}
</style>
