import { AxiosError } from "axios";
import { useGetAxiosRequests } from "../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QueryKeys } from "../../interfaces/types";

export const useGetDayQuery = (year: string, month: string, day: string, enabled: boolean = true) => {
    const { getDayData } = useGetAxiosRequests();

    return useQuery([QueryKeys.DAY, year, month, day], () => getDayData(year, month, day), {
        enabled,
        onSuccess: () => { },
        onError: (error: AxiosError) => {
            //  enqueueSnackbar("Get accounts error", { variant: "error" });
        },
    });
};