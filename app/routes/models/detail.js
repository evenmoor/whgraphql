const model = require('/mnt/app/libraries/models');

//to do replace with graph call...
const modelData = {
	version : '2017v1',
	faction : 'Minion',
	size : 50,
	name : {
		full : 'Barnabas, Lord of Blood',
		canonical : 'Barnabas',
		number : 2
	},
	keywords : [
		'Minion',
		'Warlock',
		'Unit',
	],
	advantages : [
		'amphibious',
		'tough'
	],
	stats : {
		fur : 7,
		spd : 5,
		str : 9,
		mat : 8,
		rat : 3,
		def : 13,
		arm : 18,
		cmd : 10
	},
	weapons : [
		{
			name : 'Bone Cleaver',
			type : 'melee',
			rng : 2,
			pow : 6,
			advantages : [
				'magical'
			]
		},
		{
			name : 'Bite',
			type : 'melee',
			rng : .5,
			pow : 5,
			specialRules : [
				{ name : 'greviousWounds' }
			]
		}
	],
	boxes : {
		layout :  'line',
		line : { total : 18 }
	},
	battleGroup : {
		type : 'beast',
		adjustment : 23
	},
	fa: 'C',
	hiring : [
		{
			type : 'Minion',
			factions : [
				'Circle',
				'Legion',
				'Skorne',
				'Trollbloods',
			]
		}
	],
	specialRules : [
		{ name : 'bonePile' },
		{ name : 'gatorman' },
		{ name : 'gatormanWarlock' },
		{ name : 'meatFueled' },
		{ name : 'sacrificialPawnBoneSaker' },
		{ name : 'steady' },
		{ name : 'tideOfSkulls' },
		{ name : 'warlockUnitBarnabas2' },
	],
	spells : [
		{ name : 'bloodRain' },
		{ name : 'execrationOfBlackestNight' },
		{ name : 'huntersMark' },
		{ name : 'onslaught' },
		{ name : 'rebuke' },
	],
	feat : {
		name : 'Death Ritual',
		fluff : "The Lord of Blood's faithful congregants are the perfect fodder for his rituals of death. As he snuffs out their lives with his divine will, Barnabas harnesses their flesh and spirits to twist reality to his advantage, nullifying battlefield injuries or magnifying his own killing power.",
		rulesText : "Immediately remove from play one or more friendly living or undead models currently in Barnabas' control range. For each model removed, Barnabas gains 1 corpose token, 1 fury point, or can remove d3 damage points from a model in his battlegroup. Barnabas cannot exceede his FURY in fury points as a result of Death Ritual."
	}
};


module.exports = (req, res) => {
	console.log(`requested model: ${req.params.modelId}`);
	const barny2 = new model(modelData);
	res.send(`${barny2.getFullDetails()}`);
};