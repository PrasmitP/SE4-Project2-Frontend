<template>
  <div id="app">
    <h1>University Course Management</h1>
    <!-- Add Course Form -->
    <add-course/>

    <!-- Course List Table -->
    <course-list/>

  </div>
</template>

<script>
import AddCourse from './components/AddCourse.vue';
import CourseList from './components/CourseList.vue';

export default {
  components: {
    AddCourse,
    CourseList,
  },
};
</script>