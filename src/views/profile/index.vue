<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="24" :xs="24">
          <user-card :user="user" />
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import { getInfo } from '@/api/user'
export default {
  name: 'Profile',
  components: { UserCard },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  created() {
    this.getUser()
    
  },
  methods: {
    
    getUser() {
      getInfo().then(response => {
        this.user = {
          name: response.data.user,
          qq: response.data.qq,
          discount: response.data.discount,
          register_time: response.data.register_time,
          lock_ip: response.data.lock_ip,
          avatar: this.avatar
        }
        console.log(this.user)
      })
      
    }
  }
}
</script>
