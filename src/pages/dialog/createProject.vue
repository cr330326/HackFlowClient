<template>
  <div>
    <n-modal v-model:show="showModal" :auto-focus="true" :close-on-esc="true" :on-after-leave="drop">
      <n-card style="width: 600px" title="创建项目" :bordered="false" size="huge" role="dialog" aria-modal="true">

        <n-form ref="formRef" :label-width="80" :model="formValue" :rules="rules" size="medium">
          <n-form-item label="项目名称" path="name">
            <n-input v-model:value="formValue.projectName" placeholder="输入项目名称" />
          </n-form-item>
          <n-form-item label="类型" path="type">
            <n-input v-model:value="formValue.projectType" placeholder="输入类型" />
          </n-form-item>
          <n-form-item label="开始日期" path="startDate">
            <n-input v-model:value="formValue.startDate" placeholder="输入开始日期" />
          </n-form-item>
          <n-form-item label="结束日期" path="endDate">
            <n-input v-model:value="formValue.endDate" placeholder="输入结束日期" />
          </n-form-item>
          <n-form-item label="图片地址" path="thumbUrl">
            <n-input v-model:value="formValue.thumbUrl" placeholder="输入图片地址" />
          </n-form-item>
          <n-form-item label="资源地址" path="fileUrl">
            <n-input v-model:value="formValue.fileUrl" placeholder="输入资源地址" />
          </n-form-item>
        </n-form>

        <template #footer>
          <n-space>
            <n-button type="primary" @click="handCreateProject" v-if="isCreate">确认</n-button>
            <n-button type="error" @click="handCancel">取消</n-button>
          </n-space>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts">
import { Subject } from 'rxjs'
export const openOrCloseCreateProjectDialog = new Subject<{statu:boolean, id:number}>();
</script>

<script lang="ts" setup>
import { I_Create_Project } from '@/comm/entity';
import { createProject, getProjectDetail } from '@/comm/request';
import { FormInst,createDiscreteApi } from 'naive-ui';
import { onBeforeUnmount, reactive, ref, } from 'vue';
import { flashProjectList } from '@/pages/project.vue';

const formRef = ref<FormInst | null>(null)
const showModal = ref(false)
const isCreate = ref(false);

openOrCloseCreateProjectDialog.subscribe(async modalStatus => {
  showModal.value = modalStatus.statu
  console.log(modalStatus);
  if (modalStatus.id > 0){
    isCreate.value = false  ;
    await initFLowData(modalStatus.id);
  }else{
    isCreate.value = true;
  }

})

const formValue = reactive<I_Create_Project>({
  projectName: '',
  projectCode: '008',
  projectType: 1,
  startDate: '',
  endDate: '',
  thumbUrl: '',
  format: 1,
  fileUrl: '',
  fileMd5: '',
  version: '1.0.0',
  desc: ''
})

const rules = reactive({
  name: {
    required: true,
    message: '请输入项目名称',
    trigger: 'blur'
  },
  type: {
    required: true,
    message: '请输入类型',
    trigger: 'blur'
  },
  startDate: {
    required: true,
    message: '请输入开始日期',
    trigger: 'blur'
  },
  endDate: {
    required: true,
    message: '请输入结束日期',
    trigger: 'blur'
  },
  thumbUrl: {
    required: false,
    message: '请输入图片地址',
    trigger: 'blur'
  },
  fileUrl: {
    required: true,
    message: '请输入资源地址',
    trigger: 'blur'
  }
})


onBeforeUnmount(() => {

})


async function initFLowData(id:number) {
  if(!id) return;
  const { data: { data } } = await getProjectDetail({ id });
  formValue.projectName = data.name;
  formValue.projectType = data.type;
  formValue.startDate = data.startDate;
  formValue.endDate = data.endDate;
  formValue.thumbUrl = data.thumbUrl;
  formValue.fileUrl = data.fileUrl;
}

async function handCreateProject() {
  if (isCreate.value) {
    const { message } = createDiscreteApi(['message']);
    try {
      await createProject(formValue);
      message.success('创建项目成功!');
      flashProjectList.next(null);
      showModal.value = false;
    } catch (error) {
      message.error(error)
    }
  }
}

function handCancel() {
  drop()
  openOrCloseCreateProjectDialog.next({statu:false, id:-1})
}

function drop() {
  formValue.projectName = '';
  formValue.projectType = 1
  formValue.startDate = '';
  formValue.endDate = '';
  formValue.thumbUrl = '';
  formValue.fileUrl = '';
}

</script>