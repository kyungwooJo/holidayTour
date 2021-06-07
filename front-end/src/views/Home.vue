<template>
  <div class="home">
    <MainMenu />
    <img class="homeSwissImage" src="../assets/images/swissMountain.jpg">
    <MainTourInfo />
    <JungfrauPackageList />
    <HotPlace />
    <Footer />
  </div>
</template>

<script>
import MainMenu from '../components/MainMenu'
import SearchForm from '../components/SearchForm'
import MainTourInfo from '../components/MainTourInfo'
import HotPlace from '../components/HotPlace'
import Footer from '../components/Footer'
import JungfrauPackageList from '../components/JungfrauPackageList'
export default {
  name: 'Home',
  components: {
    MainMenu,
    SearchForm,
    MainTourInfo,
    HotPlace,
    Footer,
    JungfrauPackageList,
  },
}
</script>

<style>
  .homeSwissImage{
    width:100%;
    height:380px;
  }

  .holidayLogo{
    margin: 10px 0 0 0 ;
  }

  .homeSwissImage{
    margin: 0;
  }

  .navbarWithLogo{
    display:flex;
    justify-content: space-between;
    align-items: center;
    font-size:18px;
  }

  .loginForm{
    margin-top:25px;
    margin-right:20px;
  }

</style>
