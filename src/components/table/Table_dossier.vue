<template>
  <div class="tableau-dossiers">
    <!-- En-tête avec titre et boutons -->
    <div class="header-section">
      <div class="header-left">
        <h1 class="title">
          LISTE DES DOSSIERS
          
        </h1>
        <vs-button 
          color="success" 
          type="filled"
          @click="exporterExcel"
          class="btn-exporter"
        >
          EXPORTER
        </vs-button>
        <!-- Bouton BADT du jour -->
        <vs-button 
          color="danger" 
          @click="showModalBADT = true"
        >
          BADT du jour: {{ badtCount }}fcs
        </vs-button>

      </div>
      <div class="header-right">
        <vs-input 
          v-model="searchQuery" 
          placeholder="Rechercher..."
          icon="search"
          class="search-input"
        />
      </div>
    </div>
    <!-- MODALE BADT -->
    <div v-if="showModalBADT" class="badt-modal-overlay">
      <div class="modal-content-custom">
        <!-- Header -->
        <div class="modal-header">
          <h3>LISTE DES BADT DU JOUR</h3>
          <div class="modal-header-buttons">
            <vs-button color="success" @click="exporterExcel">EXPORTER</vs-button>
            <vs-button color="danger" @click="showModalBADT = false">✖</vs-button>
          </div>
        </div>

        <!-- Barre de recherche -->
        <vs-input 
          v-model="searchQuerybadt"
          placeholder="Rechercher..."
          icon="search"
          class="modal-search-input"
        />

        <!-- Tableau BADT -->
        <div class="modal-table-container">
          <table class="dossiers-table">
            <thead>
              <tr>
                <th>N° Dossier</th>
                <th>Reception</th>
                <th>BADT</th>
                <th>Client</th>
                <th>Armateur</th>
                <th>TC(s)</th>
                <th>Scan</th>
                <th>Livré</th>
                <th>Récup</th>
                <th>ZONE</th>
                <th>DECLARATION</th>
                <th>BL</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dossier in filteredBadtToday" :key="dossier.id">
                <td>{{ dossier.numero }}</td>
                <td>{{ dossier.dateReception }}</td>
                <td class="col-badt">{{ dossier.badt }}</td>
                <td>{{ dossier.client }}</td>
                <td>{{ dossier.armateur }}</td>
                <td class="text-center">{{ dossier.tcs }}</td>
                <td class="text-center">{{ dossier.scan }}</td>
                <td class="text-center">{{ dossier.livre }}</td>
                <td class="text-center">{{ dossier.recup }}</td>
                <td>{{ dossier.zone }}</td>
                <td>{{ dossier.declaration }}</td>
                <td>{{ dossier.bl }}</td>
                <td class="text-center">{{ dossier.type }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Tableau des dossiers -->
    <div class="table-container">
      <table class="dossiers-table">
        <thead>
          <tr>
            <th>N° Dossier</th>
            <th>Reception</th>
            <th>BADT</th>
            <th>Client</th>
            <th>Armateur</th>
            <th>TC(s)</th>
            <th>Scan</th>
            <th>Livré</th>
            <th>Récup</th>
            <th>ZONE</th>
            <th>DECLARATION</th>
            <th>BL</th>
            <th>Type</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dossier in filteredDossiers" :key="dossier.id">
            <!-- N° Dossier - Pastille rose cliquable -->
            <td>
              <div 
                class="dossier-pill"
                @click="genererPDF(dossier)"
              >
                {{ dossier.numero }}
              </div>
            </td>
            
            <!-- Date Reception -->
            <td class="col-reception">
              {{ dossier.dateReception }}
            </td>
            
            <!-- BADT - Case bleue avec texte rouge -->
            <td class="col-badt">
              {{ dossier.badt }}
            </td>


            
            <!-- Client -->
            <td>{{ dossier.client }}</td>
            
            <!-- Armateur -->
            <td>{{ dossier.armateur }}</td>
            
            <!-- TC(s) -->
            <td class="text-center">{{ dossier.tcs }}</td>
            
            <!-- Scan -->
            <td class="text-center">{{ dossier.scan }}</td>
            
            <!-- Livré - Coche verte avec nombre -->
            <td class="text-center">
              <div v-if="dossier.livre > 0" class="check-cell">
                <span class="check-icon">✓</span>
                <span class="check-number">{{ dossier.livre }}</span>
              </div>
              <span v-else>{{ dossier.livre }}</span>
            </td>
            
            <!-- Récup - Coche verte avec nombre -->
            <td class="text-center">
              <div v-if="dossier.recup > 0" class="check-cell">
                <span class="check-icon">✓</span>
                <span class="check-number">{{ dossier.recup }}</span>
              </div>
              <span v-else>{{ dossier.recup }}</span>
            </td>
            
            <!-- ZONE -->
            <td>{{ dossier.zone }}</td>
            
            <!-- DECLARATION - Lien bleu -->
            <td>
              <a :href="`#${dossier.declaration}`" class="link-blue">
                {{ dossier.declaration }}
              </a>
            </td>
            
            <!-- BL - Lien bleu -->
            <td>
              <a :href="`#${dossier.bl}`" class="link-blue">
                {{ dossier.bl }}
              </a>
            </td>
            
            <!-- Type -->
            <td class="text-center">
              <span class="type-badge">{{ dossier.type }}</span>
            </td>
            
            <!-- Bouton Voir - Cercle bleu -->
            <td>
              <vs-button 
                color="primary" 
                type="filled"
                icon="visibility"
                circle
                @click="voirDossier(dossier)"
                class="btn-voir"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableauDossiers',
  data() {
    return {
      showModalBADT: false,
      searchQuerybadt:'',
      searchQuery: '',
      dossierbadt: [
        {
          id: 1,
          numero: '10/25 - PM 14',
          dateReception: '2024-12-26',
          badt: '2025-10-29',
          client: 'ACTIVA TRADE',
          armateur: 'PROPRE MOYEN',
          tcs: 4,
          scan: 0,
          livre: 4,
          recup: 0,
          zone: 'COCODY',
          declaration: 'C72872',
          bl: 'COSU5403205400',
          type: '4 20\'',
          contact: 'MIENSAH',
          modeLivraison: 'PROPRE MOYEN',
          remorque: ''
        },
      ],
      
      dossiers: [
        {
          id: 1,
          numero: '12/24 - PM 14',
          dateReception: '2024-12-26',
          badt: '2024-12-26',
          client: 'ACTIVA TRADE',
          armateur: 'PROPRE MOYEN',
          tcs: 4,
          scan: 0,
          livre: 4,
          recup: 0,
          zone: 'COCODY',
          declaration: 'C72872',
          bl: 'COSU5403205400',
          type: '4 20\'',
          contact: 'MIENSAH',
          modeLivraison: 'PROPRE MOYEN',
          remorque: ''
        },
        {
          id: 2,
          numero: '12/24 - PM 13',
          dateReception: '2024-12-26',
          badt: '2024-12-28',
          client: 'AFRICA IMPORT',
          armateur: 'PROPRE MOYEN',
          tcs: 1,
          scan: 0,
          livre: 1,
          recup: 0,
          zone: 'YOPOUGON',
          declaration: 'C72376',
          bl: 'MEDUFS972569',
          type: '1 20\'',
          contact: '',
          modeLivraison: 'PROPRE MOYEN',
          remorque: ''
        },
        {
          id: 3,
          numero: '12/24 - MAE 45',
          dateReception: '2024-12-20',
          badt: '',
          client: 'MEDINEX',
          armateur: 'Maersk',
          tcs: 2,
          scan: 0,
          livre: 2,
          recup: 0,
          zone: 'BINGERVILLE',
          declaration: 'C70934',
          bl: '246039074',
          type: '2 40\'',
          contact: '',
          modeLivraison: 'Maersk',
          remorque: ''
        },
        {
          id: 4,
          numero: '12/24 - MAE 44',
          dateReception: '2024-12-18',
          badt: '2024-12-20',
          client: '',
          armateur: 'Maersk',
          tcs: 1,
          scan: 0,
          livre: 1,
          recup: 1,
          zone: 'MARCORY AVANT BLD',
          declaration: 'C70780',
          bl: '247128580',
          type: '1 40\'',
          contact: '',
          modeLivraison: 'Maersk',
          remorque: ''
        },
        {
          id: 5,
          numero: '12/24 - MAE 43',
          dateReception: '2024-12-18',
          badt: '2024-12-20',
          client: 'GTSE',
          armateur: 'Maersk',
          tcs: 1,
          scan: 0,
          livre: 1,
          recup: 1,
          zone: 'MARCORY AVANT BLD',
          declaration: 'C70624',
          bl: '246227841',
          type: '1 40\'',
          contact: '',
          modeLivraison: 'Maersk',
          remorque: ''
        }
      ]
    }
  },
  computed: {
    filteredDossiers() {
      if (!this.searchQuery) return this.dossiers
      
      const query = this.searchQuery.toLowerCase()
      return this.dossiers.filter(dossier => {
        return Object.values(dossier).some(value => 
          String(value).toLowerCase().includes(query)
        )
      })
    },
    badtToday() {
    const today = new Date().toISOString().split('T')[0];
    return this.dossierbadt.filter(d => d.badt === today);
   },
    filteredBadtToday() {
      if (!this.badtToday.length) return this.dossierbadt;

      if (!this.searchQuerybadt) return this.badtToday;

      const query = this.searchQuerybadt.toLowerCase();
      return this.badtToday.filter(dossier =>
        Object.values(dossier).some(value => 
          String(value).toLowerCase().includes(query)
        )
      );
    },

    badtCount() {
      return this.badtToday.length;
    
    }
  },
  methods: {
    exporterExcel() {
      // Créer le contenu CSV
      const headers = [
        'N° Dossier', 'Reception', 'BADT', 'Client', 'Armateur', 
        'TC(s)', 'Scan', 'Livré', 'Récup', 'ZONE', 
        'DECLARATION', 'BL', 'Type'
      ]
      
      let csvContent = headers.join(',') + '\n'
      
      this.filteredDossiers.forEach(dossier => {
        const row = [
          dossier.numero,
          dossier.dateReception,
          dossier.badt,
          dossier.client,
          dossier.armateur,
          dossier.tcs,
          dossier.scan,
          dossier.livre,
          dossier.recup,
          dossier.zone,
          dossier.declaration,
          dossier.bl,
          dossier.type
        ].map(value => `"${value}"`).join(',')
        
        csvContent += row + '\n'
      })
      
      // Télécharger le fichier
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `dossiers_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      this.$vs.notify({
        title: 'Export réussi',
        text: 'Les données ont été exportées en CSV',
        color: 'success',
        position: 'top-right'
      })
    },
    
    genererPDF(dossier) {
      // Créer une fenêtre d'impression avec le format SOCOGETRA
      const printWindow = window.open('', '_blank')
      
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Dossier ${dossier.numero}</title>
          <style>
            @page { margin: 2cm; }
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 3px solid #333;
              padding-bottom: 20px;
            }
            .logo {
              font-size: 48px;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 10px;
            }
            .company-name {
              font-size: 14px;
              color: #666;
              margin-bottom: 5px;
            }
            .company-full {
              font-size: 11px;
              color: #999;
            }
            .dossier-number {
              font-size: 36px;
              font-weight: bold;
              color: #e91e63;
              text-align: center;
              margin: 30px 0;
              padding: 20px;
              background: #ffe5f0;
              border-radius: 10px;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 16px;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 2px solid #e0e0e0;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }
            .info-item {
              display: flex;
              padding: 10px;
              background: #f8f9fa;
              border-radius: 5px;
            }
            .info-label {
              font-weight: bold;
              color: #555;
              min-width: 150px;
            }
            .info-value {
              color: #333;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              text-align: center;
              color: #999;
              font-size: 11px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">A</div>
            <div class="company-name">SOCOGETRA</div>
            <div class="company-full">SOCIETE GENERAL DE COMMERCE ET DE TRANSPORT</div>
          </div>
          
          <div class="dossier-number">${dossier.numero}</div>
          
          <div class="section">
            <div class="section-title">INFORMATIONS GÉNÉRALES</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">DATE RECEPTION:</span>
                <span class="info-value">${dossier.dateReception}</span>
              </div>
              <div class="info-item">
                <span class="info-label">BADT:</span>
                <span class="info-value">${dossier.badt || 'N/A'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">CLIENT:</span>
                <span class="info-value">${dossier.client || 'N/A'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">ARMATEUR:</span>
                <span class="info-value">${dossier.armateur}</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">DÉTAILS DU TRANSPORT</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">MODE LIVRAISON:</span>
                <span class="info-value">${dossier.modeLivraison}</span>
              </div>
              <div class="info-item">
                <span class="info-label">ZONE DE LIVRAISON:</span>
                <span class="info-value">${dossier.zone}</span>
              </div>
              <div class="info-item">
                <span class="info-label">REMORQUE:</span>
                <span class="info-value">${dossier.remorque || 'N/A'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">NBR TCS:</span>
                <span class="info-value">${dossier.tcs}</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">DOCUMENTS</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">NUM BL:</span>
                <span class="info-value">${dossier.bl}</span>
              </div>
              <div class="info-item">
                <span class="info-label">DECLARATION:</span>
                <span class="info-value">${dossier.declaration}</span>
              </div>
              <div class="info-item">
                <span class="info-label">TYPE:</span>
                <span class="info-value">${dossier.type}</span>
              </div>
              <div class="info-item">
                <span class="info-label">CONTACT:</span>
                <span class="info-value">${dossier.contact || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">STATUT</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">SCAN:</span>
                <span class="info-value">${dossier.scan}</span>
              </div>
              <div class="info-item">
                <span class="info-label">LIVRÉ:</span>
                <span class="info-value">${dossier.livre}</span>
              </div>
              <div class="info-item">
                <span class="info-label">RÉCUP:</span>
                <span class="info-value">${dossier.recup}</span>
              </div>
            </div>
          </div>
          
          <div class="footer">
            Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}
          </div>
        </body>
        </html>
      `
      
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      
      setTimeout(() => {
        printWindow.print()
      }, 250)
    },
    
   
  }
}
</script>

