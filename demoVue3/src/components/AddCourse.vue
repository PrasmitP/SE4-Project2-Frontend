<template>
  <div>
    <!-- Add Course Button -->
    <button id="AddButton" v-if="!showForm" @click="toggleForm">Add Course</button>

    <!-- Course Form (hidden initially) -->
    <div v-if="showForm" class="form-container">
      <form @submit.prevent="submitCourse" class="course-form">
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
          <input v-model="course.number" type="text" id="number" required maxlength="9" />
        </div>
        <div class="form-group">
          <label for="level">Course Level:</label>
          <input v-model="course.level" type="number" id="level" required min="1" max="9" />
        </div>
        <div class="form-group">
          <label for="hours">Credit Hours:</label>
          <input v-model="course.hours" type="number" id="hours" required min="1" max="9" />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input v-model="course.description" type="text" id="description" required />
        </div>
        <div class="form-actions">
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
      course.value = {
        name: '',
        department: '',
        number: '',
        level: 1,
        hours: 0,
        description: ''
      };
      showForm.value = false;
    };

    const cancelForm = () => {
      showForm.value = false;
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