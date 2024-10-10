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
