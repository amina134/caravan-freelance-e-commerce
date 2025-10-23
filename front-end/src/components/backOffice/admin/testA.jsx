import styles from './Test.module.css';

export default function Test() {
  return (
    <div className={styles.testRed}>
      TEST: If this is red, CSS modules work!
    </div>
  );
}