<template>
  <div>
    <h2>Add a New Course</h2>
    <form @submit.prevent="submitCourse">
      <div>
        <label for="name">Course Name</label>
        <input v-model="course.name" type="text" id="name" required />
      </div>
      <div>
        <label for="description">Course Description</label>
        <input v-model="course.description" type="text" id="description" required />
      </div>
      <button type="submit">Add Course</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const course = ref({
      name: '',
      description: ''
    });

    const submitCourse = () => {
      emit('addCourse', { ...course.value });
      course.value.name = '';
      course.value.description = '';
    };

    return {
      course,
      submitCourse
    };
  }
};
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}

div {
  margin-bottom: 1rem;
}
</style>