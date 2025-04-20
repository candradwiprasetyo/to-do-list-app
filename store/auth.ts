import { defineStore } from 'pinia';
const config = useRuntimeConfig()

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      const { data, pending }: any = await useFetch(config.public.baseURL + '/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
        },
      });
      this.loading = pending
      if (data.value && (data?.value?.user?.role_id == 1 || data?.value?.user?.role_id == 3 || data?.value?.user?.role_id == 6)) {
        const token = useCookie('token')
        const user = useCookie('user')
        token.value = data?.value?.access_token
        user.value = data?.value?.user
        this.authenticated = true
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      const user = useCookie('user')
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      user.value = null
    },
  },
});