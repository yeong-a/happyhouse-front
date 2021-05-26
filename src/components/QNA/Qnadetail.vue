<template>
    <div>
        <b-table class="table table-bordered w-50">
            <tr>
                <th>번호</th>
                <td>{{ no }}</td>
            </tr>
            <tr>
                <th>글쓴이</th>
                <td>{{ writer }}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td>{{ title }}</td>
            </tr>
            <tr>
                <th>날짜</th>
                <td>{{ getFormatDate(regtime) }}</td>
            </tr>
            <tr>
                <td colspan="2">
                    {{ content }}
                </td>
            </tr>
        </b-table>

        <br />
        <div class="text-center">
            <router-link to="/"
                ><button class="btn btn-primary">목록</button></router-link
            >
            <router-link :to="`/update/` + this.$route.params.no"
                ><button class="btn btn-primary">수정</button></router-link
            >
            <router-link :to="'/delete/' + this.$route.params.no"
                ><button class="btn btn-primary">삭제</button></router-link
            >
            <div></div>
            <div class="text-center">
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
                <button class="btn btn-primary" @click="checkHandler">
                    답글 달기
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import http from "@/http-common";

export default {
    name: "detail",
    props: {
        no: { type: Number },
        writer: { type: String },
        title: { type: String },
        content: { type: String },
        regtime: { type: String },
    },
    methods: {
        loadAnswers() {
            // http
            //   .get("/happyhouse/qnaboard/answer/" + this.$route.params.no)
            //   .then(({ data }) => {
            //     this.items = data;
            //   })
            //   .catch((exp) => {
            //     console.log(exp);
            //     alert("에러가 발생했습니다.");
            //   });
        },
        getFormatDate(regtime) {
            return moment(new Date(regtime)).format("YYYY.MM.DD HH:mm:ss");
        },
        checkHandler() {
            //   let err = true;
            //   let msg = "";
            //   !this.answer_detail &&
            //     ((msg = "내용을 입력해주세요"),
            //     (err = false),
            //     this.$refs.answer_detail.focus());
            //   if (!err) alert(msg);
            //   else this.createHandler();
            // },
            // createHandler() {
            //   const answerDetail = this.answer_detail;
            //   this.answer_detail = "";
            //   http
            //     .post("/happyhouse/qnaboard/answer/" + this.$route.params.no, {
            //       no: this.no,
            //       writer: "관리자",
            //       content: answerDetail,
            //     })
            //     .then(({ data }) => {
            //       let msg = "등록 처리시 문제가 발생했습니다.";
            //       if (data === "success") {
            //         msg = "등록이 완료되었습니다.";
            //       }
            //       alert(msg);
            //       this.loadAnswers();
            //     })
            //     .catch((exp) => {
            //       alert("등록 처리시 에러가 발생했습니다.");
            //       console.log(exp);
            //     });
            // },
        },
        data() {
            return {
                items: [],
                answer_detail: "",
            };
        },
        created() {
            this.loadAnswers();
        },
    },
};
</script>
