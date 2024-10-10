<template>
  <div v-if="course" class="popup-container">
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
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    course: {
      type: Object,
      required: true,
    }, // Receives the course to edit
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
      emit('cancelUpdate'); // Optionally hide after update
    };

    const cancelUpdate = () => {
      emit('cancelUpdate'); // Emit cancelUpdate event
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
  max-width: 400px; /* Decreased max width */
  margin: 50px auto; /* Adjust margin to fit smaller box */
  background-color: #ffffff;
  padding: 20px; /* Decreased padding */
  border-radius: 10px; /* Slightly rounded corners */
  border: 1px solid #dfe3e6;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.popup-container h2 {
  font-size: 20px; /* Decreased font size */
  margin-bottom: 15px; /* Adjusted margin */
  color: #333;
  text-align: center;
}

.popup-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: column; /* Keep column layout for smaller design */
  margin-bottom: 10px; /* Decreased margin */
}

.form-group label {
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
}

.form-group input {
  padding: 10px; /* Adjusted padding */
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px; /* Decreased font size */
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #1b41ca;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 10px; /* Decreased gap */
  margin-top: 15px; /* Adjusted margin */
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Decreased font size */
}

.confirm-btn {
  background-color: #1b41ca;
  color: white;
  transition: background-color 0.3s ease-in-out;
}

.confirm-btn:hover {
  background-color: #1633a8;
}

.cancel-btn {
  background-color: #821109;
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

@media (max-width: 768px) {
  .popup-container {
    max-width: 90%;
    padding: 20px;
  }

  .popup-container h2 {
    font-size: 18px; /* Adjust for smaller screens */
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
