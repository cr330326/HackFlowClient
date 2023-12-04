interface I_Basic_Entity {
  id: number
}

export interface I_Project extends I_Basic_Entity {
  name: string,
  code: string,
  type: number,
  startDate: string,
  endDate: string,
  thumbUrl: string,
  format: number,
  fileUrl: string,
  fileMd5: string,
  version: string,
  desc: string
}

export interface I_Flow extends I_Basic_Entity, Pick<I_Project, 'name'> {
  shell_str: string
}

export interface I_Create_Project {
  projectName: string,
  projectCode: string,
  projectType: number,
  startDate: string,
  endDate: string,
  thumbUrl: string,
  format: number,
  fileUrl: string,
  fileMd5: string,
  version: string,
  desc: string
}