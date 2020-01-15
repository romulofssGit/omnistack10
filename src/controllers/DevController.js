const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {

	async index(req, res) {
		const dev = await Dev.find();
		return res.json(dev);
	},

	async postDevs(req, res) {

		try {
			const {
				github_username,
				techs,
				longitude,
				latitude
			} = req.body;

			let dev = await Dev.findOne({github_username});

			/**
			 * Se já tem um registro salvo, retorna o registro
			 */
			if (dev) {
				return res.json(dev);
			}

			// Busca dados da api do git hub
			const response = await axios.get(
				`https://api.github.com/users/${github_username}`
			);

			const {
				name = login, /* Tenta pegar o name e não existir valor pro "name", pega o valor da variavel "login" */
				avatar_url,
				bio
			} = response.data;

			const arrTechs = techs.split(',').map((tech)=>{
				return tech.trim();
			});

			const location = {
				type: "Point",
				coordinates: [longitude, latitude]
			}

			dev = await Dev.create({
				github_username,
				name,
				avatar_url,
				bio,
				techs: arrTechs,
				location
			});

			return res.json(dev);

		} catch (error) {
			console.error('Cannot save the devs data. Error 001', error);
			return res.json({message: 'Cannot save the devs data. Error 001'});
		}
	},

	async update() {
		// TO-DO
		// TO-DO
		// TO-DO
	},

	async destroy() {
		// TO-DO
		// TO-DO
		// TO-DO
	}

}