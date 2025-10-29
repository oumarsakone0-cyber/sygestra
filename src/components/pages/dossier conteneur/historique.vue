<template>
  <div class="historique-page">
    <br><br>
    <!-- Header card with red bottom bar -->
    <div class="header-card">
      <div class="import-header">
        <span class="section-title">
          <vs-icon icon="home" size="22" color="#c32d39" />
          <span class="title-dossiers">Administration</span>
          <span class="slash">/</span>
          <span class="title-sub">IMPORT</span>
          <span class="slash">/</span>
          <span class="title-sub">Liste des Ordres</span>
        </span>

        <!-- Action buttons -->
        <div class="action-buttons">
          <vs-button class="print-btn" icon="print" type="filled" color="#c32d39">
            Imprimer
          </vs-button>
          <vs-button class="create-btn" icon="add" type="filled" color="#c32d39" @click="showCreateModal = true">
            + Créer un ordre
          </vs-button>
        </div>
      </div>

      <!-- red bottom bar of the header card -->
      <div class="header-bottom-bar"></div>
    </div>

    <!-- Date filter section -->
    <div class="filter-section">
      <div class="date-search">
        <div class="date-box">
          <div class="block">
            <el-date-picker
              v-model="dateRange"
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
    </div>

    <!-- Table section -->
    <div class="table-container">
      <div class="table-wrapper">
        <table class="orders-table">
          <thead>
            <tr>
              <th class="checkbox-col">
                <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
              </th>
              <th>Date Réception</th>
              <th>N° Dossier</th>
              <th>Conteneur</th>
              <th>Types</th>
              <th>N° Déclaration</th>
              <th>BL</th>
              <th>Statut/Mode</th>
              <th>Armateur</th>
              <th>Client</th>
              <th>Camion</th>
              <th>Chauffeur</th>
              <th>Zone Livr</th>
              <th>Zone Fact</th>
              <th>BADT</th>
              <th>Sortie</th>
              <th>Récup</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(order, index) in paginatedOrders" 
              :key="index" 
              :class="['table-row', { 'selected-row': order.selected }]"
              @click="toggleRowSelection(order)"
            >
              <td class="checkbox-col">
                <div class="selection-indicator" :class="{ 'selected': order.selected }">
                  <i v-if="order.selected" class="material-icons">check</i>
                  <div v-else class="dot"></div>
                </div>
              </td>
              <td>{{ order.dateReception }}</td>
              <td class="dossier-number" :class="{ 'selected-dossier': order.selected }">{{ order.dossierNumber }}</td>
              <td class="container-number">{{ order.container }}</td>
              <td>{{ order.types }}</td>
              <td class="declaration-number">{{ order.declarationNumber }}</td>
              <td>{{ order.bl }}</td>
              <td class="status-mode">
                <span :class="getStatusClass(order.statusMode)">{{ order.statusMode }}</span>
              </td>
              <td>{{ order.armateur }}</td>
              <td>{{ order.client }}</td>
              <td>{{ order.camion }}</td>
              <td>{{ order.chauffeur }}</td>
              <td>{{ order.zoneLivr }}</td>
              <td>{{ order.zoneFact }}</td>
              <td>{{ order.badt }}</td>
              <td>{{ order.sortie }}</td>
              <td>{{ order.recup }}</td>
              <td class="actions-col">
                <button class="action-btn edit-btn" @click.stop="editOrder(order)" title="Modifier">
                  <i class="material-icons">edit</i>
                </button>
                <button class="action-btn delete-btn" @click.stop="deleteOrder(order)" title="Supprimer">
                  <i class="material-icons">delete</i>
                </button>
                <button 
                  v-if="order.showViewButton" 
                  class="action-btn view-btn" 
                  @click.stop="viewOrder(order)" 
                  title="Voir"
                >
                  <i class="material-icons">description</i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination">
        <button class="page-btn" @click="previousPage" :disabled="currentPage === 1">
          <i class="material-icons">chevron_left</i>
        </button>
        <span class="page-numbers">
          <button 
            v-for="page in visiblePages" 
            :key="page" 
            :class="['page-number', { active: page === currentPage }]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <span v-if="showEllipsis">...</span>
          <button 
            v-for="page in endPages" 
            :key="page" 
            :class="['page-number', { active: page === currentPage }]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </span>
        <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages">
          <i class="material-icons">chevron_right</i>
        </button>
      </div>
    </div>

    <!-- Create Order Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h4 class="modal-title">Nouvelle Ordre</h4>
          <button class="modal-close" @click="closeModal">
            <i class="material-icons">close</i>
          </button>
        </div>

        <div class="modal-content">
          <div class="form-grid">
            <!-- Row 1 -->
            <div class="form-group">
              <label>Date de Réception</label>
              <el-date-picker
                v-model="newOrder.dateReception"
                type="date"
                placeholder="jj/mm/aaaa"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Nº Conteneur</label>
              <input v-model="newOrder.containerNumber" placeholder="N° Conteneur" class="form-input" />
            </div>
            <div class="form-group">
              <label>Type TC</label>
              <select v-model="newOrder.typeTC" class="form-input">
                <option value="">Sélectionner</option>
                <option value="20">20</option>
                <option value="40">40</option>
              </select>
            </div>

            <!-- Row 2 -->
            <div class="form-group">
              <label>N° Déclaration</label>
              <input v-model="newOrder.declarationNumber" placeholder="N° Déclaration" class="form-input" />
            </div>
            <div class="form-group">
              <label>BL</label>
              <input v-model="newOrder.bl" placeholder="N° BL" class="form-input" />
            </div>
            <div class="form-group">
              <label>N DOSSIER</label>
              <input v-model="newOrder.dossierNumber" placeholder="N° BL" class="form-input" />
            </div>

            <!-- Row 3 -->
            <div class="form-group">
              <label>Armateur</label>
              <select v-model="newOrder.armateur" class="form-input">
                <option value="">Sélectionner</option>
                <option value="Medlog">Medlog</option>
                <option value="CMA CGM">CMA CGM</option>
                <option value="PIL">PIL</option>
                <option value="Maersk">Maersk</option>
                <option value="Arkas Sogena">Arkas Sogena</option>
                <option value="MSC">MSC</option>
                <option value="AGL">AGL</option>
                <option value="PROPRE MOYEN">PROPRE MOYEN</option>
              </select>
            </div>
            <div class="form-group">
              <label>Client</label>
              <input v-model="newOrder.client" placeholder="Nom client" class="form-input" />
            </div>
            <div class="form-group">
              <label>Contact Client</label>
              <input v-model="newOrder.clientContact" placeholder="Nom client" class="form-input" />
            </div>

            <!-- Row 4 -->
            <div class="form-group">
              <label>Zone de livraison</label>
              <select v-model="newOrder.deliveryZone" class="form-input">
                <option value="">Sélectionner</option>
                <option value="COCODY">COCODY</option>
                <option value="YOPOUGON">YOPOUGON</option>
                <option value="BINGERVILLE">BINGERVILLE</option>
              </select>
            </div>
            <div class="form-group">
              <label>Zone de facturation</label>
              <input v-model="newOrder.billingZone" placeholder="ZONE" class="form-input" />
            </div>
            <div class="form-group">
              <label>Mode</label>
              <select v-model="newOrder.mode" class="form-input">
                <option value="">Sélectionner</option>
                <option value="REM">REM</option>
                <option value="AC">AC</option>
              </select>
            </div>

            <!-- Row 5 -->
            <div class="form-group">
              <label>Camion</label>
              <select v-model="newOrder.camion" class="form-input">
                <option value="">Search and select</option>
                <option value="AA-891-AZCI01">AA-891-AZCI01</option>
                <option value="AA-510-CE">AA-510-CE</option>
              </select>
            </div>
            <div class="form-group">
              <label>Chauffeur</label>
              <select v-model="newOrder.chauffeur" class="form-input">
                <option value="">Search and select</option>
                <option value="DOSSO VAZOUMANA">DOSSO VAZOUMANA</option>
                <option value="TRAORE ABOUBACAR SIDIKI">TRAORE ABOUBACAR SIDIKI</option>
              </select>
            </div>

            <!-- Row 6 -->
            <div class="form-group">
              <label>BADT</label>
              <el-date-picker
                v-model="newOrder.badt"
                type="date"
                placeholder="jj/mm/aaaa"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>SORTIE</label>
              <el-date-picker
                v-model="newOrder.sortie"
                type="date"
                placeholder="jj/mm/aaaa"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label>Statut</label>
              <select v-model="newOrder.statut" class="form-input">
                <option value="">Sélectionner</option>
                <option value="CIRCUIT VERT/REM">CIRCUIT VERT/REM</option>
                <option value="VAD/REM">VAD/REM</option>
                <option value="VAD/AC">VAD/AC</option>
              </select>
            </div>

            <!-- Row 7 -->
            <div class="form-group">
              <label>Transitaire</label>
              <input v-model="newOrder.transitaire" placeholder="Transitaire" class="form-input" />
            </div>
            <div class="form-group observation-group">
              <label>Observation</label>
              <textarea 
                v-model="newOrder.observation" 
                placeholder="Observation" 
                class="form-input observation-textarea"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <vs-button @click="closeModal" type="flat" color="dark">
            Annuler
          </vs-button>
          <vs-button @click="saveOrder" type="filled" color="#007bff">
            Enregistrer l'ordre
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoriquePage",
  data() {
    return {
      showCreateModal: false,
      searchQuery: '',
      dateRange: null,
      dateStart: '',
      dateEnd: '',
      selectAll: false,
      currentPage: 1,
      itemsPerPage: 20,
      
      newOrder: {
        dateReception: '',
        containerNumber: '',
        typeTC: '',
        declarationNumber: '',
        bl: '',
        dossierNumber: '',
        armateur: '',
        client: '',
        clientContact: '',
        deliveryZone: '',
        billingZone: '',
        mode: '',
        camion: '',
        chauffeur: '',
        badt: '',
        sortie: '',
        statut: '',
        transitaire: '',
        observation: ''
      },

      orders: [
        {
          dateReception: '2024-12-26',
          dossierNumber: '12/24-PM 14',
          container: 'FCIU4905553',
          types: '20',
          declarationNumber: 'C72872',
          bl: 'COSU5403205400',
          statusMode: 'CIRCUIT VERT/REM',
          armateur: 'PROPRE MOYEN',
          client: 'ACTIVA TRADE',
          camion: 'AA-891-AZCI01',
          chauffeur: 'DOSSO VAZOUMANA',
          zoneLivr: 'COCODY',
          zoneFact: 'ZONE 2',
          badt: '2024-12-26',
          sortie: '2024-12-26',
          recup: '2024-12-22',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-12-20',
          dossierNumber: '12/24-MAE 45',
          container: 'MSKU0812550',
          types: '40',
          declarationNumber: 'C70934',
          bl: '246039074',
          statusMode: 'VAD/REM',
          armateur: 'Maersk',
          client: 'AFRICA IMPORT',
          camion: 'AA-510-CE',
          chauffeur: 'TRAORE ABOUBACAR SIDIKI',
          zoneLivr: 'YOPOUGON',
          zoneFact: 'ZONE 3',
          badt: '2024-12-28',
          sortie: '2024-12-19',
          recup: '2024-12-20',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-12-18',
          dossierNumber: '12/24-EVE 12',
          container: 'EVER1234567',
          types: '20',
          declarationNumber: 'C71234',
          bl: 'EVER567890',
          statusMode: 'CIRCUIT JAUNE/REM',
          armateur: 'EVERGREEN',
          client: 'MEDINEX',
          camion: 'AA-867-AP',
          chauffeur: 'KONE MAMADOU',
          zoneLivr: 'BINGERVILLE',
          zoneFact: 'HORS ZONE',
          badt: '2024-12-24',
          sortie: '2024-12-22',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-12-15',
          dossierNumber: '12/24-MSC 08',
          container: 'MSCU1234567',
          types: '40',
          declarationNumber: 'C71567',
          bl: 'MSC567890',
          statusMode: 'VAD/AC',
          armateur: 'MSC',
          client: 'GTSE',
          camion: 'AA-123-AB',
          chauffeur: 'DIABATE MAMADOU',
          zoneLivr: 'MARCORY',
          zoneFact: 'ZONE 1',
          badt: '2024-12-20',
          sortie: '2024-12-18',
          recup: '2024-12-16',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-12-12',
          dossierNumber: '12/24-AGL 15',
          container: 'AGLU9876543',
          types: '20',
          declarationNumber: 'C72000',
          bl: 'AGL123456',
          statusMode: 'CIRCUIT VERT/REM',
          armateur: 'AGL',
          client: 'SICMA',
          camion: 'AA-456-CD',
          chauffeur: 'TRAORE IBRAHIM',
          zoneLivr: 'TREICHVILLE',
          zoneFact: 'ZONE 2',
          badt: '2024-12-18',
          sortie: '2024-12-15',
          recup: '2024-12-13',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-12-10',
          dossierNumber: '12/24-PIL 22',
          container: 'PILU5555555',
          types: '40',
          declarationNumber: 'C72222',
          bl: 'PIL999999',
          statusMode: 'VAD/REM',
          armateur: 'PIL',
          client: 'SOUAD DISTRIBUTION',
          camion: 'AA-789-EF',
          chauffeur: 'KONE FATOUMATA',
          zoneLivr: 'ADJAME',
          zoneFact: 'ZONE 3',
          badt: '2024-12-16',
          sortie: '2024-12-12',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-12-08',
          dossierNumber: '12/24-MAE 33',
          container: 'MSKU9999999',
          types: '20',
          declarationNumber: 'C73000',
          bl: 'MAE123456',
          statusMode: 'CIRCUIT VERT/REM',
          armateur: 'Maersk',
          client: 'AGENA INDUSTRIE',
          camion: 'AA-111-GH',
          chauffeur: 'SANGARE AMINATA',
          zoneLivr: 'PORT-BOUET',
          zoneFact: 'ZONE 1',
          badt: '2024-12-14',
          sortie: '2024-12-10',
          recup: '2024-12-08',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-12-05',
          dossierNumber: '12/24-CMA 18',
          container: 'CMAU7777777',
          types: '40',
          declarationNumber: 'C74000',
          bl: 'CMA987654',
          statusMode: 'VAD/AC',
          armateur: 'CMA CGM',
          client: 'ACTIVA TRADE',
          camion: 'AA-222-IJ',
          chauffeur: 'OUATTARA MAMADOU',
          zoneLivr: 'ABOBO',
          zoneFact: 'ZONE 2',
          badt: '2024-12-12',
          sortie: '2024-12-08',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-12-03',
          dossierNumber: '12/24-ARK 09',
          container: 'ARKU3333333',
          types: '20',
          declarationNumber: 'C75000',
          bl: 'ARK555555',
          statusMode: 'CIRCUIT JAUNE/REM',
          armateur: 'Arkas Sogena',
          client: 'AFRICA IMPORT',
          camion: 'AA-333-KL',
          chauffeur: 'DIABATE FATOUMATA',
          zoneLivr: 'BASSAM',
          zoneFact: 'HORS ZONE',
          badt: '2024-12-10',
          sortie: '2024-12-06',
          recup: '2024-12-04',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-12-01',
          dossierNumber: '12/24-MED 05',
          container: 'MEDU4444444',
          types: '40',
          declarationNumber: 'C76000',
          bl: 'MED666666',
          statusMode: 'VAD/REM',
          armateur: 'Medlog',
          client: 'GTSE',
          camion: 'AA-444-MN',
          chauffeur: 'TRAORE AISSA',
          zoneLivr: 'COCODY',
          zoneFact: 'ZONE 3',
          badt: '2024-12-08',
          sortie: '2024-12-04',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-11-28',
          dossierNumber: '11/24-MSC 25',
          container: 'MSCU8888888',
          types: '20',
          declarationNumber: 'C77000',
          bl: 'MSC777777',
          statusMode: 'CIRCUIT VERT/REM',
          armateur: 'MSC',
          client: 'SICMA',
          camion: 'AA-555-OP',
          chauffeur: 'KONE IBRAHIM',
          zoneLivr: 'YOPOUGON',
          zoneFact: 'ZONE 1',
          badt: '2024-12-05',
          sortie: '2024-12-01',
          recup: '2024-11-29',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-11-25',
          dossierNumber: '11/24-AGL 12',
          container: 'AGLU2222222',
          types: '40',
          declarationNumber: 'C78000',
          bl: 'AGL888888',
          statusMode: 'VAD/AC',
          armateur: 'AGL',
          client: 'MEDINEX',
          camion: 'AA-666-QR',
          chauffeur: 'SANGARE MAMADOU',
          zoneLivr: 'MARCORY AVANT BLD',
          zoneFact: 'ZONE 2',
          badt: '2024-12-02',
          sortie: '2024-11-28',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-11-22',
          dossierNumber: '11/24-PIL 19',
          container: 'PILU1111111',
          types: '20',
          declarationNumber: 'C79000',
          bl: 'PIL999999',
          statusMode: 'CIRCUIT JAUNE/REM',
          armateur: 'PIL',
          client: 'SOUAD DISTRIBUTION',
          camion: 'AA-777-ST',
          chauffeur: 'DIABATE AISSA',
          zoneLivr: 'BINGERVILLE',
          zoneFact: 'HORS ZONE',
          badt: '2024-11-29',
          sortie: '2024-11-25',
          recup: '2024-11-23',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-11-20',
          dossierNumber: '11/24-MAE 41',
          container: 'MSKU5555555',
          types: '40',
          declarationNumber: 'C80000',
          bl: 'MAE111111',
          statusMode: 'VAD/REM',
          armateur: 'Maersk',
          client: 'ACTIVA TRADE',
          camion: 'AA-888-UV',
          chauffeur: 'TRAORE FATOUMATA',
          zoneLivr: 'TREICHVILLE',
          zoneFact: 'ZONE 3',
          badt: '2024-11-26',
          sortie: '2024-11-22',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-11-18',
          dossierNumber: '11/24-CMA 27',
          container: 'CMAU6666666',
          types: '20',
          declarationNumber: 'C81000',
          bl: 'CMA222222',
          statusMode: 'CIRCUIT VERT/REM',
          armateur: 'CMA CGM',
          client: 'AFRICA IMPORT',
          camion: 'AA-999-WX',
          chauffeur: 'KONE MAMADOU',
          zoneLivr: 'ADJAME',
          zoneFact: 'ZONE 1',
          badt: '2024-11-24',
          sortie: '2024-11-20',
          recup: '2024-11-19',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-11-15',
          dossierNumber: '11/24-EVE 14',
          container: 'EVER4444444',
          types: '40',
          declarationNumber: 'C82000',
          bl: 'EVER333333',
          statusMode: 'VAD/AC',
          armateur: 'EVERGREEN',
          client: 'GTSE',
          camion: 'AA-000-YZ',
          chauffeur: 'SANGARE IBRAHIM',
          zoneLivr: 'PORT-BOUET',
          zoneFact: 'ZONE 2',
          badt: '2024-11-21',
          sortie: '2024-11-17',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-11-12',
          dossierNumber: '11/24-ARK 16',
          container: 'ARKU7777777',
          types: '20',
          declarationNumber: 'C83000',
          bl: 'ARK444444',
          statusMode: 'CIRCUIT JAUNE/REM',
          armateur: 'Arkas Sogena',
          client: 'SICMA',
          camion: 'AA-111-AB',
          chauffeur: 'DIABATE MAMADOU',
          zoneLivr: 'BASSAM',
          zoneFact: 'HORS ZONE',
          badt: '2024-11-18',
          sortie: '2024-11-14',
          recup: '2024-11-13',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-11-10',
          dossierNumber: '11/24-MED 08',
          container: 'MEDU8888888',
          types: '40',
          declarationNumber: 'C84000',
          bl: 'MED555555',
          statusMode: 'VAD/REM',
          armateur: 'Medlog',
          client: 'MEDINEX',
          camion: 'AA-222-CD',
          chauffeur: 'TRAORE AISSA',
          zoneLivr: 'COCODY',
          zoneFact: 'ZONE 3',
          badt: '2024-11-16',
          sortie: '2024-11-12',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-11-08',
          dossierNumber: '11/24-MSC 31',
          container: 'MSCU9999999',
          types: '20',
          declarationNumber: 'C85000',
          bl: 'MSC666666',
          statusMode: 'CIRCUIT VERT/REM',
          armateur: 'MSC',
          client: 'SOUAD DISTRIBUTION',
          camion: 'AA-333-EF',
          chauffeur: 'KONE FATOUMATA',
          zoneLivr: 'YOPOUGON',
          zoneFact: 'ZONE 1',
          badt: '2024-11-14',
          sortie: '2024-11-10',
          recup: '2024-11-09',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-11-05',
          dossierNumber: '11/24-AGL 23',
          container: 'AGLU0000000',
          types: '40',
          declarationNumber: 'C86000',
          bl: 'AGL777777',
          statusMode: 'VAD/AC',
          armateur: 'AGL',
          client: 'ACTIVA TRADE',
          camion: 'AA-444-GH',
          chauffeur: 'SANGARE MAMADOU',
          zoneLivr: 'MARCORY AVANT BLD',
          zoneFact: 'ZONE 2',
          badt: '2024-11-11',
          sortie: '2024-11-07',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-11-02',
          dossierNumber: '11/24-PIL 26',
          container: 'PILU1234567',
          types: '20',
          declarationNumber: 'C87000',
          bl: 'PIL888888',
          statusMode: 'CIRCUIT JAUNE/REM',
          armateur: 'PIL',
          client: 'AFRICA IMPORT',
          camion: 'AA-555-IJ',
          chauffeur: 'DIABATE IBRAHIM',
          zoneLivr: 'BINGERVILLE',
          zoneFact: 'HORS ZONE',
          badt: '2024-11-08',
          sortie: '2024-11-04',
          recup: '2024-11-03',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-10-30',
          dossierNumber: '10/24-MAE 35',
          container: 'MSKU2345678',
          types: '40',
          declarationNumber: 'C88000',
          bl: 'MAE999999',
          statusMode: 'VAD/REM',
          armateur: 'Maersk',
          client: 'GTSE',
          camion: 'AA-666-KL',
          chauffeur: 'TRAORE FATOUMATA',
          zoneLivr: 'TREICHVILLE',
          zoneFact: 'ZONE 3',
          badt: '2024-11-05',
          sortie: '2024-11-01',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-10-27',
          dossierNumber: '10/24-CMA 20',
          container: 'CMAU3456789',
          types: '20',
          declarationNumber: 'C89000',
          bl: 'CMA000000',
          statusMode: 'CIRCUIT VERT/REM',
          armateur: 'CMA CGM',
          client: 'SICMA',
          camion: 'AA-777-MN',
          chauffeur: 'KONE MAMADOU',
          zoneLivr: 'ADJAME',
          zoneFact: 'ZONE 1',
          badt: '2024-11-02',
          sortie: '2024-10-29',
          recup: '2024-10-28',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-10-25',
          dossierNumber: '10/24-EVE 18',
          container: 'EVER4567890',
          types: '40',
          declarationNumber: 'C90000',
          bl: 'EVER111111',
          statusMode: 'VAD/AC',
          armateur: 'EVERGREEN',
          client: 'MEDINEX',
          camion: 'AA-888-OP',
          chauffeur: 'SANGARE AISSA',
          zoneLivr: 'PORT-BOUET',
          zoneFact: 'ZONE 2',
          badt: '2024-10-31',
          sortie: '2024-10-27',
          recup: '',
          selected: false,
          showViewButton: false
        },
        {
          dateReception: '2024-10-22',
          dossierNumber: '10/24-ARK 13',
          container: 'ARKU5678901',
          types: '20',
          declarationNumber: 'C91000',
          bl: 'ARK222222',
          statusMode: 'CIRCUIT JAUNE/REM',
          armateur: 'Arkas Sogena',
          client: 'SOUAD DISTRIBUTION',
          camion: 'AA-999-QR',
          chauffeur: 'DIABATE FATOUMATA',
          zoneLivr: 'BASSAM',
          zoneFact: 'HORS ZONE',
          badt: '2024-10-28',
          sortie: '2024-10-24',
          recup: '2024-10-23',
          selected: false,
          showViewButton: true
        },
        {
          dateReception: '2024-10-20',
          dossierNumber: '10/24-MED 11',
          container: 'MEDU6789012',
          types: '40',
          declarationNumber: 'C92000',
          bl: 'MED333333',
          statusMode: 'VAD/REM',
          armateur: 'Medlog',
          client: 'ACTIVA TRADE',
          camion: 'AA-000-ST',
          chauffeur: 'TRAORE IBRAHIM',
          zoneLivr: 'COCODY',
          zoneFact: 'ZONE 3',
          badt: '2024-10-26',
          sortie: '2024-10-22',
          recup: '',
          selected: false,
          showViewButton: false
        }
      ]
    }
  },
  computed: {
    filteredOrders() {
      let filtered = this.orders;
      
      // Filter by search query
      if (this.searchQuery) {
        filtered = filtered.filter(order => 
          Object.values(order).some(value => 
            String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        );
      }
      
      // Filter by date range
      if (this.dateStart && this.dateEnd) {
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.dateReception);
          const startDate = new Date(this.dateStart);
          const endDate = new Date(this.dateEnd);
          
          return orderDate >= startDate && orderDate <= endDate;
        });
      }
      
      return filtered;
    },
    paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredOrders.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.itemsPerPage);
    },
    visiblePages() {
      const pages = [];
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, start + 4);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
    endPages() {
      if (this.currentPage < this.totalPages - 4) {
        return [this.totalPages - 1, this.totalPages];
      }
      return [];
    },
    showEllipsis() {
      return this.currentPage < this.totalPages - 4;
    }
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
      // Filter logic based on date range
      console.log('Filter dates', this.dateStart, this.dateEnd);
      // The filtering will be handled by the computed property filteredOrders
      // which already uses dateStart and dateEnd
    },
    toggleSelectAll() {
      this.orders.forEach(order => {
        order.selected = this.selectAll;
      });
    },
    toggleRowSelection(order) {
      order.selected = !order.selected;
      // Update selectAll checkbox state
      this.selectAll = this.orders.every(order => order.selected);
    },
    getStatusClass(status) {
      if (status.includes('VERT')) return 'status-vert';
      if (status.includes('JAUNE')) return 'status-jaune';
      return 'status-default';
    },
    editOrder(order) {
      console.log('Edit order', order);
    },
    deleteOrder(order) {
      console.log('Delete order', order);
    },
    viewOrder(order) {
      console.log('View order', order);
    },
    closeModal() {
      this.showCreateModal = false;
    },
    saveOrder() {
      console.log('Save order', this.newOrder);
      this.showCreateModal = false;
      // Reset form
      this.newOrder = {
        dateReception: '',
        containerNumber: '',
        typeTC: '',
        declarationNumber: '',
        bl: '',
        dossierNumber: '',
        armateur: '',
        client: '',
        clientContact: '',
        deliveryZone: '',
        billingZone: '',
        mode: '',
        camion: '',
        chauffeur: '',
        badt: '',
        sortie: '',
        statut: '',
        transitaire: '',
        observation: ''
      };
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    }
  }
};
</script>

