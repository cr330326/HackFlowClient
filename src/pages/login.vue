<template>
    <n-space vertical justify="center">
        <n-grid :x-gap="2" :y-gap="12" style="background-color: #0766AD; height: 100vh;" responsive="screen">
            <n-grid-item :offset="8">
                <n-card style="width: 600px; margin-top: 20vh;" title="资源管理平台" :bordered="false" size="huge" role="dialog"
                    aria-modal="true">
                    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
                        <n-form-item path="name">
                            <n-input v-model:value="formValue.name" type="text" placeholder="用户" />
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input v-model:value="formValue.password" type="password" show-password-on="mousedown" placeholder="密码" :maxlength="8" />
                        </n-form-item>
                        <n-form-item>
                            <n-button type="primary" style="width: 100%;" @click="login">登录</n-button>
                        </n-form-item>
                    </n-form>
                </n-card>
            </n-grid-item>
        </n-grid>
    </n-space>
</template>

<script lang="ts" setup>
import {
    FormInst,
    FormRules,
    createDiscreteApi
} from 'naive-ui';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { dialog } = createDiscreteApi(['dialog'])

const formRef = ref<FormInst | null>(null)
const formValue = reactive({
    name: '',
    password: ''
})


const rules: FormRules = {
    name: [
        {
            required: true,
            message: 'name is required'
        }
    ],
    password: [
        {
            required: true,
            message: 'Password is required'
        }
    ]
}

function login() {
    //获取表单数据来进行数据校验
    if(formValue.name === 'admin' && formValue.password === '123456'){
        //跳转到项目列表
        router.replace({ name: 'project' })
    }else{
        //提示错误
        dialog.error({
            title: '登录报错',
            content: '用户名或密码错误',
            onPositiveClick: () => {
                console.log('click positive')
            }
        })
    }
}
</script>

<style lang="less"></style>