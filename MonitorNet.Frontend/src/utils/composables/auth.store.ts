export const useAuthStore = defineStore("auth", () => {
  const storage = useLocalStorage<AuthStorageData>("auth", {})

  const authenticated = computed(() => (storage.value.token?.length ?? 0) > 0)
  const token = computed(() => storage.value.token)

  const login = (token: string) => storage.value.token = token
  const logout = () => storage.value.token = undefined

  return { authenticated, token, login, logout }
})

type AuthStorageData = {
  token?: string
}