<style scoped>

/* Overlay semi-transparent */
.badt-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 10px;
}

/* Modale centrée et grande */
.modal-content-custom {
  background: #fff;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  max-height: 85vh;
  border-radius: 12px;
  overflow-y: auto;
  padding: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  position: relative;
}

/* Header modale */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

.modal-header-buttons {
  display: flex;
  gap: 10px;
}

/* Recherche dans la modale */
.modal-search-input {
  margin: 10px 0 15px 0;
  width: 300px;
}

/* Tableau dans la modale */
.modal-table-container {
  max-height: 70vh;
  overflow-y: auto;
  width: 100%;
}
.tableau-dossiers {
  padding: 0px;
  background: #fff;
}

/* En-tête */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.export-icon {
  font-size: 18px;
}

.btn-exporter {
  background: #4caf50 !important;
  font-weight: 600;
}

.btn-badt {
  background: #dc3545 !important;
  font-weight: 600;
}

.search-input {
  width: 300px;
}

/* Tableau */
.table-container {
  overflow-x: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.dossiers-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.dossiers-table thead {
  background: #f8f9fa;
}

.dossiers-table th {
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
  font-size: 13px;
  white-space: nowrap;
}

.dossiers-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #e9ecef;
  font-size: 13px;
}

.dossiers-table tbody tr:hover {
  background: #f8f9fa;
}

