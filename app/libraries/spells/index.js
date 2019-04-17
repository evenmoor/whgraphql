function Spells() {
	self = this;

	// to do replace with db calls
	self.data = {
		bloodRain : {
			name : 'Blood Rain',
			cost : 3,
			rng : 8,
			aoe : 3,
			pow : 12,
			dur : '-',
			off : 'YES',
			rulesText : "Blood Rain causes |corrosion damage|. Models hit suffer the |Corrosion continuous effect|."
		},
		execrationOfBlackestNight : {
			name : 'Execration of Blackest Night',
			cost : 2,
			rng : 'SELF',
			aoe : '*',
			pow : '-',
			dur : 'RND',
			off : 'NO',
			rulesText : "While in the spellcaster's command range, enemy models suffer -2 to attack rolls. Execration of Blackest Night lasts for one round."
		},
		huntersMark : {
			name : "Hunter's Mark",
			cost : 2,
			rng : 10,
			aoe : '-',
			pow : '-',
			dur : 'TURN',
			off : 'YES',
			rulesText : "Friendly models can charge or make a slam power attack against target enemy model hit by Hunter's Mark without being forced or spending focus. A Friendly model charging an enemy model hit by Hunter's Mark gains +2\" of movement. Hunter's Mark lasts for one turn."
		},
		onslaught : {
			name : 'Onslaught',
			cost : 2,
			rng : "SELF",
			aoe : "CTRL",
			pow : '-',
			dur : 'UP',
			off : 'NO',
			rulesText : "The spellcaster and friendly Faction models beginning their activations in its control range gain |Relentless Charge| for one turn. (|hint text for relentless charge|)"
		},
		rebuke : {
			name : 'Rebuke',
			cost : 2,
			rng : 10,
			aoe : '-',
			pow : '-',
			dur : 'UP',
			off : 'YES',
			rulesText : "Target model/unit cannot give orders, receive orders, or make power attacks or special attacks."
		},
	};
}

Spells.prototype.getSpellData = function getSpellData(spellId){
	self = this;
	return self.data[spellId];
}

Spells.prototype.formatSpellForProfileTable = function formatSpellForProfileTable(spell){
	return `
		<tr>
			<td>${spell.name}</td>
			<td>${spell.cost}</td>
			<td>${spell.rng}</td>
			<td>${spell.aoe}</td>
			<td>${spell.pow}</td>
			<td>${spell.dur}</td>
			<td>${spell.off}</td>
		</tr>
		<tr class='profile__spell_block__rules_text'>
			<td colspan="7">${spell.rulesText}</td>
		</tr>
	`;
}

module.exports = Spells;