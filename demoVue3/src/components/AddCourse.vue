<template>
  <!-- Add Course Button -->
  <button v-if="!showForm" @click="toggleForm">Add Course</button>
  <div v-if="showForm" class="overlay">
    <div class="model">
      <!-- Course Form (hidden initially) -->
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
          <input class="textInput" v-model="course.number" type="text" id="number" required maxlength="4" />
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
          <textarea    class="descInput" v-model="course.description" type="text" id="description" />
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
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    // Track form visibility
    const showForm = ref(false);

    // Course data model
    const course = ref({
      name: '',
      department: '',
      number: '',
      level: 1, // Default to first year
      hours: 0,
      description: ''
    });

    // Toggles the visibility of the form
    const toggleForm = () => {
      showForm.value = true;
    };

    // Handles the form submission
    const submitCourse = () => {
      emit('addCourse', { ...course.value });
      // Reset fields and hide the form after submission
      course.value.name = '';
      course.value.department = '';
      course.value.number = '';
      course.value.level = 1;
      course.value.hours = 0;
      showForm.value = false;
    };

    // Cancels the form (hides it without submitting)
    const cancelForm = () => {
      showForm.value = false;
      // Optionally, you can reset fields here too
    };

    return {
      course,
      showForm,
      toggleForm,
      submitCourse,
      cancelForm
    };
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

button{
  margin-left: 10px;
}
</style>