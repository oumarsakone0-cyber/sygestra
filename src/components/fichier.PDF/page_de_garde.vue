<template>
  <div class="page-wrapper">
    <div class="toolbar no-print">
      <button class="btn secondary" @click="$router.back()">← Retour</button>
      <div class="spacer"></div>
      <button class="btn" @click="printPdf">Télécharger PDF</button>
    </div>

    <div class="a4" ref="printArea">
      <div class="page-title">PAGE DE GARDE</div>
      <!-- En-tête -->
      <div class="header">
        <img v-if="logoUrl" :src="logoUrl" alt="logo" class="logo" />
        <div class="company">{{ societe || 'SOCIETE GENERAL DE COMMERCE ET DE TRANSPORT' }}</div>
      </div>

      <!-- Bandeau principal -->
      <div class="banner">
        <div class="ref">{{ reference }}</div>
        <div class="title">
          <div class="line1">{{ titreL1 }}</div>
          <div class="line2">{{ titreL2 }}</div>
        </div>
        <div class="client">{{ client }}</div>
      </div>

      <!-- Tableau d’infos -->
      <div class="info-list">
        <div class="row"><span class="label">DATE RECEPTION</span><span class="value">{{ dateReception }}</span></div>
        <div class="row"><span class="label">TRANSITAIRE</span><span class="value">{{ transitaire }}</span></div>
        <div class="row"><span class="label">MODE LIVRAISON</span><span class="value">{{ modeLivraison }}</span></div>
        <div class="row"><span class="label">ZONE DE LIVRAISON</span><span class="value">{{ zoneLivraison }}</span></div>
        <div class="row"><span class="label">NUM BL</span><span class="value">{{ numBL }}</span></div>
        <div class="row"><span class="label">DECLARATION</span><span class="value">{{ declaration }}</span></div>
        <div class="row"><span class="label">NBR TCS</span><span class="value">{{ nbrTCS }}</span></div>
        <div class="row"><span class="label">BADT</span><span class="value">{{ badtDate }}</span></div>
        <div class="row"><span class="label">CONTACT</span><span class="value">{{ contact }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageDeGardePdf',
  props: {
    societe: { type: String, default: 'SOCIETE GENERAL DE COMMERCE ET DE TRANSPORT' },
    logoUrl: { type: String, default: '' },
    reference: { type: String, default: '12/24 - PM 14' },
    titreL1: { type: String, default: 'PROPRE' },
    titreL2: { type: String, default: 'MOYEN' },
    client: { type: String, default: 'ACTIVA TRADE' },
    dateReception: { type: String, default: '' },
    transitaire: { type: String, default: '' },
    modeLivraison: { type: String, default: '' },
    zoneLivraison: { type: String, default: '' },
    numBL: { type: String, default: '' },
    declaration: { type: String, default: '' },
    nbrTCS: { type: [String, Number], default: '' },
    badtDate: { type: String, default: '' },
    contact: { type: String, default: '' }
  },
  methods: {
    printPdf() {
      // Ouvre une fenêtre propre avec uniquement le contenu à imprimer
      const printContent = this.$refs.printArea
      const win = window.open('', '_blank', 'noopener,noreferrer')
      if (!win) return
      win.document.write(`<!DOCTYPE html><html><head><title>PDF</title>
        <style>
          @page { size: A4; margin: 16mm; }
          body{ font-family: Arial, Helvetica, sans-serif; color:#1e2a36; }
          .a4{ width: 210mm; min-height: 297mm; }
        </style>
      </head><body>`)
      win.document.write(printContent.outerHTML)
      win.document.write('</body></html>')
      win.document.close()
      win.focus()
      win.print()
      win.close()
    }
  }
}
</script>

<style scoped>
.page-wrapper { padding: 10px; }
.no-print { margin-bottom: 12px; }
.btn {
  background: #0a7a00;
  color: #fff;
  border: none;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
}
.btn.secondary { background: #8f9aa3; margin-right: 10px; }
.toolbar { display: flex; align-items: center; }
.toolbar .spacer { flex: 1; }

.a4 {
  background: #fff;
  width: 794px; /* 210mm @ 96dpi approx */
  min-height: 1123px; /* 297mm */
  margin: 0 auto;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 18px;
}

.page-title{
  margin: 8px 0 12px;
  text-align: center;
  font-size: 22px;
  font-weight: 900;
  letter-spacing: 1px;
}

.header { display: flex; align-items: center; gap: 14px; margin-bottom: 10px; }
.logo { height: 36px; object-fit: contain; }
.company { font-size: 18px; font-weight: 700; letter-spacing: 0.4px; }

.banner {
  background: #efefef;
  border-radius: 6px;
  overflow: hidden;
  margin: 4px 0 16px;
}
.banner .ref { text-align: center; font-weight: 800; color: #9c7a00; font-size: 28px; padding: 10px 0; }
.banner .title { text-align: center; padding: 18px 0; }
.banner .title .line1, .banner .title .line2 { font-weight: 800; color: #1b2a60; }
.banner .title .line1 { font-size: 72px; line-height: 64px; }
.banner .title .line2 { font-size: 72px; line-height: 64px; }
.banner .client { background: #e9f3f8; text-align: center; padding: 12px 0; font-size: 26px; font-weight: 800; color: #6a7c86; }

.info-list { margin-top: 8px; display: grid; gap: 10px; }
.row { display: grid; grid-template-columns: 230px 1fr; align-items: center; gap: 8px; }
.label {
  background: #0f3460;
  color: #fff;
  padding: 10px 14px;
  border-radius: 6px;
  font-weight: 700;
  letter-spacing: 0.4px;
  font-size: 14px;
}
.value {
  background: #fff;
  border: 2px solid #e5e9f0;
  padding: 10px 12px;
  border-radius: 6px;
  font-size: 16px;
}

/* Impression */
@media print {
  .no-print { display: none !important; }
  .a4 { box-shadow: none; width: auto; min-height: auto; padding: 0; }
}
</style>


