import { defineStore } from 'pinia';
const config = useRuntimeConfig()

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth-internal', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUserInternal({ email, password }: UserPayloadInterface) {
      const { data, pending }: any = await useFetch(config.public.baseURL + '/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      this.loading = pending
      if (data.value) {
        const token = useCookie('token-internal')
        const user = useCookie('user-internal')
        token.value = data?.value?.access_token
        user.value = data?.value?.user
        this.authenticated = true
      }
    },
    logUserInternalOut() {
      const token = useCookie('token-internal'); // useCookie new hook in nuxt 3
      const user = useCookie('user-internal')
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      user.value = null
    },
  },
});