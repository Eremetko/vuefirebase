<template>
  <v-container>
    <v-card width="500px" class="mx-auto nt-5">
      <v-card-title>
        <h1 class="display-1">{{$t('formTitle')}}</h1>
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-form
        @submit.prevent="validateLogin"
        lazy-validation
        id="authForm">
          <v-text-field
            name="Username"
            type="email"
            :error-messages="emailErrors"
            :label="$t('labelUsername')"
            v-model.trim="user.username"
            :prepend-icon="mdiAccountCircle"
            required
          />
          <v-text-field
            name="Password"
            :label="$t('labelPassword')"
            :type="showPassword ? 'text' : 'password'"
            v-model.trim="user.password"
            :error-messages="passwordErrors"
            :prepend-icon="mdiLock"
            :append-icon="showPassword ? mdiEye : mdiEyeOff"
            @click:append="showPassword = !showPassword"
            required
          />
          <v-card-actions>
            <v-btn color="success" @click="validateSignUp">{{$t('buttonSignUp')}}</v-btn>
            <v-spacer></v-spacer>
            <v-btn type="submit" color="info" from="authForm">{{$t('buttonLogin')}}
                <v-icon right dark>{{mdiLogin}}</v-icon>
              </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {mdiAccountCircle, mdiLock, mdiEye, mdiEyeOff, mdiLogin} from '@mdi/js'
import {mapActions, mapGetters} from 'vuex';
import { required, minLength, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      mdiAccountCircle,
      mdiLock,
      mdiEye,
      mdiEyeOff,
      mdiLogin,
      user: {
        username: null,
        password: null,
      },
      showPassword: false,
    }
  },
  validations: {
    user: {
      username: {email, required},
      password: {required, minLength: minLength(6)}
    }
  },
  computed: {
    ...mapGetters('auth', {
      error: 'getError'
    }),
    emailErrors(){
      const errors = [];
      if(this.error === 'auth/user-not-found') errors.push(this.$t('userNotFound'));
      else if (this.error === 'auth/email-already-in-use') errors.push(this.$t('emailAlreadyInUse'));
      if (errors.length === 0) {
        if (!this.$v.user.username.$dirty) return errors;
        !this.$v.user.username.email && errors.push(this.$t('emailValid'));
        !this.$v.user.username.required && errors.push(this.$t('emailRequired'));
      }
      return errors;
    },
    passwordErrors(){
      const errors = [];
      if (this.error === 'auth/wrong-password') errors.push(this.$t('wrongPassword'));
      if (errors.length === 0) {
        if(!this.$v.user.password.$dirty) return errors;
        !this.$v.user.password.minLength && errors.push(this.$t('passwordValid'));
        !this.$v.user.password.required && errors.push(this.$t('passwordRequired'));
      }
      return errors;
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'signUp' ]),
    validateLogin(){
      this.login(this.user);
      this.$v.$touch();

    },
    validateSignUp(){
      this.signUp(this.user);
      this.$v.$touch();
    }
  }
};
</script>
