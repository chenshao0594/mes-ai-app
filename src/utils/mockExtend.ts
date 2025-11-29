import Mock from 'mockjs'

Mock.Random.extend({
  phone: function () {
    const phonePrefix = ['135', '157', '181']
    return this.pick(phonePrefix) + Mock.mock(/\d{8}/)
  }
})
