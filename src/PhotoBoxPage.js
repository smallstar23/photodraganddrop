import React, { useEffect, useRef, useState } from "react";
import PhotoBox from "./components/PhotoBox";


const PhotoBoxPage = ()=>{

const [file, setFile] = useState(null);
const [previewImg, setPreviewImg] = useState('');
const [imgName, setImgName]= useState('');
const [imgTag, setImgTag]= useState(false);
const [fileSize, setFileSize]= useState('');
  
const imgRef = useRef();

const getByteSize = (size) => {
    const byteUnits = ['KB', 'MB', 'GB', 'TB'];
  
    for (let i = 0; i < byteUnits.length; i++) {
      size = (size / 1024);
  
      if (size < 1024) return size.toFixed(1) + byteUnits[i];
    }
  };




const previewFn = (file) => {

    const target = file.files[0];
    console.log(target.type.split('/')[0])
 

    if (
      target.name.split('.')[1].toLowerCase() !== 'jpg' &&
      target.name.split('.')[1].toLowerCase() !== 'png' &&
      target.name.split('.')[1].toLowerCase() !== 'jpeg' &&
      target.name.split('.')[1].toLowerCase() !== 'mp4'
    ) {
      file.value = '';
      setPreviewImg('');
      return;
    }


    if(target.type.split('/')[0]==='image'){
      setImgTag(true)
      setFileSize(getByteSize(target.size))
    }else{
      setImgTag(false)
      setFileSize(getByteSize(target.size))
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file.files[0]);
    fileReader.onloadend = () => {
      const previewImgUrl = fileReader.result;
      setPreviewImg(previewImgUrl);
    };
  };


  useEffect(() => {
    function dragEnterFn (e){
      console.log('dragenter');
    }

    function dragoverFn(e){
      e.preventDefault();
      this.style.backgroundColor = '#dee2e6';
      this.style.border = '1px dotted #228be6';
    }

    function dragleaveFn (e){
      e.preventDefault();
      this.style.backgroundColor = '';
      this.style.border = '';
    }

    function dropFn(e){
      console.log('drop')
      e.preventDefault();

      this.style.backgroundColor = '';
      this.style.border = '';
      console.log(e.dataTransfer.files)
      previewFn(e.dataTransfer);
    }

    imgRef.current.addEventListener('dragenter', dragEnterFn);
    imgRef.current.addEventListener('dragover', dragoverFn);
    imgRef.current.addEventListener('dragleave', dragleaveFn);
    imgRef.current.addEventListener('drop', dropFn);
  }, [imgName]);


    // 사진 업로드된 사진 취소하기

    const closeFn= () =>{
        setPreviewImg('');
        setImgName('');
        setFile(null)
      }
    return (
        <>
        <PhotoBox
         imgRef={imgRef}
         previewFn={previewFn}
         closeFn={closeFn}
         previewImg={previewImg}
         fileSize={fileSize}
         imgTag={imgTag}
         imgName={imgName}

        />
        </>
    )
};

export default PhotoBoxPage;