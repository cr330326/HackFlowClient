<template>
    <n-space vertical justify="center">
        <n-grid :x-gap="2" :y-gap="12" style="background-color: #0766AD; height: 100vh;" responsive="screen">
            <n-grid-item :offset="8">
                <n-card style="width: 600px; margin-top: 20vh;" title="创建项目" :bordered="false" size="huge" role="dialog"
                    aria-modal="true">
                    <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
                        <n-form-item path="name">
                            <n-input v-model:value="formValue.name" type="text" placeholder="用户" />
                        </n-form-item>
                        <n-form-item path="password">
                            <n-input type="password" show-password-on="mousedown" placeholder="密码" :maxlength="8" />
                        </n-form-item>
                        <n-form-item>
                            <n-button type="primary" style="width: 100%;" @click="login">登录</n-button>
                            <template #password-visible-icon>
                                <n-icon :size="16" :component="GlassesOutline" />
                            </template>
                            <template #password-invisible-icon>
                                <n-icon :size="16" :component="Glasses" />
                            </template>
                        </n-form-item>
                    </n-form>
                </n-card>
            </n-grid-item>
        </n-grid>
    </n-space>
</template>

<script lang="ts" setup>
import { Glasses, GlassesOutline } from '@vicons/ionicons5';
import {
    FormInst,
    FormRules
} from 'naive-ui';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function login() {
    router.replace({ name: 'project' })
}

const formRef = ref<FormInst | null>(null)
const formValue = reactive({
    name: ''
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
</script>

<style lang="less"></style>