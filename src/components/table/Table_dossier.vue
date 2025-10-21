<template>
  <div class="table-dossier">
    <!-- Added header with title, export button, and BADT badge -->
    <div class="table-header">
      <div class="header-left">
        <h2 class="title">LISTE DES DOSSIERS</h2>
        <button class="export-btn">
          <i class="material-icons">description</i>
          EXPORTER
        </button>
      </div>
      <vs-button class="badt-badge" @click="voirBADT">
        BADT du jour: {{ badtCount }}/cs
      </vs-button>


    </div>

    <vs-table stripe :data="computedRows">
      <template slot="thead">
        <vs-th>N° Dossier</vs-th>
        <vs-th>Reception</vs-th>
        <vs-th>BADT</vs-th>
        <vs-th>Client</vs-th>
        <vs-th>Armateur</vs-th>
        <vs-th>TC(s)</vs-th>
        <vs-th>Scan</vs-th>
        <vs-th>Livré</vs-th>
        <vs-th>Récup</vs-th>
        <vs-th>ZONE</vs-th>
        <vs-th>DECLARATION</vs-th>
        <vs-th>BL</vs-th>
        <vs-th>Type</vs-th>
        <vs-th></vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr v-for="(row, idx) in data" :key="row.id || idx">
          <vs-td>
            <!-- Updated pill design to match image -->
            <button class="dossier-pill" @click="generatePdf(row)" :title="'Télécharger PDF: ' + row.numero">
              {{ row.numero }}
            </button>
          </vs-td>

          <vs-td>{{ row.reception }}</vs-td>
          <vs-td>
            <!-- Updated BADT styling with light blue background and red text -->
            <div class="badt-cell">
              <span class="badt-date">{{ row.badt }}</span>
            </div>
          </vs-td>
          <vs-td>{{ row.client }}</vs-td>
          <vs-td class="armateur-cell">{{ row.armateur }}</vs-td>
          <vs-td class="cell-center">{{ row.tcs }}</vs-td>
          <vs-td class="cell-center">
            <!-- Show 0 or number for scan -->
            <span :class="row.scan > 0 ? 'value-positive' : 'value-zero'">{{ row.scan || 0 }}</span>
          </vs-td>
          <vs-td class="cell-center">
            <!-- Added green checkmark with number for Livré -->
            <div v-if="row.livre > 0" class="check-value">
              <i class="material-icons check-icon">check</i>
              <span class="check-number">{{ row.livre }}</span>
            </div>
            <span v-else class="value-zero">0</span>
          </vs-td>
          <vs-td class="cell-center">
            <!-- Added green checkmark with number for Récup -->
            <div v-if="row.recup > 0" class="check-value">
              <i class="material-icons check-icon">check</i>
              <span class="check-number">{{ row.recup }}</span>
            </div>
            <span v-else class="value-zero">0</span>
          </vs-td>
          <vs-td>{{ row.zone }}</vs-td>
          <vs-td>
            <!-- Styled declaration as blue link -->
            <span class="declaration-link">{{ row.declaration }}</span>
          </vs-td>
          <vs-td>
            <!-- Styled BL as blue link -->
            <span class="bl-link">{{ row.bl }}</span>
          </vs-td>
          <vs-td class="cell-type">
            <span class="type-text">{{ row.type }}</span>
          </vs-td>
          <vs-td>
            <!-- Updated view button to blue circular icon -->
            <button class="view-btn" @click="$emit('view', row)" title="Voir">
              <i class="material-icons">visibility</i>
            </button>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  name: "TableDossier",
  props: {
    rows: { type: Array, default: () => [] }
  },
  data() {
    return {
      sampleRows: [
        { 
          id: 1, 
          numero: "12/24 - PM 14", 
          reception: "2024-12-26", 
          badt: "2024-12-26", 
          client: "ACTIVA TRADE", 
          armateur: "PROPRE MOYEN", 
          tcs: 4, 
          scan: 0, 
          livre: 4, 
          recup: 0, 
          zone: "COCODY", 
          declaration: "C72872", 
          bl: "COSU5403205400", 
          type: "4 20'" 
        },
        { 
          id: 2, 
          numero: "12/24 - PM 13", 
          reception: "2024-12-26", 
          badt: "2024-12-28", 
          client: "AFRICA IMPORT", 
          armateur: "PROPRE MOYEN", 
          tcs: 1, 
          scan: 0, 
          livre: 1, 
          recup: 0, 
          zone: "YOPOUGON", 
          declaration: "C72376", 
          bl: "MEDUFS972569", 
          type: "1 20'" 
        },
        { 
          id: 3, 
          numero: "12/24 - MAE 45", 
          reception: "2024-12-20", 
          badt: "", 
          client: "MEDINEX", 
          armateur: "Maersk", 
          tcs: 2, 
          scan: 0, 
          livre: 2, 
          recup: 0, 
          zone: "BINGERVILLE", 
          declaration: "C70934", 
          bl: "246039074", 
          type: "2 40'" 
        },
        { 
          id: 4, 
          numero: "12/24 - MAE 44", 
          reception: "2024-12-18", 
          badt: "2024-12-20", 
          client: "", 
          armateur: "Maersk", 
          tcs: 1, 
          scan: 0, 
          livre: 1, 
          recup: 1, 
          zone: "MARCORY AVANT BLD", 
          declaration: "C70780", 
          bl: "247128580", 
          type: "1 40'" 
        },
        { 
          id: 5, 
          numero: "12/24 - MAE 43", 
          reception: "2024-12-18", 
          badt: "2024-12-20", 
          client: "GTSE", 
          armateur: "Maersk", 
          tcs: 1, 
          scan: 0, 
          livre: 1, 
          recup: 1, 
          zone: "MARCORY AVANT BLD", 
          declaration: "C70624", 
          bl: "246227841", 
          type: "1 40'" 
        }
      ]
    };
  },
  computed: {
    computedRows() {
      return (this.rows && this.rows.length) ? this.rows : this.sampleRows;
    },
    badtCount() {
      return this.computedRows.filter(row => row.badt).length;
    }
  },
  methods: {
    voirBADT() {
      this.sampleRows;
    },
    async generatePdf(row) {
      try {
        const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
        

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]);
        const { height } = page.getSize();
        const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const fontSize = 11;
        const leftX = 40;
        let y = height - 60;
        

        page.drawText("FICHE DOSSIER", { x: leftX, y, size: 18, font: helv, color: rgb(0,0,0.8) });
        y -= 30;

        const infos = [
          `N° Dossier: ${row.numero}`,
          `Reception: ${row.reception || ""}`,
          `BADT: ${row.badt || ""}`,
          `Client: ${row.client || ""}`,
          `Armateur: ${row.armateur || ""}`,
          `TC(s): ${row.tcs || ""}`,
          `Scan: ${row.scan || 0}`,
          `Livré: ${row.livre || 0}`,
          `Récup: ${row.recup || 0}`,
          `ZONE: ${row.zone || ""}`,
          `DECLARATION: ${row.declaration || ""}`,
          `BL: ${row.bl || ""}`,
          `Type: ${row.type || ""}`
        ];

        infos.forEach(info => {
          page.drawText(info, { x: leftX, y, size: fontSize, font: helv, color: rgb(0,0,0) });
          y -= 16;
        });

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Dossier_${row.numero}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

      } catch (err) {
        console.error(err);
        alert("Erreur génération PDF.");
      }
    }
  }
};
</script>

