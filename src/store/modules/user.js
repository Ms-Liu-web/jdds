// import { login, logout, getInfo, loginToken } from '@/api/user'
import { login, logout, loginToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userInfo: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userinfo) => {
    localStorage.setItem('user', JSON.stringify(userinfo))
    state.userInfo = userinfo
  }
}

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit('SET_USERINFO', userInfo)
  },
  // user login
  login({ commit }, userInfo) {
    const { user, password, type, captcha } = userInfo
    return new Promise((resolve, reject) => {
      login({
        user: user.trim(),
        password: password,
        type: type,
        captcha: captcha
      })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          localStorage.setItem('key', response.data.lock_ip)
          localStorage.setItem('rName', response.data.title)
          localStorage.setItem('befortime', response.data.tt)
          localStorage.setItem('userInfo', JSON.stringify(data))
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // user login
  loginToken({ commit }, postData) {
    const { token } = postData
    return new Promise((resolve, reject) => {
      loginToken({ token: token })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          localStorage.setItem('key', response.data.lock_ip)
          localStorage.setItem('rName', response.data.title)
          localStorage.setItem('befortime', response.data.tt)
          localStorage.setItem('userInfo', JSON.stringify(data))
          setToken(data.token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    commit('SET_ROLES', ['admin'])
    // return new Promise((resolve, reject) => {
    //   commit('SET_ROLES', ['admin'])
    //   getInfo(state.token)
    //     .then(response => {
    //       const { data } = response;
    //       if (!data) {
    //         reject("没有获取到数据");
    //       }
    //       const { user } = data;

    //       commit("SET_NAME", user);

    //       commit("SET_INTRODUCTION", "代理后台");
    //       resolve(data);
    //     })
    //     .catch(error => {
    //       reject(error);
    //     });
    // })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true })

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
