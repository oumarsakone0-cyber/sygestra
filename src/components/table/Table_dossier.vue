// ...existing code...
<template>
  <div class="table-dossier">
    <vs-table stripe :data="computedRows">
      <template slot="header">
        <h3>LISTE DES DOSSIERS</h3>
      </template>

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
            <button class="dossier-pill" @click="generatePdf(row)" :title="'Télécharger PDF: ' + row.numero">
              <div class="num">{{ row.numero }}</div>
              <small class="sub" v-if="row.sub">{{ row.sub }}</small>
            </button>
          </vs-td>

          <vs-td>{{ row.reception }}</vs-td>
          <vs-td>
            <div class="badt-bg">
              <span class="badt-date">{{ row.badt }}</span>
            </div>
          </vs-td>
          <vs-td>{{ row.client }}</vs-td>
          <vs-td>{{ row.armateur }}</vs-td>
          <vs-td class="cell-center">{{ row.tcs }}</vs-td>
          <vs-td class="cell-center">{{ row.scan ? '✓' : '0' }}</vs-td>
          <vs-td class="cell-center">{{ row.livre ? '✓' : '0' }}</vs-td>
          <vs-td class="cell-center">{{ row.recup ? '✓' : '0' }}</vs-td>
          <vs-td>{{ row.zone }}</vs-td>
          <vs-td>{{ row.declaration }}</vs-td>
          <vs-td>
            <a :href="row.blLink || '#'" target="_blank" class="link">{{ row.bl }}</a>
          </vs-td>
          <vs-td class="cell-type">{{ row.type }}</vs-td>
          <vs-td>
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
        { id: 1, numero: "12/24 - PM 14", sub: "14", reception: "2024-12-26", badt: "2024-12-26", client: "ACTIVA TRADE", armateur: "PROPRE MOYEN", tcs: 4, scan: true, livre: true, recup: false, zone: "COCODY", declaration: "C72872", bl: "COSU5403205400", blLink: "#", type: "4 20’" },
        { id: 2, numero: "12/24 - PM 13", sub: "13", reception: "2024-12-26", badt: "2024-12-28", client: "AFRICA IMPORT", armateur: "PROPRE MOYEN", tcs: 1, scan: false, livre: true, recup: false, zone: "YOPOUGON", declaration: "C72376", bl: "MEDUFS972569", blLink: "#", type: "1 20’" }
      ]
    };
  },
  computed: {
    computedRows() {
      return (this.rows && this.rows.length) ? this.rows : this.sampleRows;
    }
  },
  methods: {
    async generatePdf(row) {
      try {
        // dynamic import to avoid build errors if not installed
        const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
        const res = await fetch("/dossier.pdf"); // put dossier.pdf in public/
        const existingPdfBytes = await res.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const page = pdfDoc.getPages()[0];
        const { height } = page.getSize();
        const helv = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontSize = 11;
        const leftX = 40;
        let y = height - 80;

        page.drawText(`N° Dossier: ${row.numero}`, { x: leftX, y, size: fontSize, font: helv, color: rgb(0,0,0) });
        y -= 16;
        page.drawText(`Reception: ${row.reception || ""}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`BADT: ${row.badt || ""}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`Client: ${row.client || ""}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`Armateur: ${row.armateur || ""}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`TC(s): ${row.tcs || ""}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`Scan: ${row.scan ? "Oui" : "Non"}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`Livré: ${row.livre ? "Oui" : "Non"}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`Récup: ${row.recup ? "Oui" : "Non"}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`ZONE: ${row.zone || ""}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`DECLARATION: ${row.declaration || ""}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`BL: ${row.bl || ""}`, { x: leftX, y, size: fontSize, font: helv });
        y -= 16;
        page.drawText(`Type: ${row.type || ""}`, { x: leftX, y, size: fontSize, font: helv });

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
        /* Keep message short */
        console.error(err);
        alert("Erreur génération PDF. Vérifie pdf-lib et public/dossier.pdf");
      }
    }
  }
};
</script>

<style scoped>
.table-dossier { font-family: "Montserrat", Arial, sans-serif; color: #222; }
.dossier-pill { background: #fbe9ec; color: #0b63b8; border: none; padding: 12px 16px; border-radius: 28px; cursor: pointer; display: inline-block; text-align:center; }
.badt-bg { background: #e9f3ff; padding: 6px 8px; border-radius:6px; display:inline-block; }
.badt-date { color:#d32f2f; font-weight:700; }
.cell-center { text-align:center; }
.view-btn { background:#2b9bdf; border:none; color:#fff; width:40px; height:40px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; }
.link { color:#1e88e5; text-decoration:none; }
</style>
