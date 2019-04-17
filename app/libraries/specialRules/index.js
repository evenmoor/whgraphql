function SpecialRules() {
	self = this;

	// to do replace with db calls
	self.data = {
		bonePile : {
			label : 'Bone Pile',
			rulesText : "When a model in this unit destroys a living or undead enemy model with a melee attack, this model gains the destroyed model's corpsetoken and the destroyed model is removed from play. This model can have up to three corpse tokens at any time."
		},
		gatorman : {
			label : 'Gatorman',
			rulesText : "This model is a Gatorman."
		},
		gatormanWarlock : {
			label : 'Gatorman Warlock',
			rulesText : "This model can have only Minon Gatorman warbeasts in its battlegroup"
		},
		greviousWounds : {
			label : 'Grevious Wounds',
			rulesText : "A model hit by this weapon loses |Tough| and cannot have damage removed from it for one round."
		},
		meatFueled : {
			label : 'Meat-Fueled',
			rulesText : "This model gains +1 STR for each corpse token on it."
		},
		sacrificialPawnBoneSaker : {
			label : 'Sacrifical Pawn [Bone Shaker]',
			rulesText : "When this model is directly hit by an enemy ranged attack, you can have one friendly, non-incorporeal Bone Shaker within 3\" of it directly hit instead. That model is automatically hit and suffers all damage and effects."
		},
		steady : {
			label : 'Steady',
			rulesText : "This model cannot become knocked down"
		},
		tideOfSkulls : {
			label : 'Tide of Skulls',
			rulesText : "During the Control Phase this model can spend 1 or more corpse tokens to add Bone Skaer models to this unit. For each courpse token spent, att one Bone Shaker model. Added models must be placed in formaiton and within 3\" of another model in its unit and must forfit their Combat Action the turn they are put into play. There cannot be more than three Bone Shaker models in this unit in play at any time."
		},
		warlockUnitBarnabas2 : {
			label : 'Warlock Unit',
			rulesText : "This unit is made up of Barnabas and three Bone Shakers"
		}
	};
}

SpecialRules.prototype.getSpecialRuleData = function getSpecialRule(ruleId){
	self = this;
	return self.data[ruleId];
}

SpecialRules.prototype.formatSpecialRuleForProfile = function formatSpecialRuleForProfile(rule){
	return `
		<div class='profile__special_rule'>
			<p><label>${rule.label}</label> - ${rule.rulesText}</p>
		</div>
	`;
}

module.exports = SpecialRules;