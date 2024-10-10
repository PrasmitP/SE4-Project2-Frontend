<template>
  <div>
    <h2>Course List</h2>
    <table>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Department</th>
          <th>Course Number</th>
          <th>Level</th>
          <th>Hours</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in paginatedCourses" :key="course.id">
          <td>{{ course.name }}</td>
          <td>{{ course.department }}</td>
          <td>{{ course.number }}</td>
          <td>{{ course.level }}</td>
          <td>{{ course.hours }}</td>
          <td>{{ course.description }}</td>
          <td>
            <button @click="$emit('editCourse', course)">Edit</button>
            <button @click="$emit('deleteCourse', course.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination controls -->
    <div class="pagination-controls">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courses: Array
  },
  data() {
    return {
      currentPage: 1,
      coursesPerPage: 5 // Number of courses to display per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.courses.length / this.coursesPerPage);
    },
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.coursesPerPage;
      const end = start + this.coursesPerPage;
      return this.courses.slice(start, end);
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
};
</script>

<style>
.pagination-controls {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
