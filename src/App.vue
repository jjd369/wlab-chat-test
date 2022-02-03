<template>
  <div id="app">
    <b-container class="pt-5">
      <h1>Boilerplate</h1>
      <router-view />
    </b-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      input: {
        text: null,
        password: null,
        number: 0,
      },
      rules: {
        requireRules: [
          (v) => !!v || "필수 입력 값입니다.",
          (v) => v.length >= 5 || "5글자 이상 입력해주세요.",
          (v) =>
            !/[^0-9a-zA-Z]+/gi.test(v) ||
            "한글 및 특수문자는 입력할 수 없습니다.",
        ],
      },
    };
  },
};
</script>
