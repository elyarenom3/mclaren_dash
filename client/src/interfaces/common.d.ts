import { FieldValues, FormEventHandler } from 'react-hook-form';
import { CreateResponse, UpdateResponse, BaseRecord } from '@refinedev/core';

export interface CustomButtonProps {
    type?: string,
    title: string,
    backgroundColor: string,
    color: string,
    fullWidth?: boolean,
    icon?: ReactNode,
    disabled?: boolean,
    handleClick?: () => void
}

export interface ProfileProps {
    type: string,
    name: string,
    avatar: string,
    email: string,
    properties: Array | undefined
}

// export interface PropertyProps {
//     _id: string,
//     title: string,
//     description: string,
//     location: string,
//     price: string,
//     photo: string,
//     creator: string
// }

export interface DataProps {
    _id: string,
    title: string,
    description: string,
    datatype: string,
    location: string,
    formula: string,
    datafile: string,
    filename: string,
    creator: string
}

export interface FormProps {
    type: string,
    register: any,
    onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
    formLoading: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
    handleFileChange: (datafile) => void,
    onFinishHandler: (datafile: FieldValues) => Promise<void> | void,
    dataFile: { name: string, url: string },
    initialData?: FieldValues;
}

// export interface FormProps {
//     type: string,
//     register: any,
//     onFinish: (values: FieldValues) => Promise<void | CreateResponse<BaseRecord> | UpdateResponse<BaseRecord>>,
//     formLoading: boolean,
//     handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
//     handleImageChange: (file) => void,
//     onFinishHandler: (data: FieldValues) => Promise<void> | void,
//     propertyImage: { name: string, url: string },
// }
