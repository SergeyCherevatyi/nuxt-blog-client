export default (ctx) => {

  ctx.store.dispatch('auth/autoLogin')
}
