import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "../../assets/icons/Index";
import Avatar from "../../components/Avatar";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Input from "../../components/Input";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { useAuth } from "../../Contexts/AuthContext";
import { hp, wp } from "../../Helpers/Common";
import { uploadImage } from "../../Services/imageService";
import { updateUserData } from "../../Services/userService";

const EditProfile = () => {
  const { user, setUserData } = useAuth();
   const router = useRouter();


   const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [location, setLocation] = useState(user?.address || "");
  const [image, setImage] = useState(user?.image || "");

  const [loading, setLoading] = useState(false);
  const onPickImage =async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.6,
    });
    if (!res.canceled) {
      setImage(res.assets[0]);
    } 
    console.log("Pick an image");
  }

  const onSubmit = async () => {
    if(!name || !phone || !location || !bio || !image) {
      Alert.alert("Please fill all the fields");
      return;
    }
let finalImageUrl = image; 
    if(typeof image == "object") {
      let imageRes = await uploadImage("user-images", image.uri,true);
      if(imageRes.success) {
        console.log("first", imageRes.data);
       finalImageUrl = imageRes.data.publicUrl; // ✅ public URL
   }
      else{
        Alert.alert("Error uploading image", imageRes.msg);
        return;
      }
    }
    console.log("first imagefdhsjfd ", finalImageUrl);  
    setLoading(true);
    const res = await updateUserData(user.id, {name:name, phoneNumber: phone, bio: bio, address: location, image: finalImageUrl})
    setLoading(false);
    if(res.success) {
    setUserData({
  ...user,
  name,
  phoneNumber: phone,
  bio,
  address: location,
  image:finalImageUrl
});  router.back();
    }
    console.log(res)
  }
  return (
    <ScreenWrapper bg={"white"}>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
    <Header title={"Edit Profile"} showButton={true} mb={20} />

    {/* form same as profile */}
    <View style={styles.form}>
       <View style={styles.avatarContainer}>
            <Avatar
              uri={typeof image === 'object' ? image.uri : image}
              size={hp(18)}
              rounded={theme.radius.xxl * 3.4}
              style={styles.avatar}
            />
            <Pressable
              style={styles.editIcon}
              onPress={onPickImage}
            >
              <Icon name="image" strokeWidth={2.5} size={20} />
            </Pressable>
          </View>

          <Text style={{fontSize:hp(1.5), color: theme.colors.text}} >
            Please fill in the details below to update your profile.
          </Text>
    {/* <View style={{}}> */}

        <Input
            icon={
              <Icon
              name="user"
              color={theme.colors.textLight}
              strokeWidth={1.6}
              />
            }
            placeholder="Enter Name"
            value={name}
            onChangeText={(val) => setName(val)}
            
            />

            {/* </View> */}
       
             <Input
            icon={
              <Icon
              name="call"
              color={theme.colors.textLight}
              strokeWidth={1.6}
              />
            }
             placeholder="Enter Phone Number"
            value={phone}
            onChangeText={(val) => setPhone(val)}
            
            />
             <Input
            icon={
              <Icon
              name="location"
              color={theme.colors.textLight}
              strokeWidth={1.6}
              />
            }
            placeholder="Enter Location"
            value={location}
            onChangeText={(val) => setLocation(val)}
            
            />
             <Input
            placeholder="Enter Bio"
            value={bio}
            multiline={true}
            containerStyle={styles.bio}
            onChangeText={(val) => setBio(val)}
            
            />

            {/* button */}
            <Button title={'Update'} loading={loading} onPress={onSubmit} />

      </View>
        </ScrollView>
        </View>
    </ScreenWrapper>
    
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  
  container:{
    flex: 1,
    paddingHorizontal: wp(4),
  },



 avatarContainer: {
    // height: hp(12),
    // width: hp(12),
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },

  form:{
    gap:18,
    marginTop: 20,
  },

  input:{
    flexDirection: "row",
    borderWidth:0.4,
    borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        borderCurve: "continuous",
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },
  bio:{
    flexDirection: "row",
    height: hp(15),
    alignItems: "flex-start",
    paddingVertical: 15,
  }

});
