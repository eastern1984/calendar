import { AxiosError } from "axios";
import { useGetAxiosRequests } from "../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKeys } from "../../interfaces/types";

export const useGetDayEventQuery = (DayEventNumber: string) => {
    const { getDayEvent } = useGetAxiosRequests();
    //  const { enqueueSnackbar } = useSnackbar();
    return useQuery([QueryKeys.DAY_EVENTS, DayEventNumber], () => getDayEvent(DayEventNumber), {
        onSuccess: () => { },
        onError: (error: AxiosError) => {
            //      enqueueSnackbar("Get DayEvents error", { variant: "error" });
        },
    });
};

export const useGetDayEventsQuery = (filter: string, page: number, limit: number) => {
    const { getDayEvents } = useGetAxiosRequests();
    //  const { enqueueSnackbar } = useSnackbar();

    return useQuery([QueryKeys.DAY_EVENTS], () => getDayEvents(filter, page, limit), {
        onSuccess: () => { },
        onError: (error: AxiosError) => {
            // enqueueSnackbar("Get DayEvents error", { variant: "error" });
        },
    });
};

export const useDeleteDayEventMutation = (DayEventNumber: string) => {
    // const { enqueueSnackbar } = useSnackbar();
    const { deleteDayEvent } = useGetAxiosRequests();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, any>(() => deleteDayEvent(DayEventNumber), {
        onSuccess: async () => await queryClient.invalidateQueries(QueryKeys.DAY_EVENTS),
        onError: (error: AxiosError) => {
            //          enqueueSnackbar("Delete DayEventS error", { variant: "error" });
        },
    });
};

export const useUpdateDayEventMutation = () => {
    //  const { enqueueSnackbar } = useSnackbar();
    const { putDayEvent } = useGetAxiosRequests();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, any>(putDayEvent as any, {
        onSuccess: async () => await queryClient.invalidateQueries(QueryKeys.DAY_EVENTS),
        onError: (error: AxiosError) => {
            //      enqueueSnackbar("Update DayEventS error", { variant: "error" });
        },
    });
};

export const useCreateDayEventMutation = () => {
    //  const { enqueueSnackbar } = useSnackbar();
    const { postDayEvent } = useGetAxiosRequests();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError, any>(postDayEvent as any, {
        onSuccess: async () => await queryClient.invalidateQueries(QueryKeys.DAY_EVENTS),
        onError: (error: AxiosError) => {
            //    enqueueSnackbar("Create DayEventS error", { variant: "error" });
        },
    });
};

