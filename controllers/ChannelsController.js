const ChannelModel = require('../schemas/channelSchema');

class ChannelsController {
  //get channels list
  getChannels() {
    return new Promise((resolve, reject) => {
      ChannelModel.model
        .find()
        .then(channels => {
          if (channels !== undefined) {
            resolve(channels);
          } else {
            reject('No channels !');
          }
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  // put new channel into database
  saveChannel(room) {
    const channelToSave = new ChannelModel.model({
      channelName: room
    });

    channelToSave
      .save()
      .then(channel => {
        console.log(channel);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
module.exports = new ChannelsController();
