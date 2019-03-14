const Sequelize = require('sequelize');
const sequelize = require('./../database/sequelize');

module.exports = sequelize.define('track', {
	id: {
		field: 'TrackId',
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: {
		field: 'Name',
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Name is required."
			},
			notEmpty: {
				args: true,
				msg: 'Name should not be empty.'
			}
		}
	},
	milliseconds: {
		field: 'Milliseconds',
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Milliseconds is required."
			},
			isNumeric: {
				args: true,
				msg: 'Milliseconds must be numeric.'
			}
		}
	},
	unitPrice: {
		field: 'UnitPrice',
		type: Sequelize.FLOAT,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Unit price is required."
			},
			isNumeric: {
				args: true,
				msg: 'Unit price must be numeric.'
			}
		}
	}
}, {
	timestamps: false
});