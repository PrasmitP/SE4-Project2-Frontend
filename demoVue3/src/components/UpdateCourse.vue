<template>
  <div @click.self="cancelForm()" class="form-container">
    <form @submit.prevent="updateCourse" class="course-form">
      <h2>Edit Course: {{ course.name }}</h2>
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
      <div class="form-group">
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
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showForm: true,
      idcourse: this.course.idcourse
    };
  },
  methods: {
    cancelForm(){
      this.$emit('cancel');
    },
    updateCourse() {
      const courseData = {
        idcourse: this.course.idcourse,
        name: this.course.name,
        department: this.course.department,
        courseNumber: this.course.courseNumber,
        level: this.course.level,
        hours: this.course.hours,
        description: this.course.description,
      };
      console.log(this.idcourse, courseData)
      CourseServices.update(this.idcourse, courseData)
        .then((response) => {
          console.log("update " + response.data);
        })
        .catch((e) => {
          console.log(e);
        });
      this.cancelForm();
    }
  }
};
</script>