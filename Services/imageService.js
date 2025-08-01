import { decode } from "base64-arraybuffer";
import * as FileSystem from 'expo-file-system';
import { supabase } from "../lib/Supabase";
export const getUserImageSrc = (imagePath) => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return require("../assets/images/Avatar.png");
  }
};

export const uploadImage = async (folderName, fileUri, isImage = true) => {
  try {
   let fileName = getFilePath(folderName,isImage)
   // We cannot send data in blob format we have to make it buffer
   const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64 // reading filr as base64 data
  }
   )

   //convert into array buffer
   let imageData = decode(fileBase64);
   let { data, error } = await supabase
      .storage
      .from('uploaded-files')
      .upload(fileName, imageData, {
      cacheControl: '3600',
      upsert: false, //create a new file everytimr we upload
        contentType: isImage ? 'images/*' : 'videos/*',
      })

      if (error) {
        console.log("Error uploading image", error);
        return { success: false, msg: error.message };
      }
       const { data: publicUrlData } = supabase
      .storage
      .from("uploaded-files")
      .getPublicUrl(fileName);
  console.log("Image uploaded successfully", data.path);
      return { success: true,  data: {
        path: fileName,
        publicUrl: publicUrlData.publicUrl,
      },};
  } catch (e) { 
    console.log("Error uploading image", e);
    return { success: false, msg: e.message };
  }
}

export const getFilePath = (folderName, isImage) => {
  const fileName = isImage ? `file_${Date.now()}.png` : `file_${Date.now()}.mp4`;
  return `${folderName}/${fileName}`;
}