<!-- components/sidebar/Sidebar.vue -->
<template>
  <div class="sidebar-content">
    <h3>Menu latéral</h3>
    <ul>
      <li><a href="#">Lien 1</a></li>
      <li><a href="#">Lien 2</a></li>
      <li><a href="#">Lien 3</a></li>
    </ul>
    <button @click="$emit('close')">Fermer</button>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  emits: ['close'] // Permet d’émettre un événement pour fermer la sidebar
}
</script>

<style scoped>
.sidebar-content {
  width: 100%;
}
.sidebar-content h3 {
  margin-top: 0;
}
.sidebar-content ul {
  list-style: none;
  padding: 0;
}
.sidebar-content li {
  margin-bottom: 10px;
}
.sidebar-content a {
  color: #333;
  text-decoration: none;
}
.sidebar-content button {
  margin-top: 20px;
  padding: 8px 12px;
  background: #b81f2d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
