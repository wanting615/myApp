export interface OrderBy {
  id: number;
  name: string;
}

export interface ClassifyTitle {
  type: number;
  name: string;
}

export const classifyTitles: Array<ClassifyTitle> = [
  {
    type: 1,
    name: '综合排序'
  },
  {
    type: 2,
    name: '分类'
  },
  {
    type: 3,
    name: '速度'
  },
  {
    type: 4,
    name: "全部筛选"
  }
]

//排序方式
export const orderByList: Array<OrderBy> = [
  {
    id: 1,
    name: '综合排序'
  },
  {
    id: 2,
    name: '距离最近'
  },
  {
    id: 3,
    name: '销量最好'
  },
  {
    id: 4,
    name: '起送价最低'
  },
  {
    id: 5,
    name: '配送最快'
  },
  {
    id: 6,
    name: '评分最高'
  },
]