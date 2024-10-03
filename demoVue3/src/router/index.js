import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CourseList from '@/components/CourseList.vue'
import UpdateCourse from '@/components/UpdateCourse.vue'
import AddCourse from '@/components/AddCourse.vue'
import EditCourse from '../components/EditCourse.vue'
import about from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: about
    },
    {
      path: '/CourseList',
      name: 'CourseList',
      component: CourseList
    },
    {
      path: '/UpdateCourse',
      name: 'UpdateCourse',
      component: UpdateCourse
    },
    {
      path: '/AddCourse',
      name: 'AddCourse',
      component: AddCourse
    },
    {
      path: '/EditCourse',
      name: 'EditCourse',
      component: EditCourse
    }
  ]
})

export default router
