<template>
  <div>
    <div>
      <div class="text-right mb-3">
        <router-link to="/qna" class="mr-1">
          <b-button>목록</b-button>
        </router-link>
        <template
          v-if="
            $store.state.user.email &&
            question.email === $store.state.user.email
          "
        >
          <router-link :to="`/qna/update/${$route.params.no}`" class="mr-1">
            <b-button>수정</b-button>
          </router-link>
          <b-button variant="danger" @click="deleteQnA">삭제</b-button>
        </template>
      </div>
      <table class="table table-bordered">
        <tr>
          <th>번호</th>
          <td>{{ question.no }}</td>
        </tr>
        <tr>
          <th>글쓴이</th>
          <td>{{ question.writer }}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{{ question.title }}</td>
        </tr>
        <tr>
          <th>날짜</th>
          <td>{{ formatDate(question.regtime) }}</td>
        </tr>
        <tr>
          <td colspan="2">
            {{ question.content }}
          </td>
        </tr>
      </table>
      <b-card
        v-for="answer in answers"
        :key="answer.no"
        :header="answer.writer"
        class="mb-2"
      >
        {{ answer.content }}
      </b-card>
      <template v-if="$store.getters.isAdmin">
        <b-form-group label="답변" class="mt-3">
          <b-form-textarea v-model="answer" rows="3"></b-form-textarea>
        </b-form-group>
        <div class="text-right">
          <b-button variant="primary" @click="addAnswer"> 답변 달기 </b-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import http from "@/http-common";

export default {
  name: "read",
  data: function () {
    return {
      question: {},
      answers: [],
      answer: "",
    };
  },
  async created() {
    const response = await http.get(
      `/happyhouse/qnaboard/${this.$route.params.no}`
    );
    this.question = response.data.result;
    await this.getAnswers();
  },
  methods: {
    async deleteQnA() {
      await http.delete(`/happyhouse/qnaboard/${this.$route.params.no}`);
      alert("게시글이 삭제됐습니다.");
      this.$router.push("/qna");
    },
    async getAnswers() {
      const response = await http.get(
        `/happyhouse/qnaboard/${this.$route.params.no}/answers`
      );
      this.answers = response.data.result;
    },
    async addAnswer() {
      await http.post(`/happyhouse/qnaboard/${this.$route.params.no}/answers`, {
        content: this.answer,
      });
      await this.getAnswers();
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>

<style></style>
