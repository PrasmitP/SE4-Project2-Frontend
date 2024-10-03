import { createRouter, createWebHistory } from 'vue-router'
import CourseList from '@/components/CourseList.vue'
import UpdateCourse from '@/components/UpdateCourse.vue'
import AddCourse from '@/components/AddCourse.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    }
  ]
})

export default router
