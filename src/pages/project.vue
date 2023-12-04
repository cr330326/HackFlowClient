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
              <n-button type="primary" @click="checkFlow(ele.id)">查看项目</n-button>
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
const flashProjectList = new Subject<null>();
</script>

<script lang="ts" setup>
import { I_Project, I_Create_Project } from '@/comm/entity';
import { T_Page_query_res, deleteProject, getProjectList } from '@/comm/request';
import { createDiscreteApi } from 'naive-ui';
import { onBeforeUnmount, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import createProject, { openOrCloseCreateProjectDialog } from './dialog/createProject.vue';

const router = useRouter();
const pageData = reactive({
  tableData: {
    total: 0,
    pageNo: 0
  } as T_Page_query_res<I_Project>,
})


onMounted(async () => {
  console.log('project mounted');
  flashProjectList.next(null);
})

flashProjectList
  .subscribe(async () => {
    const { data: { data } } = await getProjectList({ offset: pageData.tableData.pageNo, size: 10 });
    const count = Math.ceil(data.total / data.pageSize);
    data.total = count < 0 ? 1 : count
    pageData.tableData = data;
  })


openOrCloseCreateProjectDialog.subscribe(async status => {
  if (!status) {
    pageData.tableData.pageNo = 1;
    flashProjectList.next(null)
  }
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
        const { data: { rsp_msg } } = await deleteProject({ id });
        message.success(rsp_msg);
        flashProjectList.next(null)
      } catch (error) {
        message.error(error)
      }
    },
    onNegativeClick: () => {
    }
  })

}

async function checkFlow(projectId: number) {
  router.push({ name: 'flow', query: { projectId } })
}

</script>
