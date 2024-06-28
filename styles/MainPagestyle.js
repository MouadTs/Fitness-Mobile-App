import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#1f1f1f', // Dark background for better contrast
    height: '100%',
  },
  suggestText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "AppleSDGothicNeo-Light",
    fontWeight: "700",
    marginTop: 10,
    marginLeft: 15,
    alignSelf: "flex-start",
  },
  workoutPrograms: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "AppleSDGothicNeo-Light",
    fontWeight: "700",
    marginLeft: 15,
    alignSelf: "flex-start",
    marginTop: 10,
    marginBottom: 10,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(30, 30, 34, 0.7)", // Slightly opaque for better visibility
    paddingBottom: 20,
    paddingTop: 10,
    height: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  footerButton: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  footerButtonText: {
    fontSize: 14,
    color: "#fff",
  },
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
  },
  seeAll: {
    color: "#63c138",
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 10,
  },
  typeContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  typeButtonText: {
    color: "gray",
  },
  selectedTypeButton: {
    backgroundColor: "#63c138",
    borderColor: "green",
  },
  scrolledPrograms: {
    alignItems: "center",
    paddingBottom: 150,
  },
});
