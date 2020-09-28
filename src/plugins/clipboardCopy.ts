function clipboardCopy(text: string) {
  if (text) {
    try {
      const createdField = document.createElement('textarea');
      createdField.value = text;
      document.body.appendChild(createdField);
      createdField.select();
      document.execCommand('copy');
      document.body.removeChild(createdField);
    } catch (e) {
      console.warn(e);
    }
  }
}

export default clipboardCopy;
