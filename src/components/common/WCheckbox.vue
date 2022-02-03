<template>
  <div class="position-relative">
    <validation-provider
      ref="provider"
      :rules="required ? { required: { allowFalse: false } } : null"
      :name="name"
    >
      <b-checkbox
        :readonly="readonly"
        :name="name"
        :checked="value"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
      >
        <slot>
          <span v-text="label" />
        </slot>
      </b-checkbox>
    </validation-provider>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, default: null },
    value: { type: Boolean, default: false },
    readonly: { default: () => undefined, type: String },
    required: { type: Boolean, default: false },
    label: { default: null },
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    inputListener(e) {
      this.$emit("input", e);
    },
  },
};
</script>

<style></style>
