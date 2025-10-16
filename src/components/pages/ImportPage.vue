<template>
  <div>
    <!-- En-tête -->
    <div class="import-header">
      <span class="section-title">
        <vs-icon icon="home" size="22" color="#c32d39" />
        <span style="color:#c32d39;">DOSSIERS</span> / <span style="color:#222;">IMPORT</span>
      </span>
      <!-- date range styled like the maquette -->
      <div class="date-search">
        <div class="date-box">
          <i class="material-icons calendar-icon">calendar_today</i>

          <vs-input class="date-input" type="date" v-model="dateStart" />
          <span class="date-sep">à</span>
          <vs-input class="date-input" type="date" v-model="dateEnd" />

          <button class="search-circle" aria-label="Rechercher">
            <i class="material-icons">search</i>
          </button>
        </div>
      </div>

      <!-- bouton repositionné -->
      <vs-button class="history-btn" icon="list" type="filled" color="#c32d39">
        Historique
      </vs-button>
    </div>
    <div class="import-title">
      <span>BILAN ARMATEURS <span style="color:#222;">IMPORT</span></span>
    </div>
    <!-- Grille de cards -->
    <div class="companies-grid">
      <vs-card
        v-for="company in companies"
        :key="company.name"
        class="company-card"
      >
        <template #title>
          <div class="company-card-header">
            <vs-icon icon="local_shipping" size="28" color="#5b9bd5" />
            <span class="company-name">{{ company.name }}</span>
          </div>
        </template>
        <div class="company-status">
          <div>
            <vs-icon icon="inventory_2" size="22" color="#f9a825" />
            <span class="status-title">STOCK</span>
          </div>
          <div>
            <vs-icon icon="done_all" size="22" color="#43a047" />
            <span class="status-title">LIVRE</span>
          </div>
          <div>
            <vs-icon icon="trolley" size="22" color="#5b6bc0" />
            <span class="status-title">RECUPERE</span>
          </div>
        </div>
        <div class="company-values">
          <div>
            <span class="value">{{ company.stock }}</span>
            <span class="value-label">Ordre(s)</span>
          </div>
          <div>
            <span class="value">{{ company.containers }}</span>
            <span class="value-label">Conteneur(s)</span>
          </div>
          <div>
            <span class="value">{{ company.orders }}</span>
            <span class="value-label">Ordre(s)</span>
          </div>
        </div>
        <div class="card-bottom-bar"></div>
      </vs-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImportPage",
  data() {
    return {
      dateStart: "",
      dateEnd: "",
      companies: [], // Tableau vide au départ
    };
  },
};
</script>


<style scoped>
.import-header {
  position: relative; /* nécessaire pour le positionnement absolu du bouton */
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
  padding: 22px 28px;
  height: 84px;
  box-sizing: border-box;
  background: #fff;
}

/* bouton historique positionné comme sur la maquette */
.history-btn {
  position: absolute;
  left: 22px;        /* ajuste horizontalement pour correspondre à la maquette */
  top: 54px;         /* ajuste verticalement pour être légèrement en dessous de l'en-tête */
  padding: 10px 22px;
  font-weight: 600;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* petite correction : enlever margin-left appliquée précédemment */
.import-header .vs-button[type="filled"] {
  margin-left: 0;
}

/* Titre principal agrandi */
.section-title {
  font-size: 28px;         /* agrandi pour correspondre à la maquette */
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}
/* date range maquette */
.date-search { display:flex; align-items:center; margin-left:24px; }
.date-box{
  display:flex;
  align-items:center;
  gap:12px;
  background:#fff;
  border:1px solid rgba(195,45,57,0.12);
  border-radius:28px;
  padding:8px 14px;
  height:48px;            /* hauteur fixe comme la maquette */
  box-shadow:none;
}

/* calendar icon */
.calendar-icon{
  color: rgba(0,0,0,0.35);
  font-size:20px;
  margin-right:6px;
}

/* vs-input minimal styling so inputs look inline and clean */
.date-box .date-input {
  width:220px;
  max-width:220px;
}
.date-box .date-input .vs-input__container,
.date-box .date-input input {
  border: none !important;
  background: transparent !important;
  padding: 6px 8px !important;
  font-size:14px;
  color: #333;
  box-shadow: none !important;
}

/* separator "à" */
.date-sep{
  color: #666;
  font-size:14px;
  margin: 0 8px;
}

/* round search button */
.search-circle{
  width:40px;
  height:40px;
  border-radius:50%;
  border:1px solid rgba(0,0,0,0.08);
  background:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  margin-left:8px;
}
.search-circle .material-icons{ font-size:20px; color:#666; }

/* small responsiveness */
@media(max-width:900px){
  .date-box{ padding:6px 10px; height:44px; }
  .date-box .date-input{ width:160px; max-width:160px; }
  .section-title{ font-size:22px; }
}

/* bouton historique taille et style */
.import-header .vs-button,
.import-header .vs-button[type] {
  padding: 10px 22px;
  font-weight: 600;
  border-radius: 8px;
  margin-left: 24px;
}

/* ajustements généraux pour alignement avec la maquette */
.import-title {
  font-size: 18px;
  font-weight: 600;
  margin: 18px 0 10px 12px;
  color: #222;
  text-align: left;
}

/* reste du style inchangé */
.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
  gap: 32px 24px;
  margin-top: 10px;
}
.company-card {
  min-height: 220px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  position: relative;
  padding-bottom: 18px;
}
.company-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}
.company-name {
  font-weight: 600;
  font-size: 18px;
  color: #222;
}
.company-status {
  display: flex;
  gap: 48px;
  margin-bottom: 10px;
  justify-content: flex-start;
}
.status-title {
  font-size: 16px;
  font-weight: 500;
  color: #757575;
  margin-left: 4px;
}
.company-values {
  display: flex;
  gap: 48px;
  margin-bottom: 8px;
  justify-content: flex-start;
}
.value {
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin-right: 4px;
}
.value-label {
  font-size: 15px;
  color: #757575;
}
.card-bottom-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 5px;
  background: #43a047;
  border-radius: 0 0 12px 12px;
}
</style>
// ...existing code...