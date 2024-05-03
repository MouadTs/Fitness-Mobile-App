import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Modal, Pressable } from "react-native";
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

// SetDescriptionCard component
const SetDescriptionCard = ({ exerciseSet }) => {
  return (
    <View style={styles.setDescriptionContainer}>
      <ImageBackground
        style={styles.setDescriptionBackground}
        source={exerciseSet.image} // Use the image from exerciseSet prop
      >
        <View style={styles.setDescriptionOverlay}>
          <Text style={styles.setDescriptionTitle}>{exerciseSet.description}</Text>
          <Text style={styles.setDescriptionDetails}>Difficulty: {exerciseSet.difficulty}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const ExerciseList = ({ route }) => {
  const { exerciseSet } = route.params;
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null);
  const [timer, setTimer] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [setStarted, setSetStarted] = useState(false);
  const [resting, setResting] = useState(false);

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
        setFilteredExercises(filtered.slice(0, 10)); // Limit to first 10 exercises
      } catch (error) {
        console.error("Error fetching exercise data:", error);
      }
    };

    fetchExerciseData();
  }, [exerciseSet]);

  useEffect(() => {
    let interval;
    if (setStarted && currentExerciseIndex !== null) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [setStarted, currentExerciseIndex]);

  useEffect(() => {
    if (timer === 0 && !resting && currentExerciseIndex !== null) {
      setResting(true);
      setTimer(5); // Start the rest timer automatically after normal timer ends
    }
  }, [timer, resting, currentExerciseIndex]);

  const startSet = () => {
    setCurrentExerciseIndex(0);
    setTimer(5); // 5 seconds per exercise for demonstration
    setModalVisible(true);
    setSetStarted(true);
  };

  const stopSet = () => {
    setSetStarted(false);
    setResting(false); // Update to false to indicate moving to next exercise
    setCurrentExerciseIndex((prevIndex) => (prevIndex !== null && prevIndex < filteredExercises.length - 1 ? prevIndex + 1 : null));
    setTimer(5); // 5 seconds for next exercise
  };

  const stopExercise = () => {
    if (currentExerciseIndex !== null) {
      const updatedExercises = [...filteredExercises];
      updatedExercises[currentExerciseIndex] = {
        ...updatedExercises[currentExerciseIndex],
        completed: true,
      };
      setFilteredExercises(updatedExercises);
    }
    
    setResting(true);
    setTimer(5); // 5 seconds rest
    setTimeout(() => {
      setResting(false);
      setCurrentExerciseIndex((prevIndex) => prevIndex !== null && prevIndex < filteredExercises.length - 1 ? prevIndex + 1 : null);
      setTimer(5); // 5 seconds for next exercise
    }, 3000); // 3 seconds timeout
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const resetSet = () => {
    setCurrentExerciseIndex(null);
    setTimer(0);
    setModalVisible(false);
    setSetStarted(false);
    setResting(false);
    resetCompletedStatus();
  };

  const resetCompletedStatus = () => {
    const updatedExercises = filteredExercises.map(exercise => ({ ...exercise, completed: false }));
    setFilteredExercises(updatedExercises);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={styles.scrollView}>
      {/* Render the Set Description Card */}
      <SetDescriptionCard exerciseSet={exerciseSet} />

      {/* Rest of your ExerciseList component wrapped in a View with padding */}
      <View style={styles.contentWrapper}>
        {/* Buttons for Set Description */}
        <View style={styles.setDescriptionButtonContainer}>
          <TouchableOpacity style={styles.setDescriptionButton}>
            <Text style={styles.setDescriptionButtonText}>Time: {exerciseSet.time}</Text>
            <Fontisto name="stopwatch" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.setDescriptionButton}>
            <Text style={styles.setDescriptionButtonText}>Calories: {exerciseSet.calories}</Text>
            <SimpleLineIcons name="energy" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Description */}
        <Text style={styles.subtitle}>Description:</Text>
        
        {/* Start Set Button */}
        <TouchableOpacity style={styles.startSetButton} onPress={startSet}>
          <Text style={styles.startSetText}>Start Set</Text>
        </TouchableOpacity>

        {/* Exercise Cards */}
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
          </View>
        ))}

        {/* Modal for Exercise Details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            stopSet();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Exercise Description:</Text>
              {currentExerciseIndex !== null && (
                <ScrollView style={styles.scrollContainer}>
                  <Text style={styles.descriptionText}>
                    {filteredExercises[currentExerciseIndex].instructions}
                  </Text>
                </ScrollView>
              )}
              {resting ? (
                <Text style={styles.timerText}>Rest Time Remaining: {formatTime(timer)}</Text>
              ) : (
                <Text style={styles.timerText}>Time Remaining: {formatTime(timer)}</Text>
              )}
              <View style={styles.modalButtonsContainer}>
                {resting ? (
                  <>
                    <Pressable style={[styles.button, styles.buttonStop]} onPress={stopSet}>
                      <Text style={styles.textStyle}>Stop Set</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonNext]} onPress={stopExercise}>
                      <Text style={styles.textStyle}>Next</Text>
                    </Pressable>
                  </>
                ) : (
                  <>
                    <Pressable style={[styles.button, styles.buttonNext]} onPress={stopExercise}>
                      <Text style={styles.textStyle}>Next</Text>
                    </Pressable>
                    <Pressable style={[styles.button, styles.buttonReset]} onPress={resetSet}>
                      <Text style={styles.textStyle}>Reset Set</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          </View>
        </Modal>
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
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  startSetText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "60%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  timerText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "45%",
  },
  buttonNext: {
    backgroundColor: "#2196F3",
  },
  buttonReset: {
    backgroundColor: "orange",
  },
  buttonStop: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  setDescriptionContainer: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  setDescriptionBackground: {
    height: 600,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  setDescriptionOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  setDescriptionTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  setDescriptionDetails: {
    color: "white",
  },
  setDescriptionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#39393c", // Gray background color
    paddingVertical: 10, // Vertical padding to separate from the gray box
    borderRadius: 10, // Rounded corners
  },
  setDescriptionButton: {
    flexDirection:"row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  setDescriptionButtonText: {
    color: "white",
    fontWeight: "bold",
    marginRight: 8,
  },
  contentWrapper:{
    padding:20,
    backgroundColor:"#1f1f1f",
    color: "white",
  }
});

export default ExerciseList;