<style scoped>
/* Layout global */
.historique-page {
  padding: 0;
  margin: -18px;
  box-sizing: border-box;
  background: #f5f5f5;
  min-height: 100vh;
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
  justify-content: space-between;
  width: 100%;
  z-index: 2;
}

/* Title */
.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  white-space: nowrap;
}
.title-dossiers { color: #c32d39; }
.title-sub { color: #222; }
.slash { margin: 0 6px; color: rgba(0,0,0,0.45); }

/* Filter section */
.filter-section {
  background: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

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
  border: 1px solid #e0e0e0;
}
.block { display: flex; align-items: center; gap: 10px; height: auto; }

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
  transition: all 0.2s ease;
}
.search-circle:hover {
  background: #f5f5f5;
  border-color: #c32d39;
}
.search-circle .material-icons { font-size: 20px; color: #666; }

/* Action buttons */
.action-buttons {
  display: flex;
  gap: 10px;
}
.print-btn, .create-btn {
  padding: 8px 16px;
  font-weight: 600;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

/* Main content */
.main-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
}

/* Stats section */
.stats-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.stats-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.container-count {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.excel-btn {
  padding: 6px 12px;
  font-size: 14px;
}

.search-section {
  display: flex;
  align-items: center;
  gap: 20px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 12px;
  gap: 8px;
  min-width: 200px;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  flex: 1;
  font-size: 14px;
}

/* Date filter section */
.date-filter-section {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.date-box {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.el-range-picker {
  width: 300px;
  background: transparent;
}

.el-range-picker .el-input__inner {
  border: none;
  padding: 6px 8px;
  font-size: 14px;
  background: transparent;
  box-shadow: none;
}

.search-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.search-circle:hover {
  background: #f8f9fa;
}

.search-circle .material-icons {
  font-size: 16px;
  color: #666;
}

/* Table container */
.table-container {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(60,60,60,0.06);
}

.table-wrapper {
  overflow-x: auto;
  max-height: 600px;
  overflow-y: auto;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.orders-table th {
  background: #f8f9fa;
  padding: 12px 8px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #dee2e6;
  white-space: nowrap;
  position: sticky;
  top: 0;
  z-index: 10;
}

.orders-table td {
  padding: 10px 8px;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
}

.table-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: #f0f8ff !important;
}

.table-row.selected-row {
  background: #e3f2fd !important;
}

.table-row.selected-row:hover {
  background: #bbdefb !important;
}

.checkbox-col {
  width: 40px;
  text-align: center;
}

.selection-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4caf50;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: all 0.2s ease;
}

.selection-indicator .material-icons {
  color: white;
  font-size: 14px;
}

.selection-indicator .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: white;
}

.selection-indicator.selected {
  background: #4caf50;
}

.dossier-number.selected-dossier {
  background: #bbdefb !important;
  border-radius: 4px;
  padding: 2px 4px;
}

.dossier-number {
  color: #007bff;
  font-weight: 500;
}

.container-number {
  color: #007bff;
  font-weight: 500;
}

.declaration-number {
  color: #dc3545;
  font-weight: 500;
}

.status-mode .status-vert {
  color: #28a745;
  font-weight: 500;
}

.status-mode .status-jaune {
  color: #ffc107;
  font-weight: 500;
}

.status-mode .status-default {
  color: #6c757d;
  font-weight: 500;
}

.actions-col {
  width: 120px;
  text-align: center;
}

.action-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  margin: 0 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.edit-btn {
  background: #007bff;
  color: white;
}

.edit-btn:hover {
  background: #0056b3;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
}

.view-btn {
  background: #ffc107;
  color: #333;
}

.view-btn:hover {
  background: #e0a800;
}

.action-btn .material-icons {
  font-size: 16px;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: #f8f9fa;
  border-top: 1px solid #dee2e6;
}

.page-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled) {
  background: #f8f9fa;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-number {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
}

.page-number:hover {
  background: #f8f9fa;
}

.page-number.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}


/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #eee;
}

.modal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.modal-close:hover {
  background: #f5f5f5;
}

.modal-content {
  padding: 24px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group.observation-group {
  grid-column: span 2;
}

.form-group label {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.form-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
}

.observation-textarea {
  resize: vertical;
  min-height: 80px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px 24px;
  border-top: 1px solid #eee;
  background: #f8f9fa;
}

/* Responsive */
@media (max-width: 768px) {
  .import-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .action-buttons {
    width: 100%;
    justify-content: flex-end;
  }
  
  .stats-section {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .search-section {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .form-group.observation-group {
    grid-column: span 1;
  }
  
  .modal-container {
    width: 95%;
    margin: 20px;
  }
  
  .modal-content {
    padding: 16px;
  }
  
  .modal-header {
    padding: 16px;
  }
  
  .modal-footer {
    padding: 16px;
  }
  
  .table-wrapper {
    font-size: 12px;
  }
  
  .orders-table th,
  .orders-table td {
    padding: 8px 4px;
  }
}
</style>
