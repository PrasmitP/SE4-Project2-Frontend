<template>
  <div>
    <h2>Course List</h2>
    <table>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Course Department</th>
          <th>Course Number</th>
          <th>Level</th>
          <th>Hours</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td>{{ course.name }}</td>
          <td>{{ course.department }}</td>
          <td>{{ course.number }}</td>
          <td>{{ course.level }}</td>
          <td>{{ course.hours }}</td>
          <td>
            <button @click="$emit('editCourse', course)">Edit</button>
            <button @click="$emit('deleteCourse', course.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    courses: Array
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

thead {
  background-color: #f4f4f4;
}

th,
td {
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  margin-right: 0.5rem;
}

button:first-of-type {
  background-color: #007bff;
  color: white;
}

button:last-of-type {
  background-color: #dc3545;
  color: white;
}
</style>
