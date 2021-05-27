<template>
  <div>
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
        <button class="btn btn-primary" @click="updateQuestion()">수정</button>
        <router-link tag="button" class="btn btn-primary" to="/qna">
          목록
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/http-common";

export default {
  name: "update",
  data() {
    return {
      question: {},
    };
  },
  computed: {
    no() {
      return this.$route.params.no;
    },
  },
  async created() {
    const response = await http.get(`happyhouse/qnaboard/${this.no}`);
    this.question = response.data.result;
  },
  methods: {
    async updateQuestion() {
      await http.put(`happyhouse/qnaboard/${this.no}`, {
        title: this.question.title,
        content: this.question.content,
      });
      alert("글 수정 완료");
      this.$router.push(`/qna/read/${this.no}`);
    },
  },
};
</script>

<style></style>
