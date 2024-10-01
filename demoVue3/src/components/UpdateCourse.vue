<template>
  <div>
    <h2>Update Course</h2>
    <form @submit.prevent="submitUpdate">
      <div>
        <label for="name">Course Name</label>
        <input v-model="courseCopy.name" type="text" id="name" required />
      </div>
      <div>
        <label for="description">Course Description</label>
        <input v-model="courseCopy.description" type="text" id="description" required />
      </div>
      <button type="submit">Update Course</button>
      <button type="button" @click="cancelUpdate">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    course: Object
  },
  setup(props, { emit }) {
    const courseCopy = ref({ ...props.course });

    watch(() => props.course, () => {
      courseCopy.value = { ...props.course };
    });

    const submitUpdate = () => {
      emit('updateCourse', courseCopy.value);
    };

    const cancelUpdate = () => {
      emit('updateCourse', null);
    };

    return {
      courseCopy,
      submitUpdate,
      cancelUpdate
    };
  }
};
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}

button {
  margin-right: 1rem;
}
</style>