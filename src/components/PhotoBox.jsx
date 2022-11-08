import {
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { Box } from "@mui/system";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const PhotoBox= (
    {imgRef,
    previewFn,
    previewImg,
    imgTag,
    imgName,
    fileSize,
    closeFn
    }
)=>{

    return (
        <>
       {previewImg? <Grid item tem xs={12} marginTop={2}>
                  {imgTag?  <img
                    src={previewImg}
                    alt="preview"
                    width="300px"
                  />: <video
                    src={previewImg}
                    alt="preview"
                    width="300px"
                  />}
                  <>
                    {imgName} ({fileSize})
                    <IconButton><CloseIcon onClick={closeFn}/></IconButton>
                  </>
                </Grid>: <Grid item xs={12} marginTop={2}>
                  <Box height="150px" fullWidth ref={imgRef} border={'1px dotted black'}>
                    <label htmlFor="fileUpload">
                      <Typography>
                        드래그하거나 클릭하여 업로드
                      </Typography>
                    </label>
                  </Box>
                  <TextField
                    fullWidth
                    id="fileUpload"
                    sx={{display: 'none'}}
                    label="photo *"
                    name="file"
                    type="file"
                    onChange={(e) => {
                      previewFn(e.target);
                    }}
                    variant="standard"
                    
                  />
                </Grid>}
        </>
    )
}

export default PhotoBox;