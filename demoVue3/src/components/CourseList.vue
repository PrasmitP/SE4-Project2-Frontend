<template>
  <div>
    <h2>Course List</h2>
    <table>
      <thead>
        <tr>
          <th>Course Name</th>
          <th>Department</th>
          <th>Course Number</th>
          <th>Level</th>
          <th>Hours</th>
          <th>Description</th>
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
          <td>{{ course.description }}</td>
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