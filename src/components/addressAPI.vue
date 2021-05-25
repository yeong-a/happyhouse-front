<template>
    <div>
        <b-button @click="execDaumPostcode()">주소 검색</b-button>
        <br />
        <label for="jibunAddress">주소</label>
        <b-input
            v-model="jibunAddress"
            type="text"
            id="jibunAddress"
            placeholder="지번주소 검색"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            jibunAddress: "",
        };
    },
    methods: {
        execDaumPostcode() {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var extraRoadAddr = ""; // 참고 항목 변수

                    // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                    // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                        extraRoadAddr += data.bname;
                    }
                    // 건물명이 있고, 공동주택일 경우 추가한다.
                    if (data.buildingName !== "" && data.apartment === "Y") {
                        extraRoadAddr +=
                            extraRoadAddr !== ""
                                ? ", " + data.buildingName
                                : data.buildingName;
                    }
                    // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                    if (extraRoadAddr !== "") {
                        extraRoadAddr = " (" + extraRoadAddr + ")";
                    }

                    document.getElementById("jibunAddress").value =
                        data.jibunAddress;
                },
            }).open();
        },
    },
};
</script>
