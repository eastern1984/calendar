import { AxiosError } from "axios";
import { useGetAxiosRequests } from "../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKeys } from "../../interfaces/types";

export const useGetDayContentQuery = (DayContentNumber: string) => {
    const { getDayContent } = useGetAxiosRequests();
    //  const { enqueueSnackbar } = useSnackbar();
    return useQuery([QueryKeys.DAY_CONTENT, DayContentNumber], () => getDayContent(DayContentNumber), {
        onSuccess: () => { },
        onError: (error: AxiosError) => {
            //      enqueueSnackbar("Get DayContents error", { variant: "error" });
        },
    });
};

export const useGetDayContentsQuery = (filter: string, page: number, limit: number) => {
    const { getDayContents } = useGetAxiosRequests();
    //  const { enqueueSnackbar } = useSnackbar();

    return useQuery([QueryKeys.DAY_CONTENT], () => getDayContents(filter, page, limit), {
        onSuccess: () => { },
        onError: (error: AxiosError) => {
            // enqueueSnackbar("Get DayContents error", { variant: "error" });
        },
    });
};

export const useDeleteDayContentMutation = (DayContentNumber: string) => {
    // const { enqueueSnackbar } = useSnackbar();
    const { deleteDayContent } = useGetAxiosRequests();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, any>(() => deleteDayContent(DayContentNumber), {
        onSuccess: async () => await queryClient.invalidateQueries(QueryKeys.DAY_CONTENT),
        onError: (error: AxiosError) => {
            //          enqueueSnackbar("Delete DayContentS error", { variant: "error" });
        },
    });
};

export const useUpdateDayContentMutation = () => {
    //  const { enqueueSnackbar } = useSnackbar();
    const { putDayContent } = useGetAxiosRequests();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, any>(putDayContent as any, {
        onSuccess: async () => await queryClient.invalidateQueries(QueryKeys.DAY_CONTENT),
        onError: (error: AxiosError) => {
            //      enqueueSnackbar("Update DayContentS error", { variant: "error" });
        },
    });
};

export const useCreateDayContentMutation = () => {
    //  const { enqueueSnackbar } = useSnackbar();
    const { postDayContent } = useGetAxiosRequests();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, any>(postDayContent as any, {
        onSuccess: async () => await queryClient.invalidateQueries(QueryKeys.DAY_CONTENT),
        onError: (error: AxiosError) => {
            //    enqueueSnackbar("Create DayContentS error", { variant: "error" });
        },
    });
};

