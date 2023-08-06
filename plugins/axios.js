export default function (context) {
    context.$axios.onRequest((config) => {
      config.baseURL = context.app.$config.api
      config.headers.common.Authorization = `HVXP ${context.$cookies.get('token')}`
    })
    context.$axios.onError((error) => {
      console.log(error.response.status)
      if (error.response.status === 404) context.$toast.error(error)
      if (error.response.status === 403 || error.response.status === 401) {
        context.$cookies.remove('token')
        context.$router.push('/login')
      }
      return false
    })
  }
  