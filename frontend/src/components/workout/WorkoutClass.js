class WorkoutClass {
    constructor(username, planning = false) {
        this.date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        this.exerciseList = [];
        this.complete = false;
        this.userUsername = username;
        this.planningMode = planning;
    }

    addExercise(exercise) {
        if (this.exerciseList.length === 0 || this.exerciseList[this.exerciseList.length - 1].complete || this.planningMode) {
            this.exerciseList.push({
                name: exercise.name,
                loading: [],
                reps: [],
                complete: false
            });
        } else {
            return "To add a new exercise, mark the previously added exercise as complete";
        }
    }

    addLoading(loading) {
        if (!this.exerciseList[this.exerciseList.length - 1].complete) {
            this.exerciseList[this.exerciseList.length - 1].loading.push(`${loading}kg`);
        }
    }

    addReps(reps) {
        if (this.exerciseList[this.exerciseList.length - 1].reps.length < 6) {
            this.exerciseList[this.exerciseList.length - 1].reps.push(reps);
            if (this.exerciseList[this.exerciseList.length - 1].reps.length === 6) {
                this.exerciseList[this.exerciseList.length - 1].complete = true;
            }
        }
    }

    completeExercise() {
        this.exerciseList[this.exerciseList.length - 1].complete = true;
    }

    completeWorkout() {
        if (!this.planningMode) {
            this.complete = true;
        }
    }
}

export default WorkoutClass;