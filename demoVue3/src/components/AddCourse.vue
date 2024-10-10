<template>
  <button v-if="!showForm" @click="toggleForm">Add Course</button>
  <div v-if="showForm" class="overlay">
    <div class="model">
      <form v-if="showForm" @submit.prevent="submitCourse">
        <div>
          <label for="name">Course Name: </label>
          <input class="textInput" v-model="course.name" type="text" id="name" required />
        </div>
        <div>
          <label for="department">Department: </label>
          <input class="textInput" v-model="course.department" type="text" id="department" required maxlength="4" />
        </div>
        <div>
          <label for="number">Course Number: </label>
          <input class="textInput" v-model="course.courseNumber" type="text" id="number" required maxlength="4" />
        </div>
        <div>
          <label for="level">Course Level: </label>
          <input class="textInput" v-model="course.level" type="number" id="level" required min="1" max="4" />
        </div>
        <div>
          <label for="hours">Credit Hours: </label>
          <input class="textInput" v-model="course.hours" type="number" id="hours" required min="1" />
        </div>
        <div>
          <label for="description">Description: </label>
          <textarea class="descInput" v-model="course.description" type="text" id="description" />
        </div>
        <div>
          <button type="submit">Confirm</button>
          <button type="button" @click="cancelForm">Cancel</button>
        </div>
      </form>
    </div>
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
        courseNumber: '',
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
      console.log(courseData);
      CourseServices.create(courseData)
    .then((response) => {
      console.log("add " + response.data);
    })
    .catch((e) => {
      // message.value = e.response.data.message;
      console.log(e);
    });
      this.showForm = false;
      this.resetCourse(); 
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px;
  width: auto;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}

.model {
  width: 400px;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
  height: auto;
}

label {
  display: inline-block;
  clear: left;
  width: 125px;
  text-align: left;
}

.textInput {
  display: inline-block;
}

button {
  margin-left: 10px;
}
</style>