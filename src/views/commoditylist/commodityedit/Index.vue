<template>
  <div>
    <!-- <contentTop /> -->

    <div class="app-container">
      <div class="title">
        <img src="../../../assets/icon/icon12.png">
        <!-- <span>编辑</span> -->
        <span v-if="goodsId.id">编辑商品信息</span>
        <span v-else>添加商品</span>
        <!-- 表单内容 -->
      </div>
      <div class="formContainer">
        <el-form
          ref="addForm"
          inline
          :model="addForm"
          :rules="addrules"
          label-width="200px"
        >
          <!-- 商品标题 -->
          <el-form-item label="商品标题：" prop="title">
            <el-input
              v-model="addForm.title"
              class="inputWidth"
              placeholder="请输入商品标题"
            />
          </el-form-item>
          <!-- 第三方商品id -->
          <el-form-item label="第三方商品id：" prop="item_id">
            <el-input
              v-model.number="addForm.item_id"
              placeholder="请输入第三方id"
            />
          </el-form-item>
          <!-- 佣金率 -->
          <el-form-item label="佣金率：" prop="commission_rate">
            <el-input
              v-model.number="addForm.commission_rate"
              placeholder="请输入佣金率，单位为：万分之"
            />
          </el-form-item>
          <!-- 平台 -->
          <el-form-item label="平台" prop="type">
            <el-select
              v-model="addForm.type"
              placeholder="请选择"
              @change="typeHandle"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <!-- 类型 -->
          <el-form-item label="分类" prop="category_id">
            <el-select v-model="addForm.category_id" placeholder="请选择">
              <el-option
                v-for="item in goodsCateList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!--主图片  -->
          <el-form-item label="主图片：">
            <template>
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
            </template>
          </el-form-item>
          <!-- 缩略图 -->
          <el-form-item label="缩略图：" class="smallPhoto">
            <template>
              <el-upload
                class="avatar-uploader"
                list-type="png/jpg/jpeg"
                action="https://api.apiyz.com/shop/admin/common/upload"
                :show-file-list="false"
                :on-success="smallAvatarSuccess"
                :before-upload="smallBeforeAvatarUpload"
                :headers="headerObj"
                name="image"
              >
                <img v-if="smallImageUrl" :src="smallImageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </template>
          </el-form-item>
          <!-- 价格 -->
          <el-form-item label="价格：" prop="price">
            <el-input v-model.number="addForm.price" placeholder="请输入价格" />
          </el-form-item>
          <!-- 推荐按理由 -->
          <el-form-item label="推荐理由：">
            <div class="costomAddDesciption">
              <el-input
                v-model="addForm.description"
                type="textarea"
                placeholder="请输入理由"
              />
            </div>
          </el-form-item>
          <!-- 详情 -->
          <el-form-item label="详情：" prop="info">
            <div class="constomAddInfo">
              <el-input
                v-model="addForm.info"
                type="textarea"
                placeholder="请输入详情"
              />
            </div>
          </el-form-item>
          <!-- 30天销售总量 -->
          <el-form-item label="30天销售总量：" prop="sale_totals">
            <el-input
              v-model="addForm.sale_totals"
              placeholder="30天销售总量"
            />
          </el-form-item>
          <!-- 优惠卷面额 -->
          <el-form-item label="优惠卷面额：" prop="coupon_amount">
            <el-input
              v-model="addForm.coupon_amount"
              placeholder="请输入优惠券面额"
            />
          </el-form-item>
          <!-- 优惠券开始时间 -->
          <el-form-item label="优惠券开始时间：" prop="coupon_start_time">
            <!-- <el-input
              v-model="addForm.coupon_start_time"
              placeholder="请输入优惠开始时间"
            /> -->
            <el-date-picker
              v-model="addForm.coupon_start_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              default-time="12:00:00"
            />
          </el-form-item>
          <!-- 优惠券结束时间 -->
          <span class="goodAddCoupon">
            <el-form-item label="优惠券结束时间：" prop="coupon_end_time">
              <el-date-picker
                v-model="addForm.coupon_end_time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                default-time="12:00:00"
              />
            </el-form-item>
          </span>
          <!-- 优惠券url -->
          <el-form-item label="优惠券url：" prop="coupon_url">
            <el-input
              v-model="addForm.coupon_url"
              placeholder="请输入优惠券url"
            />
          </el-form-item>
          <!-- 优惠券总量 -->
          <el-form-item label="优惠券总量：" prop="coupon_total_count">
            <el-input
              v-model="addForm.coupon_total_count"
              placeholder="请输入优惠券总量"
            />
          </el-form-item>
          <!-- 优惠券剩余量 -->
          <el-form-item label="优惠券剩余量：" prop="coupon_remain_count">
            <el-input
              v-model="addForm.coupon_remain_count"
              placeholder="请输入优惠券剩余量"
            />
          </el-form-item>
          <!-- 展示位置 -->
          <div>
            <el-form-item label="展示位置：">
              <el-radio-group v-model="place" @change="placeHandle">
                <el-radio label="精选" />
                <el-radio label="热门搜索" />
                <el-radio label="详情页推荐" />
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- 排序 -->
          <div>
            <el-form-item label="排序：">
              <el-input
                v-model.number="addForm.order_num"
                placeholder="请输入0-100之间的排序值，值越大越靠前"
              />
            </el-form-item>
          </div>
          <div class="constomAddBtn">
            <el-button
