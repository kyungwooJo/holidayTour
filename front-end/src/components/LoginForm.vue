<template>
<div class="hero">
  <div class="heroBox">
    <h1>대한 홀리데이 여행사</h1>
    <p><img src="../assets/images/decoration.png"></p>
    <form class="pure-form">
      <fieldset>
        <legend>회원가입</legend>
        <input placeholder="이름" v-model="firstName">
        <input placeholder="성" v-model="lastName">
      </fieldset>
      <fieldset>
        <input placeholder="아이디" v-model="username">
        <input type="password" placeholder="패스워드" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">가입하기</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <p><img src="../assets/images/decoration.png"></p>
    <form class="pure-form">
      <fieldset>
        <legend>로그인</legend>
        <input placeholder="아이디" v-model="usernameLogin">
        <input type="password" placeholder="패스워드" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">로그인</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },

  methods: {
        async register() {
        this.error = '';
        this.errorLogin = '';
        if (!this.firstName || !this.lastName || !this.username || !this.password)
            return;
        try {
            let response = await axios.post('/api/users', {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            password: this.password,
            });
            this.$root.$data.user = response.data.user;
        } catch (error) {
            this.error = error.response.data.message;
            this.$root.$data.user = null;
        }
    },
        async login() {
        this.error = '';
        this.errorLogin = '';
        if (!this.usernameLogin || !this.passwordLogin)
            return;
        try {
            let response = await axios.post('/api/users/login', {
            username: this.usernameLogin,
            password: this.passwordLogin,
            });
            this.$root.$data.currentUser.user = response.data.user;

        } catch (error) {
            this.errorLogin = "Error: " + error.response.data.message;
            this.$root.$data.currentUser.user = null;
        }
    }
  }
}
</script>

<style>
h1 {
  font-size: 28px;
  font-variant: capitalize;
}
.hero {
  padding: 30px;
  display: flex;
  justify-content: center;
}
.heroBox {
  background: white;
  opacity: 0.95;
  display: inline;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  border-radius: 30px;
}
.hero::after {
  content: "";
  background-image: url("/pagliacci.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
.hero img {
  height: 20px;
  margin: 0px;
}
.hero form {
  font-size: 14px;
}
.hero form legend {
  font-size: 20px;
}
input {
  margin-right: 10px;
}
.error {
  margin-top: 20px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>