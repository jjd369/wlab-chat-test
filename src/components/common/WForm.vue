<template>
  <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
    <slot v-bind="{ invalid }" />
    <b-form @submit.prevent="submit(validate, $event)">
      <slot name="submit" :invalid="invalid" />
    </b-form>
  </ValidationObserver>
</template>

<script>
export default {
  name: "w-form",
  methods: {
    async submit(validate, e) {
      const valid = await validate();
      if (valid) {
        this.$emit("submit", e);
      }
    },
  },
};
</script>

<style></style>
