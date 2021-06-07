import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import QandA from '../views/QandA.vue'
import QuestionForm from '../views/QuestionForm.vue'
import QuestionDetail from '../views/QuestionDetail.vue'
import TourReview from '../views/TourReview.vue'
import TourReviewList from '../views/TourReviewList'
import TourReveiwDetail from '../views/TourReviewDetail'
import LoginPage from '../views/LoginPage'
import AdminJungfrauInfoEdit from '../views/AdminJungfrauInfoEdit'
import JungfrauPackageDetail from '../views/JungfrauPackageDetail'
import AddNewJungfrauList from '../views/AddNewJungfrauList'
import AnnouncementList from '../views/AnnouncementList'
import AddNewAnnouncement from '../views/AddNewAnnouncement'
import AnnouncementDetail from '../views/AnnouncementDetail'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/QandA',
    name: 'QandA',
    component: QandA
  },
  {
    path: '/QuestionForm',
    name: 'QuestionForm',
    component: QuestionForm
  },
  {
    path: '/QuestionDetail/:id',
    name: 'QuestionDetail',
    component: QuestionDetail
  },
  {
    path: '/TourReview',
    name: 'TourReview',
    component: TourReview
  },
  {
    path: '/TourReviewList',
    name: 'TourReviewList',
    component: TourReviewList
  },
  {
    path: '/TourReviewDetail',
    name: 'TourReviewDetail',
    component: TourReveiwDetail
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/AdminJungfrauInfoEdit',
    name: 'AdminJungfrauInfoEdit',
    component: AdminJungfrauInfoEdit
  },
  {
    path: '/JungfrauPackageDetail',
    name: 'JungfrauPackageDetail',
    component: JungfrauPackageDetail
  },
  {
    path: '/AddNewJungfrauList',
    name: 'AddNewJungfrauList',
    component: AddNewJungfrauList
  },
  {
    path: '/AnnouncementList',
    name: 'AnnouncementList',
    component: AnnouncementList
  },
  {
    path: '/AddNewAnnouncement',
    name: 'AddNewAnnouncement',
    component: AddNewAnnouncement
  },
  {
    path: '/AnnouncementDetail',
    name: 'AnnouncementDetail',
    component: AnnouncementDetail
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
