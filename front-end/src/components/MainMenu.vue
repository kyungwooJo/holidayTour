<template>
    <div class="navbarWithLogo">
    <img class="holidayLogo" src="../assets/images/Logo.png">
    <nav class="menuNavList">
      <router-link to='/'>Home</router-link>
      <router-link to='/QandA'>Q&A</router-link>
      <router-link to='/TourReviewList'>여행후기</router-link>
      <router-link to='/AnnouncementList'>공지사항</router-link>
    </nav>
    <div class="loginForm" v-if="user == null" >
        <router-link to ="/LoginPage">로그인 / 회원가입</router-link>
        </div>
        <div v-else>
          <h3>{{user.lastName}} {{user.firstName}} 회원님 반갑습니다 <router-link to="/"><button @click="logout" class="pure-button pure-button-primary logoutBtn">Logout</button></router-link></h3>
    </div>
    </div> 
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
       
    }
  },
 computed: {
    user() {
      return this.$root.$data.currentUser.user;
    },
  },

    async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.currentUser.user = response.data.user;
    } catch (error) {
      this.$root.$data.currentUser.user = null;
    }
  },

  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.currentUser.user = null;
      } catch (error) {
        this.$root.$data.currentUser.user = null;
      }
    },
  }
}
</script>

<style>

    .headerTop {
      display:flex;
      justify-content: space-between;
    }

    .headerTopLoggingPart{
      margin-top:45px;
    }
    
    .menuNavList {
        margin-top: 20px;
    }

    .menuNavList a{
        padding-right: 10px;
        padding-left: 10px;
        color: black;
        text-decoration: none;
        border-right:1px solid black;
    }

    .menuNavList a:hover{
      background-color:gray
    }

    img{
        width: 220px;
        margin-top: 35px;
    }

    #mainManuRootTag,
    .headerTop,
    .headerTopLoggingPart{
      margin-top:10px;
    }




</style>