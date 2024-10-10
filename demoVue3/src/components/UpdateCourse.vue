<template>
  <div v-if="course">
    <!-- Background overlay -->
    <div class="popup-overlay" @click="cancelUpdate"></div>

    <!-- Edit Course Popup -->
    <div class="popup-container">
      <h2>Edit Course: {{ course.name }}</h2>

      <form @submit.prevent="submitUpdate" class="popup-form">
        <div class="form-group">
          <label for="name">Course Name:</label>
          <input v-model="updatedCourse.name" type="text" id="name" required />
        </div>
        <div class="form-group">
          <label for="department">Department:</label>
          <input v-model="updatedCourse.department" type="text" id="department" required maxlength="4" />
        </div>
        <div class="form-group">
          <label for="number">Course Number:</label>
          <input v-model="updatedCourse.number" type="text" id="number" required maxlength="9" />
        </div>
        <div class="form-group">
          <label for="level">Course Level:</label>
          <input v-model="updatedCourse.level" type="number" id="level" required min="1" max="9" />
        </div>
        <div class="form-group">
          <label for="hours">Credit Hours:</label>
          <input v-model="updatedCourse.hours" type="number" id="hours" required min="1" max="9" />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input v-model="updatedCourse.description" type="text" id="description" required />
        </div>
        <div class="form-actions">
          <button type="submit" class="confirm-btn">Confirm</button>
          <button type="button" @click="cancelUpdate" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    course: {
      type: Object,
      required: true,
    }, 
  },
  setup(props, { emit }) {
    const updatedCourse = ref({ ...props.course });

    watch(
      () => props.course,
      (newCourse) => {
        if (newCourse) {
          updatedCourse.value = { ...newCourse };
        }
      }
    );

    const submitUpdate = () => {
      emit('updateCourse', { ...updatedCourse.value });
      emit('cancelUpdate'); 
    };

    const cancelUpdate = () => {
      emit('cancelUpdate'); 
    };

    return {
      updatedCourse,
      submitUpdate,
      cancelUpdate,
    };
  },
};
</script>

<style scoped>

.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-width: 400px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #dfe3e6;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.popup-container h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
  text-align: center;
}

.popup-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #007bff;
}


.form-actions {
  display: flex;
  justify-content:last baseline;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.confirm-btn {
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s ease-in-out;
}

.confirm-btn:hover {
  background-color: #075db8;
}

.cancel-btn {
  background-color: #8e0e05;
  color: white;
  transition: background-color 0.3s ease-in-out;
}

.cancel-btn:hover {
  background-color: #650d08;
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Overlay background */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 100; 
}

/* Responsiveness */
@media (max-width: 768px) {
  .popup-container {
    max-width: 90%;
    padding: 20px;
  }

  .popup-container h2 {
    font-size: 18px;
  }

  button {
    width: 100%;
  }

  .form-actions {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
