<template>
  <div>
    <w-form v-model="valid" v-slot="{ invalid }" @submit="submit">
      <w-input label="제목" name="제목" v-model="input.text" rules="required" />
      <w-input
        label="이메일"
        name="이메일"
        v-model="input.email"
        rules="required|email"
      />
      <w-input
        label="비밀번호"
        name="비밀번호"
        type="password"
        v-model="input.passwordRetype"
        rules="required|min:8"
      />
      <w-input
        label="비밀번호 확인"
        name="비밀번호 확인"
        type="password"
        v-model="input.password"
        :rules="{ required: true, min: 8, is: input.passwordRetype }"
      />
      <w-input label="noRequired" v-model="input.texted" />
      <w-textarea
        label="TextArea"
        name="TextArea"
        v-model="input.textarea"
        rules="required|min:10"
      />

      <w-checkbox :value="checkedAll" @change="checkAll" class="py-2"
        >전체 약관 동의</w-checkbox
      >
      <w-checkbox
        v-for="item in terms"
        :key="item.type"
        :label="item.name"
        :name="item.name"
        :required="item.required"
        v-model="input[item.key]"
        class="py-1"
      >
        <a class="text-primary">{{ item.name }}</a
        >에 동의합니다.{{ item.required ? "(필수)" : "" }}
      </w-checkbox>

      <div class="d-flex align-items-center justify-content-end">
        <b-btn variant="link" class="py-2 px-4">돌아가기</b-btn>
        <b-btn
          type="submit"
          variant="primary"
          class="py-2 px-4"
          :disabled="invalid"
          >회원가입</b-btn
        >
      </div>
    </w-form>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      valid: false,
      input: {
        text: null,
        email: null,
      },
      terms: [
        {
          key: "terms",
          name: "이용약관",
          required: true,
        },
        {
          key: "privacy",
          name: "개인정보이용동의",
          required: true,
        },
        {
          key: "sms",
          name: "SMS 메시지 수신",
        },
      ],
      menu: [
        {
          name: "WForm",
          children: [
            {
              name: "WForm",
            },
          ],
        },
      ],
    };
  },
  computed: {
    checkedAll() {
      return !this.terms.some((item) => !this.input[item.key]);
    },
  },
  methods: {
    checkAll(bool) {
      const input = this.input;
      this.terms.forEach((item) => (input[item.key] = bool));
      this.input = input;
      console.log("------------------------------------");
      console.log(this.input);
      console.log("------------------------------------");
    },
    submit() {
      console.log("------------------------------------");
      console.log("test");
      console.log("------------------------------------");
    },
  },
};
</script>
