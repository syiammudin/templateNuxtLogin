<template>
  <v-sheet class="login">
    <div style="height: 100px"></div>
    <div class="text-h5 font-weight-bold text-center mt-10">
      Welcome to Login Page My Website
    </div>
    <div class="text-center grey--text">Sign in to your account below</div>

    <v-form
      lazy-validation
      ref="form"
      style="margin-bottom: 50px; margin-top: 50px; width: 300px"
      class="mx-auto"
    >
      <div class="mb-2 font-weight-bold">Email</div>
      <v-text-field
        class="mb-6"
        v-model="email"
        :rules="rules.email"
        label="your@email.com"
        placeholder="your@email.com"
        hide-details
        solo
        outlined
        flat
        dense
        color="grey"
      >
      </v-text-field>

      <div class="mb-2 font-weight-bold">Password</div>
      <v-text-field
        class="mb-6"
        v-model="password"
        :rules="rules.password"
        label="Your Password"
        placeholder="Your Password"
        @keydown.enter="login"
        hide-details
        solo
        outlined
        flat
        dense
        color="grey"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn
        block
        large
        color="success"
        elevation="0"
        :loading="loading"
        @click="login"
        class="mt-10 font-weight-bold"
        >Sign In</v-btn
      >
    </v-form>
  </v-sheet>
</template>
<script>
export default {
  layout: "loginTheme",
  data() {
    return {
      snackbar: false,
      email: "",
      password: "",
      rules: {},
      loading: false,
      showPassword: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.$auth
        .loginWith("laravelSanctum", {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((r) => {
          this.$store.commit("setKlinikId", this.$auth.user.klinik_id);
          this.$router.push("/");
        })
        .catch((e) => {
          this.$notifier.showMessage({
            content: e.response.data.message,
            color: "error",
          });
          console.log(e.response.data);

          if (e.response.status == 422) {
            this.rules = e.response.data.errors;
            this.$refs.form.validate();
          }
        })
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style lang="">
</style>