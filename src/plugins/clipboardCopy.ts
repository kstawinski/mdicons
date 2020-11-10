const clipboardCopy = (value: string) => {
  if (value) {
    try {
      const element = document.createElement('textarea');
      element.value = value;
      document.body.appendChild(element);
      element.select();
      document.execCommand('copy');
      document.body.removeChild(element);
    } catch (e) {
      console.error(`An error occured: ${e}`);
    }
  } else {
    console.error('An error occured. No value was specified to copy.');
  }
};

export default clipboardCopy;
