<template>
  <div>
    <h2>Course List</h2>
    <update-course v-if="selectedCourse" :course="selectedCourse" @cancel="closeUpdate" />
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
        <tr v-for="course in courses" :key="course.idcourse">
          <td>{{ course.name }}</td>
          <td>{{ course.department }}</td>
          <td>{{ course.courseNumber }}</td>
          <td>{{ course.level }}</td>
          <td>{{ course.hours }}</td>
          <td>{{ course.description }}</td>
          <td>
            <button @click="showUpdate(course)">Edit</button>
            <button @click="deleteCourse(course.idcourse)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CourseServices from "../services/CourseServices";
import UpdateCourse from "../components/UpdateCourse.vue"

export default {
  components: {
    UpdateCourse
  },
  data() {
    return {
      selectedCourse: null,
      courses: []
    };
  },
  methods: {
    showUpdate(course) {
      this.selectedCourse = course;
    },
    closeUpdate() {
      this.selectedCourse = null;
    },
    deleteCourse(courseId) {
      CourseServices.delete(courseId)
        .then((response) => {
          this.fetchCourses();
        })
        .catch((e) => {
          console.log(e);
        });

    },
    fetchCourses() {
      CourseServices.getAll()
        .then((response) => {
          this.courses = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.fetchCourses();
  }
};
</script>
