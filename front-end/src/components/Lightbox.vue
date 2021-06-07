<template>
<div>
  <div class="packageDetailMainImage">
  <img v-if="packageInfo != null"  @click="showMultiple" :src="packageInfo.pathForList" alt="">
  </div>
  <div>
    <!-- all props & events -->
    <vue-easy-lightbox
      scrollDisabled
      escDisabled
      moveDisabled
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="handleHide"
    ></vue-easy-lightbox>
  </div>
</div>
</template>

<script>
  // If VueApp is already registered with VueEasyLightbox, there is no need to register it here.
import VueEasyLightbox from 'vue-easy-lightbox'
import axios from 'axios'

  export default {

    components: {
      VueEasyLightbox
    },

    props: {
        id: String
    },

    data() {
      return {
        imgs:null,
        visible: false,
        packageInfo: null,
        index: 0 // default: 0
      }
    },

    created() {
        this.getInfo()
    },

    methods: {

      async getInfo() {
          try{
            let response = await axios.get('/api/jungfrauPackage/' + this.$route.params.id)
            this.packageInfo = response.data
            this.imgs = this.packageInfo.pathForDetail
            console.log(this.imgs)
          }catch(error){
              console.log(error)
          }
      },

      showMultiple() {
        this.index = 1 // index of imgList
        this.show()
      },
      show() {
        this.visible = true
      },
      handleHide() {
        this.visible = false
      }
    }
  }
</script>

<style scoped>
 .daysImages {
     display: flex;
     flex-wrap: wrap;
 }

 .daysImages img{
     width:300px;
     margin:10px 10px
 }
 
 .packageDetailMainImage{
     display: flex;
     justify-content: center;
 }

 .packageDetailMainImage img{
     width:50%;
     height: 300px;
     transition: all 0.2s;
 }

 .packageDetailMainImage img:hover {
     transform: scale(1.1)
 }

 vue-easy-lightbox img{
     width:500px;
 }
</style>