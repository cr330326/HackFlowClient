<template>
    <n-space>
        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="large">
            <n-form-item path="name">
                <n-input v-model:value="formValue.name" type="text" placeholder="用户" />
            </n-form-item>
            <n-form-item path="password">
                <n-input type="password" show-password-on="mousedown" placeholder="密码" :maxlength="8"/>
            </n-form-item>
        </n-form>
        <n-button type="primary">登录</n-button>
        <template #password-visible-icon>
            <n-icon :size="16" :component="GlassesOutline" />
        </template>
        <template #password-invisible-icon>
            <n-icon :size="16" :component="Glasses" />
        </template>
    </n-space>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { GlassesOutline, Glasses } from '@vicons/ionicons5'
import {
    FormInst,
    FormRules
} from 'naive-ui'

export default defineComponent({
    setup() {
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

        return {
            formRef,
            formValue,
            rules,
            GlassesOutline,
            Glasses
        }
    }
})
</script>