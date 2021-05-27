<template>
  <div>
    <div>
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
          <td>{{ question.regtime }}</td>
        </tr>
        <tr>
          <td colspan="2">
            {{ question.content }}
          </td>
        </tr>
      </table>
      <div class="text-right">
        <router-link to="/qna" class="mr-1">
          <b-button>목록</b-button>
        </router-link>
        <router-link :to="`/qna/update/${$route.params.no}`" class="mr-1">
          <b-button>수정</b-button>
        </router-link>
        <b-button variant="danger" @click="deleteQnA">삭제</b-button>
      </div>
      <!-- <div class="text-center">
      <br />
      <h4>답변</h4>
      <div>
        <table class="table table-bordered table-condensed">
          <tr v-for="item in items" v-bind:key="item.id">
            <td>{{ item.writer }}</td>
            <td>{{ item.content }}</td>
          </tr>
        </table>
      </div>
      <textarea
        v-model.lazy="answer_detail"
        name="answer_detail"
        id="answer_detail"
        ref="answer_detail"
        cols="50"
        rows="3"
      ></textarea>
      <br />
      <button class="btn btn-primary" @click="checkHandler">답글 달기</button>
    </div> -->
    </div>
  </div>
</template>

<script>
import http from "@/http-common";
export default {
  name: "read",
  data: function () {
    return {
      question: {},
    };
  },
  async created() {
    const response = await http.get(
      `/happyhouse/qnaboard/${this.$route.params.no}`
    );
    this.question = response.data.result;
  },
  methods: {
    async deleteQnA() {
      await http.delete(`/happyhouse/qnaboard/${this.$route.params.no}`);
      alert("게시글이 삭제됐습니다.");
      this.$router.push("/qna");
    },
  },
};
</script>

<style></style>
