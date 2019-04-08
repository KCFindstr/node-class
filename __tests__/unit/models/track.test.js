const Track = require('../../../models/track');
const { expect } = require('chai');

describe('track', () => {
	describe('milliseconds', () => {
		it('should fail if not numeric',async () => {
			try {
				let track = new Track({
					name: 'ITP',
					unitPrice: 1.99,
					milliseconds: 'abc' 
				});
				await track.validate();
			} catch (error) {
				expect(error.errors[0].message).to.equal('Milliseconds must be numeric.');
			}
		});
		it('should pass if numeric',async () => {
			let track = new Track({
				name: 'ITP',
				unitPrice: 1.99,
				milliseconds: 2333
			});
			await track.validate();
		});
	});
});