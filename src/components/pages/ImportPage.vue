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



<style >
/* Layout global */
.import-page {
  padding: 0 ;
  margin: -18px;
  box-sizing: border-box;
}

/* Header card */
.header-card {
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 10px 20px 20px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
  overflow: visible;
  width: 100%;
  max-height: max-content;
}

/* Red bottom accent */
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

/* Header layout */
.import-header {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  z-index: 2;
}

/* Left block (title + date) */
.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1 1 auto;
  min-width: 0; /* éviter overflow */
}

/* Historique button (desktop) */
.history-btn {
  margin-left: auto;
  padding: 10px 18px;
  font-weight: 600;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  min-width: 110px;
  z-index: 3;
}

/* Optional hidden left-history variant */
.history-btn-left { display: none !important; }

/* Title */
.section-title {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-weight: 700;
  font-size: 28px;
  white-space: nowrap;
}
.title-dossiers { color: #c32d39; }
.title-sub { color: #222; }
.slash { margin: 0 6px; color: rgba(0,0,0,0.45); }

/* Date range container */
.date-search { display: flex; align-items: center; }
.date-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 34px;
  padding: 10px 16px;
  height: 52px;
  box-sizing: border-box;
  min-width: 300px;
}
.calendar-icon { color: rgba(0,0,0,0.35); font-size: 28px; margin-right: 6px; }
.block { display:flex; align-items:center; gap:10px; height: auto; }

/* el-date-picker styling */
.el-range-picker { width: 420px; max-width: 100%; background: transparent; }
.el-range-picker .el-input__inner {
  border: none;
  padding: 6px 8px;
  font-size: 14px;
  background: transparent;
  box-shadow: none;
}

/* Search round button */
.search-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.08);
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.search-circle .material-icons { font-size: 20px; color: #666; }

/* Subtitle */
.import-title {
  font-size: 18px;
  font-weight: 600;
  margin: 18px 0 10px 4px;
  color: #222;
  text-align: left;
}

/* Cards grid */
.companies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 28px 22px;
  margin-top: 10px;
  width: 100%;
  box-sizing: border-box;
}

/* Company card */
.company-card {
  max-width: max-content;
  min-height: 200px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.07);
  position: relative;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
  word-break: break-word;
}
.company-card-header { display:flex; align-items:center; gap:10px; font-size:40px; font-weight:600; margin-bottom:12px; }
.company-name { font-weight:600; font-size:28px; color:#222; }

/* Status / values */
.company-status { display:flex; gap:36px; margin-bottom:10px; align-items:flex-start; }
.status-block { display:flex; flex-direction:column; align-items:flex-start; gap:6px; }
.status-label { font-size:26px; font-weight:500; color:#757575; margin-top:6px; }

.company-values { display:flex; gap:36px; margin-bottom:8px; align-items:flex-end; }
.value { font-size:28px; font-weight:700; color:#222; margin-bottom:6px; }
.value-label { font-size:24px; color:#757575; }

/* Card bottom bar */
.card-bottom-bar { position:absolute; left:0; bottom:0; width:100%; height:4px; background:#2dc732; border-radius:0 0 12px 12px; }

/* ---------- RESPONSIVE ---------- */

/* Tablet / small screens */
@media (max-width: 900px) {
  .import-header {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }

  .header-left {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }

  .section-title { font-size: 20px; }

  .date-box {
    width: 100%;
    justify-content: space-between;
    padding: 8px 12px;
    height: 44px;
    gap: 8px;
  }
  .el-range-picker { width: 100% !important; max-width: none; }

  .history-btn {
    margin-left: 0;
    align-self: flex-end;
    padding: 8px 12px;
    min-width: 90px;
    font-size: 14px;
  }

  .companies-grid {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 18px;
  }

  .company-card { min-height: 160px; padding: 14px; }
}

/* Narrow mobile (smartphones) */
@media (max-width: 420px) {
  .header-card { padding: 0px; }
  .header-bottom-bar { height: 4px; bottom: -5px; }

  .import-header { gap: 8px; align-items: flex-start; }

  .section-title { font-size: 20px; }

  /* compact history button: icon-only */
  .history-btn {
    margin-left: 8px;
    padding: 8px;
    width: 35px;
    height: 40px;
    font-size: 0; /* hide text label, keep icon */
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .history-btn .vs-icon,
  .history-btn i.material-icons { font-size: 18px; }

  /* date full width below title */
  .date-search { width: 100%; order: 2; }
  .date-box { width: 100%; padding: 6px 10px; height: 44px; border-radius: 22px; }

  /* narrow cards like mock */
  .companies-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
    margin-top: 16px;
  }
  .company-card { min-height: 100px; margin: auto; padding: 1px; border-radius: 8px; }

  .company-card-header { font-size: 13px; gap: 8px; }
  .company-name { font-size: 12px; }
  .company-status { gap: 10px; }
  .status-label { font-size: 12px; }
  .company-values { gap: 8px; }
  .value { font-size: 14px; }
  .value-label { font-size: 12px; color: #888; }
}

/* Safety: prevent truncation */
.history-btn, .history-btn * { white-space: nowrap; overflow: visible; }
</style>