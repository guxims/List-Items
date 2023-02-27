import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import { useState } from "react";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  // const [enteredGoalText, setEnteredGoalText] = useState("");
  const [courseGoals, setCourseGoals] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  // function goalInputHandler(enteredText) {
  //   setEnteredGoalText(enteredText); // }

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    // console.log('delete');
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return ( 
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      {/* VIEW 1 INPUT AREA */}
      <Button
        title="add new goal"
        color="#a065ec"
        onPress={startAddGoalHandler}
      />
      <GoalInput
        visible={modalIsVisible}
        onAddGoal={addGoalHandler}
        onCancle={endAddGoalHandler}
      ></GoalInput>

      {/* VIEW 2 LIST OF GOALS */}
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => {
            return (
              <GoalItem
                text={itemData.item.text}
                onDeleteItem={deleteGoalHandler}
                id={itemData.item.id}
              ></GoalItem>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />
        {/* <Text key={item}>List of goals</Text> */}
        {/* {courseGoals.map((item) => ( */}
        {/* <View style={styles.goalItem} key={item}>
            <Text style={styles.goalText}>{item}</Text>
          </View> */}
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    //takes all the availible height
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5,
  },
});
