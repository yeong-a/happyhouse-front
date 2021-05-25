<template>
  <div>
    <tr>
      <td>{{ no }}</td>
      <td>
        <router-link :to="`/read/${no}`">{{ title }}</router-link>
      </td>
      <td>{{ writer }}</td>
      <td>{{ getFormatDate(regtime) }}</td>
    </tr>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
