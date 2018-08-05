import crypto from 'crypto';

export const getToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, async function(ex, buf) {
      if (ex) {
        reject(ex);
      }
      const token = buf.toString('hex');
      resolve(token);
    });
  });
};
