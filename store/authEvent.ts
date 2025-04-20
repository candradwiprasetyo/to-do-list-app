import { defineStore } from 'pinia';
const config = useRuntimeConfig()

interface UserPayloadInterface {
  email: string;
  password: string;
  event_id: string;
}

export const useAuthEventStore = defineStore('authEvent', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password, event_id }: UserPayloadInterface) {

      const { data, pending }: any = await useFetch(config.public.baseURL + '/event/attendance', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          email,
          password,
          event_id,
        },
      });
      this.loading = pending
      if (data?.value?.message === 'success') {
        const userEvent = useCookie('registration')
        userEvent.value = JSON.stringify(data.value)
        this.authenticated = true
      }
    },
    logoutEvent() {
      const registration = useCookie('registration')
      const agendaLocked = useCookie('agenda-locked')
      this.authenticated = false
      registration.value = null
      agendaLocked.value = null
    },
  },
});