import shortid from 'shortid';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+-');

export const generate = shortid.generate;
export default shortid;
