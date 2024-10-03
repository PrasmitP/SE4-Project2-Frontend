<template>
  <div id="app">
    <h1>University Course Management</h1>

    <!-- Add Course Form -->
    <add-course @addCourse="addCourse" />

    <!-- Course List Table -->
    <course-list 
      :courses="courses" 
      @editCourse="editCourse" 
      @deleteCourse="deleteCourse" 
    />

    <!-- Update Course Form -->
    <update-course 
      v-if="editingCourse" 
      :course="editingCourse" 
      @updateCourse="updateCourse" 
      @cancelUpdate="cancelEditing" 
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
      {
        id: 1, 
        name: 'Introduction to Physics', 
        department: 'PHYS', 
        number: '0010', 
        level: 1, 
        hours: 3,
        description: 'Basic principles of physics'
      },
      {
        id: 2, 
        name: 'Calculus I', 
        department: 'MATH', 
        number: '0020', 
        level: 1, 
        hours: 4,
        description: 'Introduction to calculus concepts'
      }
    ]);

    const editingCourse = ref(null); // Track the course being edited

    const addCourse = (course) => {
      courses.value.push({ ...course, id: Date.now() });
    };

    const editCourse = (course) => {
      editingCourse.value = { ...course }; // Set the course for editing
    };

    const updateCourse = (updatedCourse) => {
      const index = courses.value.findIndex(c => c.id === updatedCourse.id);
      if (index !== -1) {
        courses.value[index] = updatedCourse;
      }
      editingCourse.value = null; // Clear editing state after update
    };

    const cancelEditing = () => {
      editingCourse.value = null; // Clear the course being edited
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
      cancelEditing,
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

h1 {
  text-align: center;
  margin-bottom: 2rem;
}
</style>