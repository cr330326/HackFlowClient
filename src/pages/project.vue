<template>
  <n-space vertical>
    <n-button type="primary" @click='onCarateProject'>创建项目</n-button>

    <n-table :bordered="true" :single-line="false" striped>
      <thead>
        <tr>
          <th style="width: 10px;">id</th>
          <th style="width: 50px;">项目名称</th>
          <th style="width: 20px;">类型</th>
          <th style="width: 80px;">开始日期</th>
          <th style="width: 80px;">结束日期</th>
          <th style="width: 100px;">图片地址</th>
          <th style="width: 100px;">资源地址</th>
          <th style="width: 20px;">版本号</th>
          <th style="width: 100px;">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ele, index) in pageData.tableData.records" :key="index">
          <td>{{ ele.id }}</td>
          <td>{{ ele.name }}</td>
          <td>{{ ele.type }}</td>
          <td>{{ ele.startDate }}</td>
          <td>{{ ele.endDate }}</td>
          <td>{{ ele.thumbUrl }}</td>
          <td>{{ ele.fileUrl }}</td>
          <td>{{ ele.version }}</td>
          <td>
            <n-space>
              <n-button type="primary" @click="editProject(ele.id)">查看项目</n-button>
              <n-button type="error" @click="delProject(ele.id)"> 删除项目</n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>
    <n-pagination v-model:page="pageData.tableData.pageNo" :page-count="pageData.tableData.total"
      :on-update:page="pageUpdate" />

    <createProject />

  </n-space>
</template>

<script lang="ts">
import { Subject } from 'rxjs';
// 在这里定义并导出subject。指定约束为null
export const flashProjectList = new Subject<null>();
</script>

<script lang="ts" setup>
import { I_Project, I_Create_Project } from '@/comm/entity';
import { T_Page_query_res, deleteProject, getProjectList } from '@/comm/request';
import { createDiscreteApi } from 'naive-ui';
import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import createProject, { openOrCloseCreateProjectDialog } from './dialog/createProject.vue';
import { Flow_Status } from '@/comm';

const router = useRouter();
const pageData = reactive({
  tableData: {
    total: 0,
    pageNo: 0
  } as T_Page_query_res<I_Project>,
})


onMounted(async () => {
  console.log('project mounted');
  // 在组件挂载的时候 通过调用next 方法来触发事件。签名值为null，所以这里传null
  flashProjectList.next(null);
})

// 获取列表订阅 flashProjectList subject，在flashProjectList 这个subject 产生事件时会发送请求
const flashSubscribe =  flashProjectList
  .subscribe(async () => {
     console.log('flashSubscrib subscribe start');
    const { data: { data } } = await getProjectList({ offset: pageData.tableData.pageNo, size: 10 });
    const count = Math.ceil(data.total / data.pageSize);
    data.total = count < 0 ? 1 : count
    pageData.tableData = data;
  })


const openOrCloseCreateProjectDialogSub = openOrCloseCreateProjectDialog.subscribe(async status => {
  if (!status) {
    pageData.tableData.pageNo = 1;
    flashProjectList.next(null)
  }
})

onBeforeUnmount(() => {
  flashSubscribe.unsubscribe()
  openOrCloseCreateProjectDialogSub.unsubscribe()
})


function onCarateProject() {
  openOrCloseCreateProjectDialog.next(true)
}

async function pageUpdate(page: number) {
  pageData.tableData.pageNo = page;
  flashProjectList.next(null)
}

async function delProject(id: number) {
  const { message, dialog } = createDiscreteApi(['message', 'dialog'])
  dialog.error({
    title: '警告',
    content: '你确定删除当前项目？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        const { data: { respMsg } } = await deleteProject({ id });
        message.success(respMsg);
        flashProjectList.next(null)
      } catch (error) {
        message.error(error)
      }
    },
    onNegativeClick: () => {
    }
  })

}

async function editProject(projectId: number) {
  //router.push({ name: 'createFlow', query: { projectId } })
  router.push({ name: 'createProject', query: { status: Flow_Status.EDIT, projectId: projectId } })
}

</script>
