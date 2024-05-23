import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Modal, Alert } from "react-native";
import { Fontisto, SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import CustomProgressBar from "./CustomProgressBar";
import axios from "axios";
import { UserContext } from "./Context/UsernameContext";
import config from "../Backend/config";

const SetDescriptionCard = ({ exerciseSet }) => {
  return (
    <View style={styles.setDescriptionContainer}>
      <ImageBackground
        style={styles.setDescriptionBackground}
        source={exerciseSet.image}
      />
    </View>
  );
};

const ExerciseList = ({ route }) => {
  const { exerciseSet } = route.params;
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [progress, setProgress] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isSetFinished, setIsSetFinished] = useState(false);
  const { userId, setCaloriesburned } = useContext(UserContext);

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
        );
        const data = await response.json();
        const filtered = data.filter(
          (exercise) =>
            exercise.level.toLowerCase() === exerciseSet.diff.toLowerCase() &&
            (exercise.primaryMuscles.includes(exerciseSet.name.toLowerCase()) ||
              exercise.secondaryMuscles.includes(exerciseSet.name.toLowerCase()))
        );
        setFilteredExercises(filtered.slice(0, 10));
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchExerciseData();
  }, [exerciseSet]);

  useEffect(() => {
    if (timerActive) {
      const timerId = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
          setProgress((prevProgress) => prevProgress + 1 / 120); // Adjust based on the total time
        } else {
          handleNextpress();
        }
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timerActive, timer]);

  const startTimer = () => {
    setTimerActive(true);
  };

  const pauseTimer = () => {
    setTimerActive(!timerActive);
  };

  const resetTimer = () => {
    setTimer(120); // Reset timer to 2 minutes
    setProgress(0); // Reset progress
    setTimerActive(false);
  };

  const startSet = async () => {
    resetTimer();
    setModalVisible(true);
    startTimer();
    
    // Call API to send exercise date
    try {
      const response = await axios.post(`${config.apiBaseUrl}/auth/addExerciseDate`, { userId });
      console.log("Exercise date added successfully: ", response.data.exerciseDates);
    } catch (error) {
      console.error("Error adding exercise date: ", error);
    }
  };

  const handleNextpress = () => {
    const newIndex = currentExerciseIndex + 1;
    if (newIndex < filteredExercises.length) {
      setCurrentExerciseIndex(newIndex);
      resetTimer();
      startTimer();
    } else {
      setIsSetFinished(true);
      Alert.alert('Set is finished');
      sendCaloriesToDatabase();
    }
  };

  const handlePreviousPress = () => {
    const newIndex = currentExerciseIndex - 1;
    if (newIndex >= 0) {
      setCurrentExerciseIndex(newIndex);
      resetTimer();
      startTimer();
    }
  };

  const sendCaloriesToDatabase = async () => {
    if (!exerciseSet.calories) {
      Alert.alert('No calories data available');
      return;
    }

    try {
      const calories = exerciseSet.calories;
      setCaloriesburned(exerciseSet.calories);
      const response = await axios.post(`${config.apiBaseUrl}/auth/Calories`, { userId, calories });
      console.log(response.data);
      console.log(exerciseSet.calories);
      if (response.data && response.data.calories !== undefined) {
        console.log("Calories sent successfully: ", response.data.calories);
        setCaloriesburned(response.data.calories);
      } else {
        console.log("Calories response missing calories data.");
      }
    } catch (error) {
      console.error('Error sending calories:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
      <SetDescriptionCard exerciseSet={exerciseSet} />
      <View style={styles.contentWrapper}>
        <View style={styles.setDescriptionButtonContainer}>
          <TouchableOpacity style={styles.setDescriptionButton}>
            <Fontisto name="stopwatch" size={24} color="white" />
            <Text style={styles.setDescriptionButtonText}> {exerciseSet.time}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.setDescriptionButton}>
            <SimpleLineIcons name="energy" size={24} color="white" />
            <Text style={styles.setDescriptionButtonText}> {exerciseSet.calories} Kcal </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.setDescriptionOverlay}>
          <Text style={styles.setDescriptionTitle}>{exerciseSet.description}</Text>
          <Text style={styles.setDescriptionText}>{exerciseSet.descText}</Text>
        </View>
        <TouchableOpacity style={styles.startSetButton} onPress={startSet}>
          <Text style={styles.startSetText}>Start Workout</Text>
        </TouchableOpacity>
        {filteredExercises.map((exercise, index) => (
          <View key={exercise.id} style={styles.cardContainer}>
            <ImageBackground
              style={styles.card}
              imageStyle={styles.backgroundImage}
              source={{
                uri: `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`
              }}
            >
              <View style={styles.overlay}>
                <Text style={styles.cardName}>{exercise.name}</Text>
                <Text style={styles.cardDifficulty}>Difficulty: {exercise.level}</Text>
              </View>
              {exercise.completed && (
                <View style={styles.completedMark}>
                  <Text style={styles.completedText}>✓</Text>
                </View>
              )}
            </ImageBackground>
            {filteredExercises.length > 0 && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(false);
                  resetTimer();
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalText}>Exercise Description:</Text>
                    <Text style={styles.exerciceNameModal}>{filteredExercises[currentExerciseIndex].name}</Text>
                    <ImageBackground
                      style={styles.exerciseImageModal}
                      source={{
                        uri: `https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${filteredExercises[currentExerciseIndex].images[0]}`
                      }}
                    />
                    <Text style={styles.Modeltimer}>
                      {Math.floor(timer / 60) < 1 ? '00' : Math.floor(timer / 60)}:
                      {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                    </Text>
                    <View style={styles.progressBarContainer}>
                      <CustomProgressBar progress={progress} />
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={styles.controlButton} onPress={handlePreviousPress}>
                        <AntDesign name="stepbackward" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.controlButton} onPress={pauseTimer}>
                        <AntDesign name="play" size={24} color="black" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.controlButton} onPress={handleNextpress}>
                        <AntDesign name="stepforward" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.DescriptionBox}>
                      <Text style={styles.DescriptionBoxtext}>Note: {filteredExercises[currentExerciseIndex].instructions}</Text>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        ))}
        {isSetFinished && (
          <View style={styles.setFinishedContainer}>
            <Text style={styles.setFinishedText}>Set Finished!</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1f1f1f",
    color: "white",
  },
  scrollView: {
    backgroundColor: "#1f1f1f",
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    color: "white",
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  cardName: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardDifficulty: {
    color: "white",
  },
  startSetButton: {
    backgroundColor: "#73c12f",
    padding: 10,
    height: 70,
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: "center",
  },
  startSetText: {
    color: "#1e1e22",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    fontFamily: "AppleSDGothicNeo-Light",
  },
  completedMark: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  completedText: {
    color: "#A2ED3A",
    fontSize: 54,
    fontWeight: "bold",
  },
  setDescriptionContainer: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  setDescriptionBackground: {
    height: 500,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  setDescriptionOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
  },
  setDescriptionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 29,
  },
  setDescriptionText: {
    color: "white",
    fontSize: 15,
    fontWeight: "200",
  },
  setDescriptionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#39393c", // Gray background color
    paddingVertical: 10, // Vertical padding to separate from the gray box
    borderRadius: 10, // Rounded corners
  },
  setDescriptionButton: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  contentWrapper: {
    padding: 20,
    backgroundColor: "#1f1f1f",
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#1e1e1f",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "93%",
    width: "100%",
  },
  setDescriptionButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  Modeltimer: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 5,
    textAlign: "center",
    fontFamily: "AppleSDGothicNeo-Light",
  },
  exerciceNameModal: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "AppleSDGothicNeo-Light",
  },
  scrollContainer: {
    maxHeight: 200,
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
  },
  exerciseImage: {
    width: "100%",
    height: 200,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  exerciseImageModal: {
    width: "100%",
    height: 360,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 25,
  },
  buttonContainer: {
    marginTop: "3%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#73c12f",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 50,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#73c12f',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  progressBarContainer: {
    backgroundColor: 'red',
    width: '100%',
    borderRadius: 10,
    marginBottom: 5,
  },
  DescriptionBox: {
    width: '95%',
    height: 150,
    backgroundColor: '#616163',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    marginTop: 12,
    padding: 10,
  },
  DescriptionBoxtext: {
    fontSize: 14,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "AppleSDGothicNeo-Light",
  },
  setFinishedContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  setFinishedText: {
    color: '#73c12f',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ExerciseList;