type="primary"
@click="submitForm('addForm')"
>立即创建</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves'
import { getGoodsCate, getGoodsAdd, getGoodsInfo } from '@/api/agent'
export default {
  name: 'GoodsAdd',
  // components: { contentTop },
  directives: { waves },
  data() {
    return {
      options: [
        {
          value: 1,
          label: '淘宝'
        },
        {
          value: 3,
          label: '拼多多'
        },
        {
          value: 2,
          label: '京东'
        }
      ],
      goodsId: {
        id: ''
      },
      goodsType: [],
      imageUrl: '',
      smallImageUrl: '',
      place: '精选',
      headerObj: {
        Authorization: ''
      },
      addForm: {
        title: '',
        item_id: '',
        commission_rate: '',
        category_name: '',
        category_id: '',
        type: 1,
        price: '',
        description: '',
        info: '',
        sale_totals: '',
        coupon_amount: '',
        coupon_start_time: '',
        coupon_end_time: '',
        coupon_url: '',
        coupon_total_count: '',
        coupon_remain_count: '',
        place: 1,
        order_num: '',
        images: '',
        small_images: ''
      },
      addrules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        item_id: [
          { required: true, message: '请输入第三方id', trigger: 'blur' }
        ],
        commission_rate: [
          {
            required: true,
            message: '请输入佣金比例，单位为万分之',
            trigger: 'blur'
          }
        ],
        type: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        category_id: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        price: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        info: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        coupon_amount: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        coupon_start_time: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 25, message: '请选择日期', trigger: 'blur' }
        ],
        coupon_end_time: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 25, message: '请选择日期', trigger: 'blur' }
        ],
        coupon_total_count: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        coupon_remain_count: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      goodsCateList: []
    }
  },
  created() {
    const infoId = this.$route.params.id.slice(1)
    this.goodsId.id = infoId
    this.goodsInfo(infoId)
    const header = JSON.parse(localStorage.getItem('userInfo'))
    this.headerObj.Authorization = header.token
  },
  methods: {
    // 获取商品信息
    async goodsInfo(infoId) {
      if (infoId) {
        const res = await getGoodsInfo(this.goodsId)
        console.log(res)
        if (res.code === 200) {
          this.addForm.title = res.data.title
          this.addForm.item_id = res.data.itemId
          this.addForm.commission_rate = res.data.commissionRate
          this.addForm.type = res.data.type
          this.GoodsCate(this.addForm.type)
          this.addForm.price = res.data.price
          this.addForm.description = res.data.description
          this.addForm.info = res.data.info
          this.addForm.sale_totals = res.data.sale_totals
          this.addForm.coupon_start_time = res.data.couponStartTime
          this.addForm.coupon_end_time = res.data.couponEndTime
          this.addForm.coupon_total_count = res.data.couponTotalCount
          this.addForm.coupon_remain_count = res.data.couponRemainCount
          this.addForm.place = res.data.place
          this.addForm.order_num = res.data.order_num
          this.addForm.images = res.data.images
          this.addForm.small_images = res.data.smallImages
          this.addForm.coupon_url = res.data.couponUrl
          this.addForm.coupon_amount = res.data.couponAmount
          this.addForm.category_id = res.data.categoryId
          this.addForm.category_name = res.data.categoryName
        }
      } else {
        // this.GoodsCate(this.addForm.type)
      }
    },
    // 展示位置选项
    placeHandle() {
      if (this.place === '精选') {
        this.addForm.place = 1
      } else if (this.place === '热门搜索') {
        this.addForm.place = 2
      } else if (this.place === '请求页推荐') {
        this.addForm.place = 3
      }
    },
    typeHandle() {
      this.GoodsCate(this.addForm.type)
    },
    // 获取商品类型
    async GoodsCate(id) {
      const cateTypeId = { type: id }
      const res = await getGoodsCate(cateTypeId)
      if (res.code === 200) {
        alert(33)
        this.goodsCateList = res.data
        this.addForm.category_category_name = res.data[0].name
      }
    },
    // 大图上传成功的回调
    bigAvatarSuccess(file, fileList) {
      this.imageUrl = URL.createObjectURL(fileList.raw)

      if (fileList.response.code === 200) {
        // this.addForm.images = `//${fileList.response.data.imageUrl}`
        this.addForm.images = fileList.response.data.imageUrl
      } else {
        this.$message({
          type: 'error',
          message: '主图片上传失败'
        })
      }
    },
    // 大图上传的信息验证
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
    // 缩略图上传成功的回调函数
    smallAvatarSuccess(file, fileList) {
      this.smallImageUrl = URL.createObjectURL(fileList.raw)
      if (fileList.response.code === 200) {
        // this.addForm.small_images = `//${fileList.response.data.imageUrl}`
        this.addForm.small_images = fileList.response.data.imageUrl
      } else {
        this.$message({
          type: 'error',
          message: '缩略图上传失败'
        })
      }
    },
    // 缩略图上传的信息验证
    smallBeforeAvatarUpload(file) {
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
    // 提交添加表单
    submitForm(form) {
      console.log(this.addForm)
      this.$refs[form].validate(async valid => {
        if (valid) {
          const res = await getGoodsAdd(this.addForm)
          if (res.code === 200) {
            this.$router.push('/shop/list')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/constomgoods.scss";
</style>
