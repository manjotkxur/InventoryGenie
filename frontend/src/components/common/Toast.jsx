const Toast = ({ message, type }) => {
  return (
    <div className={`alert alert-${type || 'info'} mt-2`} role="alert">
      {message}
    </div>
  );
};

export default Toast;
