<template>
  <div>
    <h1>QnA</h1>
    <b-table
      striped
      hover
      :fields="fields"
      :items="questions"
      show-empty
      empty-text="질문이 없습니다."
    >
      <template #cell(title)="data">
        <router-link :to="`qna/read/${data.item.no}`">
          {{ data.item.title }}
        </router-link>
      </template>
      <template #cell(regtime)="data">
        {{ formatDate(data.item.regtime) }}
      </template>
    </b-table>
    <div class="text-right" v-if="$store.state.user.email !== ''">
      <router-link to="/qna/create">
        <b-button variant="primary">등록</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import http from "@/http-common";
import moment from "moment";

export default {
  data() {
    return {
      fields: [
        {
          key: "no",
          label: "번호",
        },
        {
          key: "title",
          label: "제목",
        },
        {
          key: "writer",
          label: "작성자",
        },
        {
          key: "regtime",
          label: "등록 일시",
        },
      ],
      questions: [],
    };
  },
  created() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      const response = await http.get(`happyhouse/qnaboard`);
      this.questions = response.data.result;
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
  },
};
</script>

<style></style>
