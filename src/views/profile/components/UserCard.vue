<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>

    <div class="user-profile">
      <div class="user-bio">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
        </pan-thumb>
      </div>
      <div class="user-bio">
        <div class="user-name ">{{ user.name }}</div>
      </div>
    </div>

    <div class="user-bio">
      <el-form>
          <el-form-item label="账号">
            <el-input v-model.trim="user.name" disabled />
          </el-form-item>
          <el-form-item label="代理折扣">
            <el-input v-model.trim="user.discount" disabled />
          </el-form-item>
          <el-form-item label="注册时间">
            <el-input v-model.trim="user.register_time" disabled />
          </el-form-item>
          <el-form-item label="锁定ip">
            <el-input v-model.trim="user.lock_ip" disabled />
          </el-form-item>
      </el-form>

      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"></div>
        <div class="user-bio-section-body">
          <div class="text-center">
            欢迎使用Annaer系统
          </div>
        </div>
      </div>
      
    </div>
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          roles: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
