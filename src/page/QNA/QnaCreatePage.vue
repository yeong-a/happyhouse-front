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
        type="text"
        class="form-control"
        placeholder="제목을 입력하세요"
        v-model="question.title"
      />
    </div>
    <div class="form-group">
      <label>내용</label>
      <textarea
        type="text"
        class="form-control"
        placeholder="내용을 입력하세요"
        v-model="question.content"
      ></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-primary" @click="createQuestion()">등록</button>
      <router-link tag="button" class="btn btn-primary" to="/qna">
        목록
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
