import { useMutation } from '@tanstack/react-query';
import api from '../Axios';

export const usePatchPointPolicyMutation = (policyId: number) => {
  return useMutation({
    mutationFn: async ({
      policyTitle,
      detail,
      quantity,
    }: {
      policyTitle: string;
      detail: string;
      quantity: number;
    }) => {
      const res = await api.patch(`/api/point/policy/${policyId}`, {
        policyTitle,
        detail,
        quantity,
      });
      return res.data.data;
    },
  });
};
