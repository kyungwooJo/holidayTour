<template>
<div>
  <div v-if="completeView == 'tourReview'">
      <h2>해당 후기 계시물 수정을 완료하였습니다</h2>
      <router-link to="/TourReviewList">계시물 리스트로 이동</router-link>
  </div>
  <div v-if="completeView == 'question'">
      <h2>해당 Q&A 계시물 수정을 완료하였습니다</h2>
      <router-link to="/QandA">계시물 리스트로 이동</router-link>
  </div>
  <div v-if="completeView == 'announcement'">
      <h2>해당 공지사항 계시물 수정을 완료하였습니다</h2>
      <router-link to="/AnnouncementList">계시물 리스트로 이동</router-link>
  </div>
</div>
</template>

<script>
export default {
    props: {
        completeView: String 
    }
}
</script>

<style>

</style>