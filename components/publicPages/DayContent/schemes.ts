import * as yup from "yup";

export const dayEventSchema = yup.object().shape({
    date: yup.string().required("Required"),
    category: yup.number().required("Required"),
    serviceType: yup.number().required("Required"),
    saintType: yup.number().required("Required"),
    titles: yup.array().min(1).required("Required"),
    year: yup.string().required("Required"),
});