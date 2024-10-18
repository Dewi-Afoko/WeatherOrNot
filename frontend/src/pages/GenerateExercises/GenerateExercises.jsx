// import { useState } from "react";
import GenerateButton from "../../components/GenerateButton";
import ChooseMuscle from "../../components/ChooseMuscle";
import Exercise from "../../components/Exercise";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExercises } from "../../services/exercises";

export function GenerateExercises() {

    // const localExercises = [
    //     {
    //         "name": "Rickshaw Carry",
    //         "type": "strongman",
    //         "muscle": "forearms",
    //         "equipment": "other",
    //         "difficulty": "beginner",
    //         "instructions": "Position the frame at the starting point, and load with the appropriate weight. Standing in the center of the frame, begin by gripping the handles and driving through your heels to lift the frame. Ensure your chest and head are up and your back is straight. Immediately begin walking briskly with quick, controlled steps. Keep your chest up and head forward, and make sure you continue breathing. Bring the frame to the ground after you have reached the end point."
    //     },
    //     {
    //         "name": "Single-Leg Press",
    //         "type": "strength",
    //         "muscle": "quadriceps",
    //         "equipment": "machine",
    //         "difficulty": "intermediate",
    //         "instructions": "Load the sled to an appropriate weight. Seat yourself on the machine, planting one foot on the platform in line with your hip. Your free foot can be placed on the ground. Maintain good spinal position with your head and chest up. Supporting the weight, fully extend the knee and unlock the sled. This will be your starting position. Lower the weight by flexing the hip and knee, continuing as far as flexibility allows. Do not allow your lumbar to take the load by moving your pelvis. At the bottom of the motion pause briefly and then return to the starting position by extending the hip and knee. Complete all repetitions for one leg before switching to the other."
    //     },
    //     {
    //         "name": "Landmine twist",
    //         "type": "strength",
    //         "muscle": "abdominals",
    //         "equipment": "other",
    //         "difficulty": "intermediate",
    //         "instructions": "Position a bar into a landmine or securely anchor it in a corner. Load the bar to an appropriate weight. Raise the bar from the floor, taking it to shoulder height with both hands with your arms extended in front of you. Adopt a wide stance. This will be your starting position. Perform the movement by rotating the trunk and hips as you swing the weight all the way down to one side. Keep your arms extended throughout the exercise. Reverse the motion to swing the weight all the way to the opposite side. Continue alternating the movement until the set is complete."
    //     },
    //     {
    //         "name": "Weighted pull-up",
    //         "type": "strength",
    //         "muscle": "lats",
    //         "equipment": "other",
    //         "difficulty": "intermediate",
    //         "instructions": "Attach a weight to a dip belt and secure it around your waist. Grab the pull-up bar with the palms of your hands facing forward. For a medium grip, your hands should be spaced at shoulder width. Both arms should be extended in front of you holding the bar at the chosen grip. You'll want to bring your torso back about 30 degrees while creating a curvature in your lower back and sticking your chest out. This will be your starting position. Now, exhale and pull your torso up until your head is above your hands. Concentrate on squeezing your shoulder blades back and down as you reach the top contracted position. After a brief moment at the top contracted position, inhale and slowly lower your torso back to the starting position with your arms extended and your lats fully stretched."
    //     },
    //     {
    //         "name": "T-Bar Row with Handle",
    //         "type": "strength",
    //         "muscle": "middle_back",
    //         "equipment": "other",
    //         "difficulty": "intermediate",
    //         "instructions": "Position a bar into a landmine or in a corner to keep it from moving. Load an appropriate weight onto your end. Stand over the bar, and position a Double D row handle around the bar next to the collar. Using your hips and legs, rise to a standing position. Assume a wide stance with your hips back and your chest up. Your arms should be extended. This will be your starting position. Pull the weight to your upper abdomen by retracting the shoulder blades and flexing the elbows. Do not jerk the weight or cheat during the movement. After a brief pause, return to the starting position."
    //     },
    //     {
    //         "name": "Palms-down wrist curl over bench",
    //         "type": "strength",
    //         "muscle": "forearms",
    //         "equipment": "barbell",
    //         "difficulty": "intermediate",
    //         "instructions": "Start out by placing a barbell on one side of a flat bench. Kneel down on both of your knees so that your body is facing the flat bench. Use your arms to grab the barbell with a pronated grip (palms down) and bring them up so that your forearms are resting against the flat bench. Your wrists should be hanging over the edge. Start out by curling your wrist upwards and exhaling. Slowly lower your wrists back down to the starting position while inhaling. Your forearms should be stationary as your wrist is the only movement needed to perform this exercise. Repeat for the recommended amount of repetitions.  Variations:  This exercise can also be performed sitting down by using your thighs as a resting position for your forearms. Your wrist can hang over your knees and the same movements as mentioned above can be performed. You can also use a dumbbell instead of a barbell."
    //     },
    //     {
    //         "name": "Atlas Stones",
    //         "type": "strongman",
    //         "muscle": "lower_back",
    //         "equipment": "other",
    //         "difficulty": "intermediate",
    //         "instructions": "Begin with the atlas stone between your feet. Bend at the hips to wrap your arms vertically around the Atlas Stone, attempting to get your fingers underneath the stone. Many stones will have a small flat portion on the bottom, which will make the stone easier to hold. Pulling the stone into your torso, drive through the back half of your feet to pull the stone from the ground. As the stone passes the knees, lap it by sitting backward, pulling the stone on top of your thighs. Sit low, getting the stone high onto your chest as you change your grip to reach over the stone. Stand, driving through with your hips. Close distance to the loading platform, and lean back, extending the hips to get the stone as high as possible."
    //     },
    //     {
    //         "name": "Dumbbell front raise to lateral raise",
    //         "type": "strength",
    //         "muscle": "shoulders",
    //         "equipment": "dumbbell",
    //         "difficulty": "intermediate",
    //         "instructions": "In a standing position, hold a pair of dumbbells at your side. This will be your starting position. Keeping your elbows slightly bent, raise the weights directly in front of you to shoulder height, avoiding any swinging or cheating. At the top of the exercise move the weights out in front of you, keeping your arms extended. Lower the weights with a controlled motion. On the next repetition, raise the weights in front of you to shoulder height before moving the weights laterally to your sides. Lower the weights to the starting position."
    //     },
    //     {
    //         "name": "Clean from Blocks",
    //         "type": "olympic_weightlifting",
    //         "muscle": "quadriceps",
    //         "equipment": "barbell",
    //         "difficulty": "beginner",
    //         "instructions": "With a barbell on boxes or stands of the desired height, take an overhand or hook grip just outside the legs. Lower your hips with the weight focused on the heels, back straight, head facing forward, chest up, with your shoulders just in front of the bar. This will be your starting position. Begin the first pull by driving through the heels, extending your knees. Your back angle should stay the same, and your arms should remain straight with the elbows pointed out. Next comes the second pull, the main source of acceleration for the clean. As the bar approaches the mid-thigh position, begin extending through the hips. In a jumping motion, accelerate by extending the hips, knees, and ankles, using speed to move the bar upward. There should be no need to actively pull through the arms to accelerate the weight. At the end of the second pull, the body should be fully extended, leaning slightly back, with the arms still extended.3.  As full extension is achieved, transition into the receiving position by aggressively shrugging and flexing the arms with the elbows up and out. Aggressively pull yourself down, rotating your elbows under the bar as you do so. Receive the bar in a front squat position, the depth of which is dependent upon the height of the bar at the end of the third pull. The bar should be racked onto the protracted shoulders, lightly touching the throat with the hands relaxed. Continue to descend to the bottom squat position, which will help in the recovery. Immediately recover by driving through the heels, keeping the torso upright and elbows up. Continue until you have risen to a standing position. Return the weight to the boxes for the next rep."
    //     },
    //     {
    //         "name": "Incline Hammer Curls",
    //         "type": "strength",
    //         "muscle": "biceps",
    //         "equipment": "dumbbell",
    //         "difficulty": "beginner",
    //         "instructions": "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position."
    //     }
    // ]    

    const navigate = useNavigate();
    const [muscle, setMuscle] = useState("")
    const [exercises, setExercises] = useState([])
    const handleSubmit = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (muscle && token) {  // Make sure both muslce and token are set
            getExercises(token, muscle)
            .then((data) => {
                setExercises(data);  // Set exercises to onesfetched from API
            })
            .catch((err) => {
                console.error(err);
                navigate("/login");
            });
        } else {
            console.error("Please select a muscle group and ensure you're logged in.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <h1>Choose a Muscle</h1>
                    <ChooseMuscle
                        setMuscle={setMuscle}
                    />
                </div>
                <div>
                    <GenerateButton/>
                </div>
            </form>

            <div>
                <h1>Try these exercises:</h1>
                {exercises.map((exercise, index) => {
                    console.log('exercise', exercise);
                    return(
                        <Exercise
                            key={index}
                            name={exercise.name}
                            type={exercise.type}
                            muscle={exercise.muscle}
                            difficulty={exercise.difficulty}
                            instructions={exercise.instructions}
                        />
                    )
                })}
            </div>
        </>
    )
}