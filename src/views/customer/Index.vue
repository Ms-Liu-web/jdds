<template>
  <div>
    <!-- <contentTop /> -->

    <div class="app-container">
      <div class="title">
        <img src="../../assets/icon/icon12.png">
        <span>客服信息</span>
      </div>
      <div class="kf_msg">
        <span>是否显示已下信息</span>
        <el-radio-group v-model="form.kf_status">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="2">不显示</el-radio>
        </el-radio-group>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="base_box"
        label-width="160px"
        :hide-required-asterisk="true"
      >
        <el-form-item label="联系电话:" prop="kf_phone">
          <el-input
            v-model="form.kf_phone"
            placeholder="请设置当前软件唯一绑定ip"
          />
        </el-form-item>
        <el-form-item label="QQ号:" prop="kf_qq">
          <el-input v-model="form.kf_qq" placeholder="请设置当前软件名称" />
        </el-form-item>
        <el-form-item label="微信号:" prop="kf_wechat">
          <el-input v-model="form.kf_wechat" placeholder="请设置当前软件名称" />
        </el-form-item>
        <el-form-item label="微信二维码:">
          <div>
            <el-upload
              class="avatar-uploader"
              list-type="png/jpg/jpeg"
              action="https://api.apiyz.com/shop/admin/common/upload"
              :show-file-list="false"
              :on-success="bigAvatarSuccess"
              :before-upload="bigBeforeAvatarUpload"
              :headers="headerObj"
              name="image"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
        </el-form-item>
      </el-form>
      <div class="shure_btn">
        <el-button type="primary" @click="onSubmit('form')">确认保存</el-button>
      </div>
    </div>
    <!-- 保存成功提示框 -->
    <m-dialog width="400px" height="288px" :visible.sync="visible">
      <template v-slot:title>
        <img class="imgSize" src="../../assets/success-images/tc1.png" alt="">
      </template>
      <template v-slot:content>
        <p class="dialogContent">恭喜你,保存成功!</p>
      </template>
      <template v-slot:footer>
        <div class="dialogFooterBtn">
          <el-button
type="primary"
plain
@click="handleClick"
>我知道了</el-button>
        </div>
      </template>
    </m-dialog>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { configEdit, getUserConfig } from '@/api/agent'
export default {
  name: 'Seting',
  // components: { contentTop },
  directives: { waves },
  data() {
    return {
      visible: false,
      headerObj: {
        Authorization: ''
      },
      imageUrl: '',
      form: {
        kf_status: 1,
        kf_qq: '',
        kf_wechat: '',
        kf_phone: '',
        kf_wx_qrcode: ''
      },
      rules: {
        kf_qq: [
          { required: true, message: '请输入正确的qq号码', trigger: 'blur' },
          { min: 4, max: 13, message: '长度在 4 到 13 个字符', trigger: 'blur' }
        ],
        kf_wechat: [
          { required: true, message: '请输入正确的微信号码', trigger: 'blur' },
          { min: 4, max: 13, message: '长度在 4 到 13 个字符', trigger: 'blur' }
        ],
        kf_phone: [
          { required: true, message: '请输入正确的电话号码', trigger: 'blur' },
          { min: 4, max: 13, message: '长度在 4 到 13 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const header = JSON.parse(localStorage.getItem('userInfo'))
    this.getConfigInfo()
    this.headerObj.Authorization = header.token
  },
  methods: {
    // 获取基本参数
    async getConfigInfo() {
      const res = await getUserConfig()
      const data = res.data
      if (res.code === 200) {
        this.form.kf_status = data.kf_status
        this.form.kf_qq = data.kf_qq
        this.form.kf_phone = data.kf_phone
        this.form.kf_wx_qrcode = data.kf_wx_qrcode
      } else {
        this.$message({
          type: 'error',
          message: '获取信息失败'
        })
      }
    },
    // 图上传成功的回调
    bigAvatarSuccess(file, fileList) {
      this.imageUrl = URL.createObjectURL(fileList.raw)
      if (fileList.response.code === 200) {
        this.kf_wx_qrcode = fileList.response.data.imageUrl
      } else {
        this.$message({
          type: 'error',
          message: '图片上传失败'
        })
      }
    },
    // 图上传的信息验证
    bigBeforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 image/jpeg/png/jpg格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt1M
    },
    onSubmit(formName) {
      console.log(this.form.kf_status)
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await configEdit(this.form)
          if (res.code === 200) {
            this.visible = true
          }
        } else {
          return false
        }
      })
    },
    handleClick() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/custom.scss";
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
