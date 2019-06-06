const MessageModel = require('../schemas/messageSchema');

class MessagesController {
  // get messages list in selected channel
  getMessagesInChannel(channel) {
    return new Promise((resolve, reject) => {
      MessageModel.find({ 'user.channel.channelName': room }).then(messages => {
        if (messages !== undefined) {
          console.log('MESSAGES IN CHANNEL ', messages);
          resolve(messages);
        } else {
          reject('No Messages');
        }
      });
    });
  }

  // put message into database
  saveMessage(message) {
    // let channel = new ChannelModel.model({channelName: message.use})
    let messageToDb = new MessageModel({
      user: message.user,
      text: message.text,
      date: message.date
    });

    messageToDb
      .save()
      .then(doc => {
        console.log(doc);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
module.exports = new MessagesController();
