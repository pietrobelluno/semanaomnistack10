const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const github = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = github.data;

      const techsArray = techs.split(",").map(tech => tech.trim());
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        ...(bio && { bio }),
        techs: techsArray,
        location
      });
    }
    return response.json(dev);
  },

  async index(request, response) {
    let devs = await Dev.find();
    return response.json(devs);
  }
};
