import axios, { AxiosResponse } from 'axios';
import { I_Create_Project, I_Flow, I_Project } from './entity';

const instance = axios.create({
  baseURL: "http://127.0.0.1:40001/hack/api",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

instance.interceptors.response.use(function (value: AxiosResponse<T_Basic_rsp<any>>) {
  if (value?.data?.respCode !== 0) {
    return Promise.reject(value.data.respMsg)
  }
  return value;
});

export type T_Page_query = {
  offset: number,
  size: number
}


export type T_Basic_rsp<T> = {
  respCode: number,
  errorCode: string,
  respMsg: string,
  traceId: string,
  data: T
}

export type T_Page_query_res<T> = {
  records: T[],
  total: number,
  pageNo: number,
  pageSize: number
}

export type T_flow_page_query = {
  project_id: number
}

export async function getProjectList(data: T_Page_query) {
  type rsp = T_Basic_rsp<T_Page_query_res<I_Project>>
  return await instance.post<rsp>('/v1/project/page/list', data)
}

export async function createProject(data: I_Create_Project) {
  return await instance.post<T_Basic_rsp<string>>('/v1/project/upload/info', data);
}

export async function deleteProject(data: Pick<I_Project, 'id'>) {
  return await instance.delete<T_Basic_rsp<string>>('/v1/project/delete/'.concat(data.id.toString()) )
}

export async function getFlowList(data: T_flow_page_query) {
  type rsp = T_Basic_rsp<T_Page_query_res<I_Flow>>
  return await instance.post<rsp>('/flow/get_flow_list', data)
}