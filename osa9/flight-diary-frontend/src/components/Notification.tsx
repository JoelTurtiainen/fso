import styles from '../style.module.css';

const Notification = ({ message }: { message: string }) => {
  return <p className={styles.notification}>{message}</p>;
};

export default Notification;