/* Pastille rose pour N° Dossier */
/* ✅ Nouvelle version : La pastille prend toute la cellule */
.dossier-pill {
  background: #ffe5f0;
  color: #314dea;
  font-weight: 600;
  text-align: center;
  display: inline-block;
  padding: 10px 0;
  width: 100%;
  border-radius: 12px; /* Option : tu peux mettre 6px */;
  border: 1px solid #ff99b8;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  white-space: nowrap;
}

.dossier-pill:hover {
  background: #ffcce0;
  box-shadow: 0 2px 4px rgba(233, 30, 99, 0.2);
}

/* ✅ Le TD devient entièrement bleu */
/* ✅ Le TD devient bleu et conserve son contenu visible */
td.col-badt {
  background: #e3f2fd !important;
  color: red !important;
  font-weight: 600;
  text-align: center;
  padding: 0 !important;
  vertical-align: middle; /* ✅ centre le contenu */
  white-space: nowrap;
  font-size: 13px;
}
.col-badt {
  background: #900c0c !important;
}
.col-reception {
   background: #dde1e2 !important;
  color: #313939 !important;
  font-weight: 600;
  text-align: center;
  padding: 0 !important;
  vertical-align: middle; /* ✅ centre le contenu */
  white-space: nowrap;
  font-size: 13px;
}



/* Coche verte */
.check-cell {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.check-icon {
  color: #4caf50;
  font-size: 18px;
  font-weight: bold;
}

.check-number {
  color: #4caf50;
  font-weight: 600;
  font-size: 12px;
}

/* Liens bleus */
.link-blue {
  color: #2196f3;
  text-decoration: none;
  font-weight: 500;
}

.link-blue:hover {
  text-decoration: underline;
}

/* Badge type */
.type-badge {
  font-size: 11px;
  color: #666;
}

/* Bouton voir */
.btn-voir {
  min-width: 40px !important;
  width: 40px !important;
  height: 40px !important;
}

.text-center {
  text-align: center;
}
</style>