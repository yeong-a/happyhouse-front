<template>
  <div>
    <div class="form-group">
      <label>작성자</label>
      <input
        type="text"
        class="form-control"
        :value="question.writer"
        readonly
      />
    </div>
    <div class="form-group">
      <label>제목</label>
      <input
        class="form-control"
        placeholder="제목을 입력하세요"
        v-model="question.title"
        required
      />
    </div>
    <div class="form-group">
      <label>내용</label>
      <textarea
        class="form-control"
        placeholder="내용을 입력하세요"
        v-model="question.content"
        required
      ></textarea>
    </div>
    <div class="text-right">
      <b-button variant="primary" @click="createQuestion()" class="mr-1"
        >등록</b-button
      >
      <router-link to="/qna" v-slot="{ navigate }">
        <b-button @click="navigate">목록</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import http from "@/http-common";

export default {
  data() {
    return {
      question: {
        writer: this.$store.state.user.name,
        title: "",
        content: "",
      },
    };
  },
  methods: {
    async createQuestion() {
      await http.post(`happyhouse/qnaboard/`, {
        title: this.question.title,
        content: this.question.content,
      });
      alert("글 등록 완료");
      this.$router.push("/qna");
    },
  },
};
</script>

<style></style>
