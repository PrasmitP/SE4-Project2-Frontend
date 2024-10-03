<template>
  <div>
    
    <!-- Add Course Button -->
    <button v-if="!showForm" @click="toggleForm">Add Course</button>
    
    <!-- Course Form (hidden initially) -->
    <form v-if="showForm" @submit.prevent="submitCourse">
      <div>
        <label for="name">Course Name : </label>
        <input v-model="course.name" type="text" id="name" required />
      </div>
      <div>
        <label for="department">Department : </label>
        <input v-model="course.department" type="text" id="department" required maxlength="4" />
      </div>
      <div>
        <label for="number">Course Number : </label>
        <input v-model="course.number" type="text" id="number" required maxlength="9" />
      </div>
      <div>
        <label for="level">Course Level : </label>
        <input v-model="course.level" type="number" id="level" required min="1" max="9" />
      </div>
      <div>
        <label for="hours">Credit Hours : </label>
        <input v-model="course.hours" type="number" id="hours" required min="1" max="9" />
      </div>
      <div>
        <label for="description">Description : </label>
        <input v-model="course.description" type="text" id="description" required/>
      </div>
      <div>
        <button type="submit">Confirm</button>
        <button type="button" @click="cancelForm">Cancel</button>
      </div>
    </form>
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
      hours: 0
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
  margin-top: 1rem;
}

button {
  margin-top: 1rem;
  margin-right: 0.5rem;
}
</style>