<style scoped>
/* Updated all styles to match the provided image design */
.table-dossier { 
  font-family: "Montserrat", Arial, sans-serif; 
  color: #333; 
  background: #f5f5f5;
  padding: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.title {
  font-size: 18px;
  font-weight: 700;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.title::before {
  content: "📊";
  font-size: 20px;
}

.export-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.export-btn:hover {
  background: #45a049;
  transform: translateY(-1px);
}

.export-btn .material-icons {
  font-size: 16px;
}

.badt-badge {
  background: #ff5252;
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.dossier-pill { 
  background: #fce4ec; 
  color: #1976d2; 
  border: none; 
  padding: 10px 20px; 
  border-radius: 25px; 
  cursor: pointer; 
  font-weight: 700; 
  font-size: 13px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.dossier-pill:hover { 
  transform: translateY(-2px); 
  box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
  background: #f8bbd0;
}

.badt-cell {
  background: #e3f2fd;
  padding: 8px 12px;
  border-radius: 6px;
  display: inline-block;
  min-width: 90px;
  text-align: center;
}

.badt-date { 
  color: #d32f2f; 
  font-weight: 700;
  font-size: 13px;
}

.armateur-cell {
  color: #666;
  font-size: 13px;
}

.cell-center { 
  text-align: center;
  vertical-align: middle;
}

.cell-type {
  text-align: center;
}

.type-text {
  color: #666;
  font-size: 12px;
}

.check-value {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.check-icon {
  color: #4caf50;
  font-size: 20px;
  font-weight: bold;
}

.check-number {
  color: #4caf50;
  font-weight: 700;
  font-size: 14px;
}

.value-zero {
  color: #f44336;
  font-weight: 700;
  font-size: 14px;
}

.value-positive {
  color: #4caf50;
  font-weight: 700;
  font-size: 14px;
}

.declaration-link,
.bl-link {
  color: #1976d2;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.declaration-link:hover,
.bl-link:hover {
  text-decoration: underline;
}

.view-btn { 
  background: #2196f3; 
  border: none; 
  color: white; 
  width: 42px; 
  height: 42px; 
  border-radius: 50%; 
  display: inline-flex; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer; 
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.view-btn:hover { 
  background: #1976d2; 
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.view-btn .material-icons {
  font-size: 20px;
}

/* Override Vuesax table styles */
::v-deep .vs-table {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

::v-deep .vs-table-thead {
  background: #fafafa;
}

::v-deep .vs-table-thead th {
  font-weight: 600;
  color: #555;
  font-size: 13px;
  padding: 12px 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

::v-deep .vs-table-tbody tr {
  transition: all 0.2s ease;
}

::v-deep .vs-table-tbody tr:hover {
  background: #f9f9f9;
}

::v-deep .vs-table-tbody td {
  padding: 12px 8px;
  font-size: 13px;
  color: #333;
}
</style>
