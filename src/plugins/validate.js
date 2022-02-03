import Vue from "vue";

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";

import ko from "vee-validate/dist/locale/ko.json";
import * as rules from "vee-validate/dist/rules";

/**
 * Rules Message Overwrite
 */

const customFieldMessages = {
  email: {
    required: "이메일을 입력해주세요.",
    email: "이메일을 입력해주세요.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    min: "비밀번호는 8자 이상 입력해주세요.",
    is: "비밀번호가 일치하지 않습니다.",
  },
  passwordRetype: {
    required: "비밀번호를 입력해주세요.",
    min: "비밀번호는 8자 이상 입력해주세요.",
  },
  displayname: {
    required: "닉네임을 입력해주세요.",
    max: "닉네임은 20자 이하로 입력해주세요.",
    regex: "닉네임은 특수문자를 제외하고 입력해주세요.",
  },
  // (v) => !!v || "닉네임을 입력해주세요.",
  // (v) =>
  //   (v.length >= 1 && v.length <= 20) || "닉네임은 20자 이하로 입력해주세요.",
  // (v) =>
  //   !/[^0-9ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]/.test(v) ||
  //   "닉네임은 특수기호 빼고 입력해 주세요",
};

localize("ko", {
  code: "ko",
  messages: ko.messages,
  fields: customFieldMessages,
});

// Install VeeValidate rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
