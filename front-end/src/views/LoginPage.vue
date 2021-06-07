<template>
<div class="loginPageRoot">
    <div v-if="this.$root.$data.currentUser.user == null">
        <MainMenu />
        <hr>
        <LoginForm />
        <hr>
    </div>
    <div v-else>
    <MainMenu />
    <img class="homeSwissImage" src="../assets/images/swissMountain.jpg">
    <MainTourInfo />
    <JungfrauPackageList />
    <HotPlace />
    <Footer />
    </div>
    <Footer class="loginPageFooter" />
</div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import MainMenu from '../components/MainMenu'
import Footer from '../components/Footer'
import MainTourInfo from '../components/MainTourInfo'
import HotPlace from '../components/HotPlace'
import JungfrauPackageList from '../components/JungfrauPackageList'

export default {
    components: {
        LoginForm,
        MainMenu,
        Footer,
        MainTourInfo,
        HotPlace,
        JungfrauPackageList
    }
}
</script>

<style>

    .loginPageFooter{
       margin:0;
       margin-top:90px;
    }
</style>