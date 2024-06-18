import React, { useState } from 'react'
import { useGetIdentity } from '@refinedev/core'
import { FieldValues } from 'react-hook-form'
import { useForm } from '@refinedev/react-hook-form'
import { useNavigate } from 'react-router-dom'

import Form from '../components/common/Form'

type IIdentity = {
  id: number;
  fullName: string;
  email: string;
};

const CreateData = () => {
  const navigate = useNavigate();
  const {data: user} = useGetIdentity<IIdentity>();
  const [dataFile, setDataFile] = 
  useState({name: '', url: ''})
  const { refineCore: { onFinish, formLoading }, register, handleSubmit} = useForm();

  const handleFileChange = (datafile: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(datafile).then((result: string) => setDataFile({ name: datafile?.name, url: result }));
  };
  
  const onFinishHandler = async (data: FieldValues) => {
    if(!dataFile.name) return alert('Please select a file');
    
    await onFinish({ ...data, datafile: dataFile.url, email: user?.email })
  };
  
  return (
    <Form
    type='Create'
    register= {register}
    onFinish= {onFinish}
    formLoading= {formLoading}
    handleSubmit= {handleSubmit}
    handleFileChange = {handleFileChange}
    onFinishHandler = {onFinishHandler}
    dataFile= {dataFile}
    />
  )
}

export default CreateData