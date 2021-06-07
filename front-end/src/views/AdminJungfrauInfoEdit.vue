<template>
  <div v-if="user !== null && user.role=='admin'">
      <AdminEditJungfrauInfo />
  </div>
  <div v-else>
      <h2>이 페이지를 읽을 권한이 없습니다</h2>
  </div>
</template>

<script>
import axios from 'axios';
import AdminEditJungfrauInfo from '../components/AdminEditJungfrauInfo'

export default {

    components: {
        AdminEditJungfrauInfo
    },

    computed: {
        user() {
            return this.$root.$data.currentUser.user
        }
    }
}
</script>

<style>

</style>