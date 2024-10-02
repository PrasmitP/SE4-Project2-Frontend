<template>
  <div id="app">
    <router-link to="Add">Add Course</router-link>
    <br>
    <router-link to="View">View Courses</router-link>
    <br>
    <router-link to="Update">Update Course</router-link>
    <router-view/>

    <h1>University Course Management</h1>

    <add-course @addCourse="addCourse" />

    <course-list 
      :courses="courses" 
      @editCourse="editCourse" 
      @deleteCourse="deleteCourse" 
    />

    <update-course 
      v-if="editingCourse" 
      :course="editingCourse" 
      @updateCourse="updateCourse" 
    />

    
  </div>
</template>

<script>
import { ref } from 'vue';
import AddCourse from './components/AddCourse.vue';
import CourseList from './components/CourseList.vue';
import UpdateCourse from './components/UpdateCourse.vue';

export default {
  components: {
    AddCourse,
    CourseList,
    UpdateCourse
  },
  setup() {
    const courses = ref([
      { id: 1, name: 'Math 101', description: 'Basic Mathematics' },
      { id: 2, name: 'History 201', description: 'World History' }
    ]);
    const editingCourse = ref(null);

    const addCourse = (course) => {
      courses.value.push({ ...course, id: Date.now() });
    };

    const editCourse = (course) => {
      editingCourse.value = course;
    };

    const updateCourse = (updatedCourse) => {
      const index = courses.value.findIndex(c => c.id === updatedCourse.id);
      if (index !== -1) {
        courses.value[index] = updatedCourse;
      }
      editingCourse.value = null;
    };

    const deleteCourse = (id) => {
      courses.value = courses.value.filter(course => course.id !== id);
    };

    return {
      courses,
      editingCourse,
      addCourse,
      editCourse,
      updateCourse,
      deleteCourse
    };
  }
};
</script>

<style>
/* Basic styling */
body {
  font-family: Arial, sans-serif;
}

#app {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}
</style>