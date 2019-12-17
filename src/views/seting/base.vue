<template>
  <div class="app-container" style="width:750px">
      <div class="text-center" >
        基础设置
      </div>
      <br/>
      <br/>
      <el-form ref="form" :model="form" label-width="120px" >

        <el-form-item label="设置软件ip" >
          <el-input v-model="form.ip"></el-input>
        </el-form-item>
        <el-form-item label="设置软件名称">
          <el-input v-model="form.appname"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import waves from '@/directive/waves' // waves directive
import { setingUpdate,getInfo } from '@/api/user'

export default {
  name: 'seting',
  directives: { waves },
  data() {
    return {
      form: {
        ip:'',
        appname:''
      }
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getInfo().then(response => {
         console.log(response)
        this.form = {
          ip: response.data.ip,
          appname: response.data.custom_title
        }
      })
    },
    onSubmit(){
      setingUpdate(this.form).then(response => {
        this.$message({
          type: 'success',
          message: '操作成功'
        }); 
      })
    }
  }
}
</script>
