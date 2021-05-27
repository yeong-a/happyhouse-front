<template>
  <div>
    <h1>QnA</h1>
    <div v-if="questions != null">
      <table class="table table-bordered table-condensed">
        <colgroup>
          <col :style="{ width: '5%' }" />
          <col :style="{ width: '50%' }" />
          <col :style="{ width: '10%' }" />
          <col :style="{ width: '25%' }" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in questions" :key="question.no">
            <td>
              {{ question.no }}
            </td>
            <td>
              <router-link :to="`qna/read/${question.no}`">
                {{ question.title }}
              </router-link>
            </td>
            <td>
              {{ question.writer }}
            </td>
            <td>
              {{ question.regtime }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>글이 없습니다.</div>
    <div class="text-right" v-if="$store.state.user.email != ''">
      <router-link to="/qna/create"
        ><button class="btn btn-primary">등록</button></router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    questions() {
      return this.$store.state.questions;
    },
  },
  created() {
    this.getQuestions();
  },
  methods: {
    getQuestions() {
      this.$store.dispatch("getQuestions");
    },
    changeType(type) {
      console.log("changeType : create");
      this.$store.dispatch("changeType", type);
    },
  },
};
</script>

<style scoped></style>
