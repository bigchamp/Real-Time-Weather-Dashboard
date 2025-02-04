import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  cityName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  line: {
    height: 5,
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderColor: "gray",
    justifyContent: "center",
  },

  contentContainer: {
    gap: 15,
    paddingBottom: 20,
  },
  headerContainer: {
    paddingVertical: 15,
    marginBottom: 15,
  },
});

export default styles;
