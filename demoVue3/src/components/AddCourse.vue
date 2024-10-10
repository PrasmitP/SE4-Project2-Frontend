<template>
  <button id="AddButton" @click="toggleForm()">Add Course</button>
  <div v-if="showForm" @click.self="cancelForm()" class="form-container">
    <form @submit.prevent="submitCourse" class="course-form">
      <h2>Add Course</h2>
      <div class="form-group">
        <label for="name">Course Name:</label>
        <input v-model="course.name" type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="department">Department:</label>
        <input v-model="course.department" type="text" id="department" required maxlength="4" />
      </div>
      <div class="form-group">
        <label for="number">Course Number:</label>
        <input v-model="course.courseNumber" type="text" id="number" required maxlength="9" />
      </div>
      <div class="form-group">--
        <label for="level">Course Level:</label>
        <input v-model="course.level" type="number" id="level" required min="0" max="9" />
      </div>
      <div class="form-group">
        <label for="hours">Credit Hours:</label>
        <input v-model="course.hours" type="number" id="hours" required min="0" max="9" />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input v-model="course.description" type="text" id="description" />
      </div>
      <div class="form-actions">
        <button type="submit">Confirm</button>
        <button type="button" @click="cancelForm">Cancel</button>
      </div>
    </form>
  </div>
</template>


<script>
import CourseServices from "../services/CourseServices";

export default {
  data() {
    return {
      showForm: false,
      course: {
        name: '',
        department: '',
        courseNumber: '',
        level: null,
        hours: null,
        description: ''
      }
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    cancelForm() {
      this.showForm = false;
      this.resetCourse();
    },
    resetCourse() {
      this.course = {
        name: '',
        department: '',
        number: '',
        level: null,
        hours: null,
        description: ''
      };
    },
    submitCourse() {
      const courseData = {
        name: this.course.name,
        department: this.course.department,
        courseNumber: this.course.courseNumber,
        level: this.course.level,
        hours: this.course.hours,
        description: this.course.description,
      };
      console.log(courseData)
      CourseServices.create(courseData)
        .then((response) => {
          console.log("add " + response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.showForm = false;
      this.resetCourse();
    }
  }
};
</script>