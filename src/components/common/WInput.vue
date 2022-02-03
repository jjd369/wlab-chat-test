<template>
  <div class="position-relative">
    <validation-provider
      ref="provider"
      :name="name"
      :rules="rules"
      v-slot="validationContext"
    >
      <b-input-group>
        <label class="flex-grow-1 mb-3">
          <span
            :class="{
              'text-danger':
                rules && getValidationState(validationContext) === false,
            }"
            v-text="label"
          />
          <b-form-group class="m-0">
            <b-input
              class="py-2 px-3"
              v-bind="{
                ...$attrs,
                ...$props,
                class: inputClass,
                state: rules && getValidationState(validationContext),
              }"
              @input="inputListener"
            >
            </b-input>
            <b-form-invalid-feedback
              class="text-happy text-right"
              :style="{ top: '100%' }"
            >
              {{ validationContext.errors[0] }}
            </b-form-invalid-feedback>
            <template v-for="(_, slot) in $slots">
              <slot :name="slot" />
            </template>
            <template v-for="(_, slot) in $scopedSlots">
              <slot
                :name="slot"
                v-bind="{
                  state: rules && getValidationState(validationContext),
                }"
              />
            </template>
          </b-form-group>
        </label>
      </b-input-group>
    </validation-provider>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => "text",
    },
    inputClass: { default: () => "", type: String },
    name: { type: String },
    label: { type: String },
    rules: { type: [String, Object] },
    serverCheck: { default: false },
    mounted: false,
  },
  data() {
    return {
      serverState: null,
    };
  },
  computed: {
    slots() {
      console.log(this.$slots);
      return true;
    },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    inputListener(v) {
      let val = v;
      switch (this.type) {
        case "number":
          console.log(v);
          val = +v;
          break;

        default:
          break;
      }
      this.$emit("input", val);
    },
  },
};
</script>
