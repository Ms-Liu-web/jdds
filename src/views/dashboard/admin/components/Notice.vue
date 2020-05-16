<template>
  <div>
    <div class="notice_content">
      <div class="title">
        <img src="../../../../assets/icon/icon12.png" />
        <span>公告列表</span>
      </div>
      <ul>
        <li v-for="(list , index ) in noticedata" :key="index">
          <span></span>
          {{list.notice}}
        </li>
      </ul>
      <div v-if="noticedata.length == '0' " class="noticeKong">暂无数据</div>
    </div>
  </div>
</template>

<script>
import { getNotice } from "@/api/agent";
export default {
  data() {
    return {
      noticedata: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      getNotice().then(response => {
        this.noticedata = response.data;
        console.log(this.noticedata);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.notice_content {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 6px 0px rgba(186, 186, 186, 0.22);
  border-radius: 8px 0px 0px 8px;
  .noticeKong {
    text-align: center;
    line-height: 50px;
    color: #666;
  }
  .title {
    margin: 0 23px;
    height: 47px;
    line-height: 47px;
    border-bottom: 1px #dce7ff dashed;
    margin-bottom: 13px;
    color: #3c70d5;
    img {
      position: relative;
      top: 2px;
    }
  }
  ul li {
    margin: 0 12px 0 42px;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #f0f0f0 dashed;
    font-size: 14px;
    color: #666;
    list-style: none;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    span {
      width: 8px;
      height: 8px;
      background: rgba(60, 112, 213, 1);
      opacity: 0.5;
      border-radius: 50%;
      display: inline-block;
      margin-right: 5px;
      position: relative;
      top: -2px;
    }
  }
}
</style>
