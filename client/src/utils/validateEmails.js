const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (emails) => {

  const invalidEmails = emails
    .split(',')
    .map(e => e.trim())
    .filter(e => !re.test(e));

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`
  }
} 