import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "../../assets/icons/Index";
import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import ScreenWrapper from "../../components/ScreenWrapper";
import { theme } from "../../constants/theme";
import { useAuth } from "../../Contexts/AuthContext";
import { hp, wp } from "../../Helpers/Common";

const EditProfile = () => {
  const { user, setAuth } = useAuth();
   const router = useRouter();

  const onPickImage = () => {
    // Function to handle image picking
    // This can be implemented using ImagePicker or any other library
    console.log("Pick an image");
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
              uri={user?.image}
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
