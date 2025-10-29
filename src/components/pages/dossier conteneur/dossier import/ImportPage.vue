<template>
  <div class="import-page">
    <!-- Header Card -->
    <div class="header-card">
      <div class="header-content">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <i class="bx bx-home home-icon">
            <span class="material-icons">
             home
            </span>
          </i>
          <span class="breadcrumb-text">DOSSIERS</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">IMPORT</span>
        </div>

        <!-- Date Range Picker -->
        <div class="date-picker-wrapper">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="à"
            start-placeholder="2025-10-20"
            end-placeholder="2025-10-20"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            class="date-range-picker"
          />
          <vs-button
            circle
            icon
            color="#f5f5f5"
            class="search-button"
            @click="searchData"
          >
            <i class="bx bx-search search-icon">
              <span class="material-icons">
               search
              </span>
            </i>
          </vs-button>
        </div>

        <!-- Historique Button -->
        <vs-button
          color="danger"
          class="historique-button"
          @click="goToHistorique"
        >
          <i class="bx bx-list-ul">
            <span class="material-icons">
             list
            </span>
          </i>
          Historique
        </vs-button>
      </div>
    </div>
    <br><br><br><br><br><br><br><br>

    <!-- Title -->
    <div class="page-title">
      <h2>BILAN ARMATEURS <span class="import-text">IMPORT </span></h2>
    </div>

    <!-- Armateurs Grid -->
    <div class="armateurs-grid">
      <div 
        v-for="armateur in armateurs"
        :key="armateur.id"
        class="armateur-card"
      >
        <!-- Armateur Header -->
        <div class="armateur-header">
          <i class="bx bxs-truck truck-icon">
            <span class="material-icons">
             local_shipping
            </span>
          </i>
          <h3 class="armateur-name">{{ armateur.name }}</h3>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <!-- STOCK -->
          <div class="stat-item">
            <div class="stat-icon-wrapper stock">
              <i class="bx bx-box">
                <span class="material-icons">
                 inventory
                </span>
              </i>
            </div>
            <div class="stat-label">STOCK</div>
            <div class="stat-values">
              <div class="stat-value">
                <span class="value-number">{{ armateur.stock.ordres }}</span>
                <span class="value-label">Ordre(s)</span>
              </div>
            </div>
          </div>

          <!-- LIVRE -->
          <div class="stat-item">
            <div class="stat-icon-wrapper livre">
              <i class="bx bx-check">
                <span class="material-icons">
                  done_all
                </span>
              </i>
            </div>
            <div class="stat-label">LIVRE</div>
            <div class="stat-values">
              <div class="stat-value">
                <span class="value-number">{{ armateur.livre.conteneurs }}</span>
                <span class="value-label">Conteneur(s)</span>
              </div>
            </div>
          </div>

          <!-- RECUPERE -->
          <div class="stat-item">
            <div class="stat-icon-wrapper recupere">
              <i class="bx bxs-truck">
                <span class="material-icons">
                 trolley
                </span>
              </i>
            </div>
            <div class="stat-label">RECUPERE</div>
            <div class="stat-values">
              <div class="stat-value">
                <span class="value-number">{{ armateur.recupere.ordres }}</span>
                <span class="value-label">Ordre(s)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Green Bar -->
        <div class="green-bar"></div>
      </div>
    </div>
    <br><br><hr><br><br>
     <!-- Liste des dossiers -->
  <Table_dossier />
  <br><br><hr><br><br>
  <!-- Formulaire modal -->
  <formulaire_dossier />
  </div>
</template>

<script>
import Table_dossier from '@/components/table/Table_dossier.vue';
import formulaire_dossier from '@/components/formulaire_dossier/formulaire_dossier.vue';

export default {
  name: 'ImportPage',
  components: {
    formulaire_dossier,
    Table_dossier
  },

  data() {
    return {
      dateRange: ['2025-10-20', '2025-10-20'],
      armateurs: [
        {
          id: 1,
          name: 'AGL',
          stock: { ordres: 0 },
          livre: { conteneurs: 0 },
          recupere: { ordres: 0 }
        },
        {
          id: 2,
          name: 'ARKAS SOGENA',
          stock: { ordres: 0 },
          livre: { conteneurs: 0 },
          recupere: { ordres: 0 }
        },
        {
          id: 3,
          name: 'CMA CGM',
          stock: { ordres: 0 },
          livre: { conteneurs: 0},
          recupere: { ordres: 0 }
        },
        {
          id: 4,
          name: 'MAERSK',
          stock: { ordres: 0 },
          livre: { conteneurs: 0 },
          recupere: { ordres: 0 }
        },
        {
          id: 5,
          name: 'PIL',
          stock: { ordres: 0 },
          livre: { conteneurs: 0},
          recupere: { ordres: 0 }
        },
        {
          id: 6,
          name: 'PROPRE MOYEN',
          stock: { ordres: 0 },
          livre: { conteneurs: 0},
          recupere: { ordres: 0 }
        }
      ]
    }
  },
  methods: {
    searchData() {
       this.dateRange
      // Logique de recherche à implémenter
    },
    goToHistorique() {
      console.log('Navigation vers Historique')
      // Navigation à implémenter
      this.$router.push('/historique')
    }
  }
}
</script>

