<template>
  <el-card v-loading="loading">
    <div>
      <div style="text-align: left">
        <el-form :model="emailValidateForm" label-position="top" ref="emailValidateForm"
                 style="color:#20a0ff;font-size: 14px;">
          <el-form-item
            prop="email"
            label="开启博客评论通知"
            :rules="[{type: 'email', message: '请输入正确的邮箱'}]">
            <el-input type="email"  v-model.email="emailValidateForm.email"  auto-complete="off" style="width: 300px"
                      placeholder="请输入邮箱地址..."  size="mini"></el-input>
            <el-switch
			  v-model="commentFlag">
			</el-switch>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default{
    data() {
      return {
        emailValidateForm: {
          email: ''
        },
        commentFlag: false,
        loading: false
      }
    }
  }
</script>

<style>
</style>