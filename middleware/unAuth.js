export default function (res) {
    if (res.$cookies.get('token')) {
      return res.redirect('/')
    }
  }