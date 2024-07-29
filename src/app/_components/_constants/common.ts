export const SidebarExample = [
  { id: '1', title: 'members', url: '/members' },
  { id: '2', title: '결과 통계', url: '/url2' },
  { id: '3', title: '패널티 관리', url: '/url3' },
];
export const AdminListResultSidebar = (id: number) => [
  { id: '1', title: '추첨 결과', url: `/admin/workation/list/${id}/result` },
  {
    id: '2',
    title: '결과 통계 및 페널티',
    url: `/admin/workation/list/${id}/result/penalty`,
   
  },
];
