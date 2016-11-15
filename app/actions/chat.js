import socket from '../socket';

export const CREATE_MESSAGE = 'CREATE_MESSAGE';

export function createMessage(author, text, attachment) {
  if (text){
    return socket.action({
      type: CREATE_MESSAGE,
      message: {
        author,
        text
      }
    });
  }else if (attachment){
    return socket.action({
      type: CREATE_MESSAGE,
      message: {
        author,
        attachment: attachment
      }
    });
  }

};

export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    message
  };
}

socket.on(RECEIVE_MESSAGE, receiveMessage);
