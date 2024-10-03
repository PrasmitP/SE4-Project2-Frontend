<template>
  <div v-if="course" class="popup-container">
    <h2>Edit Course: {{ course.name }}</h2>

    <form @submit.prevent="submitUpdate" class="popup-form">
      <div>
        <label for="name">Course Name: </label>
        <input v-model="updatedCourse.name" type="text" id="name" required />
      </div>
      <div>
        <label for="department">Department: </label>
        <input v-model="updatedCourse.department" type="text" id="department" required maxlength="4" />
      </div>
      <div>
        <label for="number">Course Number: </label>
        <input v-model="updatedCourse.number" type="text" id="number" required maxlength="4" />
      </div>
      <div>
        <label for="level">Course Level: </label>
        <input v-model="updatedCourse.level" type="number" id="level" required min="1" max="9" />
      </div>
      <div>
        <label for="hours">Credit Hours: </label>
        <input v-model="updatedCourse.hours" type="number" id="hours" required min="1" max="9" />
      </div>
      <div>
        <label for="description">Description: </label>
        <input v-model="updatedCourse.description" type="text" id="description" required/>
      </div>
      <div>
        <button type="submit">Confirm</button>
        <button type="button" @click="cancelUpdate">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    course: Object // Receives the course to edit
  },
  setup(props, { emit }) {
    const updatedCourse = ref({ ...props.course });

    watch(() => props.course, (newCourse) => {
      if (newCourse) {
        updatedCourse.value = { ...newCourse };
      }
    });

    const submitUpdate = () => {
      emit('updateCourse', { ...updatedCourse.value });
      emit('cancelUpdate'); // Optionally hide after update
    };

    const cancelUpdate = () => {
      emit('cancelUpdate'); // Emit cancelUpdate event
    };

    return {
      updatedCourse,
      submitUpdate,
      cancelUpdate
    };
  }
};
</script>

<style scoped>
/* Popup container styling */
.popup-container {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 300px;
  z-index: 1000;
  border-radius: 8px;
}

/* Form styling */
.popup-form {
  display: flex;
  flex-direction: column;
}

.popup-form div {
  margin-bottom: 1rem;
}

.popup-form button {
  margin-right: 0.5rem;
}
</style>