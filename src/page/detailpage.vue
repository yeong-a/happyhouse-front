<template>
    <div class="row">
        <div class="col-sm-4">
            <list></list>
        </div>
        <div class="col-sm-8">
            <kakaomap></kakaomap>
        </div>
    </div>
</template>

<script>
import list from "@/components/detaillist.vue";
import kakaomap from "@/components/kakaomap.vue";
export default {
    name: "detail",
    components: {
        kakaomap,
        list,
    },
};
</script>

<style scoped></style>
