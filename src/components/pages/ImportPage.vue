// ...existing code...
<template>
  <div class="import-page">
    <!-- header card with red bottom bar -->
    <div class="header-card">
      <div class="import-header">
        <span class="section-title">
          <vs-icon icon="home" size="22" color="#c32d39" />
          <span class="title-dossiers">DOSSIERS</span>
          <span class="slash">/</span>
          <span class="title-sub">IMPORT</span>
        </span>

        <!-- date range + recherche -->
        <div class="date-search">
          <div class="date-box">
            
            <div class="block">
              
              <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="à"
                start-placeholder="Date de début"
                end-placeholder="Date de fin"
                unlink-panels
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="onDateChange"
                class="el-range-picker"
              />
            </div>
            <button class="search-circle" @click="onFilter" aria-label="Rechercher">
              <i class="material-icons">search</i>
            </button>
          </div>
        </div>

        <!-- historique placed on the right inside header -->
        <vs-button class="history-btn" icon="list" type="filled" color="#c32d39">
          Historique
        </vs-button>
      </div>

      <!-- red bottom bar of the header card -->
      <div class="header-bottom-bar"></div>
    </div>

    <!-- Sous-titre -->
    <div class="import-title">
      BILAN ARMATEURS <span class="import-sub">IMPORT</span>
    </div>

    <!-- Grille cards (exemples) -->
    <div class="companies-grid">
      <vs-card v-for="c in companies" :key="c.name" class="company-card">
        <template #title>
          <div class="company-card-header">
            <vs-icon icon="local_shipping" size="28" color="#5b9bd5" />
            <span class="company-name">{{ c.name }}</span>
          </div>
        </template>

        <div class="company-status">
          <div class="status-block">
            <vs-icon icon="inventory_2" size="22" color="#f9a825" />
            <div class="status-label">STOCK</div>
          </div>
          <div class="status-block">
            <vs-icon icon="done_all" size="22" color="#43a047" />
            <div class="status-label">LIVRE</div>
          </div>
          <div class="status-block">
            <vs-icon icon="trolley" size="22" color="#5b6bc0" />
            <div class="status-label">RECUPERE</div>
          </div>
        </div>

        <div class="company-values">
          <div class="val-block">
            <div class="value">{{ c.stock }}</div>
            <div class="value-label">Ordre(s)</div>
          </div>
          <div class="val-block">
            <div class="value">{{ c.containers }}</div>
            <div class="value-label">Conteneur(s)</div>
          </div>
          <div class="val-block">
            <div class="value">{{ c.orders }}</div>
            <div class="value-label">Ordre(s)</div>
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
      value1:null,
      
      companies: [
        { name: "AGL", stock: "", containers: "", orders: ""},
        { name: "ARKAS SOGENA", stock: "", containers: "", orders: "" },
        { name: "CMA CGM", stock: "", containers: "", orders: "" },
        { name: "EVERGREEN", stock: "", containers: "", orders: "" },
        
        
      ]
    };
  },
  methods: {
    onDateChange(val) {
      if (Array.isArray(val) && val.length === 2) {
        this.dateStart = val[0];
        this.dateEnd = val[1];
      } else {
        this.dateStart = "";
        this.dateEnd = "";
      }
    },
    onFilter() {
      // placeholder: ici tu peux appeler ton API en utilisant this.dateStart / this.dateEnd
      // pour l'exemple on ne modifie pas companies
      // console.log('Filter dates', this.dateStart, this.dateEnd)
    }
  }
};
</script>

<style scoped>
.import-page { padding: 0 ;margin: -16px; }
/* header card */
/* header card container */
.header-card {
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 14px 22px 18px;
  margin-bottom: 18px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
  overflow: visible; /* important: éviter de couper le bouton */
}

/* bottom red bar */
.header-bottom-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -6px;
  height: 4px;
  background: #d87d85;
  border-radius: 0 0 8px 8px;
  z-index: 1;
}

/* header layout */
.import-header {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  z-index: 2; /* au-dessus de la barre rouge */
}

/* left block (titre + date) occupe l'espace disponible */
.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1 1 auto;
}

/* pousse le bouton à l'extrême droite */
.history-btn {
  margin-left: auto;
  padding: 10px 18px;
  font-weight: 600;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;   /* empêche le texte d'être cassé */
  min-width: 110px;      /* assure espace suffisant pour "Historique" */
  z-index: 3;
  overflow: visible;
}

/* si tu avais une version "history-btn-left", la cacher */
.history-btn-left { display: none !important; }

.section-title { display:flex; align-items:flex-start; gap:8px; font-weight:700; font-size:30px; }
.title-dossiers { color:#c32d39; }
.title-sub { color:#222; }
.slash { margin: 0 6px; color: rgba(0,0,0,0.45); }

/* date range */
.date-search { display:flex; align-items:center; margin-left:24px; }
.date-box{
  display:flex;
  align-items:center;
  gap:12px;
  background:#fff;  
  padding:8px 14px;
}
.calendar-icon{ color: rgba(0,0,0,0.35); font-size:20px; margin-right:6px; }
.block { display:flex; align-items:center; gap:10px; height: 100px; }


/* el-date-picker styling */
.el-range-picker { width:420px; max-width:100%; background:transparent; }
.el-range-picker .el-input__inner { border:none; padding:6px 8px; font-size:14px; background:transparent; box-shadow:none; }

/* search round button */
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



/* sous-titre */
.import-title { font-size: 18px; font-weight: 600; margin: 18px 0 10px 12px; color: #222; text-align:left; }
.import-sub { color:#222; font-weight:700; }

/* cards grid */
.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 28px 22px;
  margin-top: 10px;
}

/* company card */
.company-card {
  min-height: 220px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  position: relative;
  padding-bottom: 18px;
}
.company-card-header { display:flex; align-items:center; gap:10px; font-size:20px; font-weight:600; margin-bottom:12px; }
.company-name { font-weight:600; font-size:18px; color:#222; }

.company-status { display:flex; gap:48px; margin-bottom:10px; justify-content:flex-start; }
.status-block { display:flex; flex-direction:column; align-items:flex-start; gap:6px; }
.status-label { font-size:16px; font-weight:500; color:#757575; margin-top:6px; }

.company-values { display:flex; gap:48px; margin-bottom:8px; justify-content:flex-start; align-items:flex-end; }
.val-block { display:flex; flex-direction:column; align-items:flex-start; }
.value { font-size:20px; font-weight:700; color:#222; margin-bottom:6px; }
.value-label { font-size:15px; color:#757575; }

.card-bottom-bar { position:absolute; left:0; bottom:0; width:100%; height:4px; background:#2dc732; border-radius:0 0 12px 12px; }

/* responsive tweaks */
@media (max-width: 900px) {
  .el-range-picker { width:300px; }
  .section-title { font-size:18px; }
  .history-btn { left:12px; top:56px; padding:8px 16px; }
  .companies-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
}
</style>