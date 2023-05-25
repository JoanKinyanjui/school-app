import styles from '../styles/pending.module.css';

function ProgressTracker(props) {
    const completedSteps = props.completedSteps;
    return (
        <div className={`${styles.stepTracker} flex`}>
          <div className={`${styles.stepCircle} ${completedSteps >= 1 ? styles.completed : ''}`}></div>
          <div className={`${styles.stepCircle} ${completedSteps >= 2 ? styles.completed : ''}`}></div>
          <div className={`${styles.stepCircle} ${completedSteps >= 3 ? styles.completed : ''}`}></div>
          <div className={`${styles.stepCircle} ${completedSteps >= 4 ? styles.completed : ''}`}></div>
        </div>
      );
    
  }
  
  export default ProgressTracker;