<style scoped>
.import-page {
  padding: 10px;
  min-height: 100vh;
  gap: 20px;
  
}

/* Header Card */
.header-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-bottom: 4px solid #e53935;
  position: fixed;
  top: 48px; /* below navbar */
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
}


.home-icon {
  color: #e53935;
  font-size: 24px;
}

.breadcrumb-text {
  color: #e53935;
  font-weight: 600;
}

.breadcrumb-separator {
  color: #666;
}

.breadcrumb-current {
  color: #333;
  font-weight: 600;
}

/* Date Picker */
.date-picker-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.date-range-picker {
  width: 350px;
}

.search-button {
  width: 40px;
  height: 40px;
  min-width: 40px;
}

.search-icon {
  color: #666;
  font-size: 30px;
}

/* Historique Button */
.historique-button {
  margin-left: auto;
  display: flex;
  align-items:flex end;
  gap: 8px;
  padding: 10px 20px;
  font-weight: 500;
}

.historique-button i {
  font-size: 18px;
  
}

/* Page Title */
.page-title {
  margin-bottom: 30px;
}

.page-title h2 {
  font-size: 20px;
  color: #666;
  font-weight: 400;
  margin: 0;
}

.import-text {
  font-weight: 600;
  color: #333;
}

/* Armateurs Grid */
.armateurs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

/* Armateur Card */
.armateur-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

/* Armateur Header */
.armateur-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.truck-icon {
  font-size: 32px;
  color: #5b9bd5;
}

.armateur-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
  flex-direction: column;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 15px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* Stat Icons */
.stat-icon-wrapper {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2px;
  color: white;
}

.stat-icon-wrapper.stock {
  background-color: #ffa726;
}

.stat-icon-wrapper.livre {
  background-color: #66bb6a;
}

.stat-icon-wrapper.recupere {
  background-color: #730ed8;
}
.stat-icon-wrapper.armateur-name {
  background-color: #5b9bd5;
}

/* Stat Label */
.stat-label {
  font-size: 16px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
}

/* Stat Values */
.stat-values {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value-number {
  font-size: 20px;
  font-weight: 700;
  color: #333;
}

.value-label {
  font-size: 11px;
  color: #999;
}

/* Green Bar */
.green-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: #66bb6a;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: stretch;
    min-width: min-content;
    min-height: min-content;
  }

  .historique-button {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }

  .date-picker-wrapper {
    flex-direction: column;
    width: 100%;
  }

  .date-range-picker {
    width: 100%;
  }

  .armateurs-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
/* ✅ Fix responsivité du header sur mobile */
@media (max-width: 992px) {
  .header-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 16px;
    border-bottom-width: 3px;
  }

  /* On évite l'écrasement du contenu en dessous */
  .import-page {
    padding-top: 110px !important;
  }

  .breadcrumb {
    font-size: 16px;
    flex-wrap: wrap;
  }

  .date-picker-wrapper {
    width: 100%;
    justify-content: space-between;
  }

  .date-range-picker {
    width: 100%;
  }

  .historique-button {
    width: 100%;
    justify-content: center;
  }
}

/* ✅ Ultra-small mobiles (≤480px) */
@media (max-width: 480px) {
  .header-card {
    top: 40px;
    padding: 12px;
  }

  .import-page {
    padding-top: 140px !important;
  }

  .breadcrumb {
    font-size: 14px;
  }

  .armateurs-grid {
    grid-template-columns: 1fr; /* une seule carte par ligne */
  }

  .stat-icon-wrapper {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  .value-number {
    font-size: 18px;
  }
}

/* ✅ Sécurité : empêche le débordement horizontal */
* {
  max-width: 100%;
  box-sizing: border-box;
}

</style>
