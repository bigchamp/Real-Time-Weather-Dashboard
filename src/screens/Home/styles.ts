import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  weatherContainer: {
    alignItems: "center",
  },
  cityName: {
    fontSize: 30,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 60,
    fontWeight: "bold",
    marginTop: 10,
  },
  weatherCondition: {
    fontSize: 18,
    marginTop: 10,
    textTransform: "capitalize",
  },
  weatherCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summary: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  tempContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  temp: {
    fontSize: 16,
  },
  weatherInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#777",
    marginVertical: 2,
  },
});

export default styles;
