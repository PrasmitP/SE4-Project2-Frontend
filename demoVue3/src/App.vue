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
      @cancelUpdate="cancelEditing"/> <!-- Listen for cancelUpdate -->
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
    // Define the list of courses
    const courses = ref([
      { 
        id: 1, 
        name: 'Math 101', 
        department: 'MATH', 
        number: 101,       // Represents a course number within the year
        level: 1,          // First year (freshman)
        hours: 3 
      },
      { 
        id: 2, 
        name: 'Physics 202', 
        department: 'PHYS', 
        number: 202,       // Course number
        level: 2,          // Second year (sophomore)
        hours: 4 
      }
    ]);

    const editingCourse = ref(null); // Tracks the course being edited

    // Method to add a course
    const addCourse = (course) => {
      courses.value.push({ ...course, id: Date.now() });
    };

    // Method to edit a course (populate form for editing)
    const editCourse = (course) => {
      editingCourse.value = { ...course };
    };

    // Method to update the course
    const updateCourse = (updatedCourse) => {
      const index = courses.value.findIndex(c => c.id === updatedCourse.id);
      if (index !== -1) {
        courses.value[index] = updatedCourse;
      }
      editingCourse.value = null; // Clear editing state after updating
    };

    const cancelEditing = () => {
      editingCourse.value = null; // Simply clear the course being edited
    };

    // Method to delete a course
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
body {
  font-family: Arial, sans-serif;
}

#app {
  margin: 0 auto;
}

h1 {
  text-align: center;
}
</style>