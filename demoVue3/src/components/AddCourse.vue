<template>
  <div>
    <!-- Add Course Button -->
    <button v-if="!showForm" @click="toggleForm">Add Course</button>

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
<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000; 
}

.course-form {
  background: white; 
  padding: 2rem; 
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3); 
  width: 300px; 
}

.form-group {
  display: flex;
  flex-direction: column; 
  margin-bottom: 1rem; 
}

.form-group label {
  margin-bottom: 0.5rem; 
}

input {
  padding: 0.5rem; 
  border: 1px solid #ccc; 
  border-radius: 4px; 
}

.form-actions {
  display: flex;
  justify-content: space-between; 
}

button {
  background-color:#007FFF;
  padding: 0.75rem 1.5rem; 
  border: none; 
  border-radius: 4px; 
  cursor: pointer;
  font-size: 1rem; 
  color: white; 
}

button[type="submit"] {
  background-color: #148918; 
}

button[type="button"] {
  background-color: #930e05; 
}
</style>
