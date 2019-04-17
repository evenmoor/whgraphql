let specialRules = require('/mnt/app/libraries/specialRules');
specialRules = new specialRules();

let spells = require('/mnt/app/libraries/spells');
spells = new spells();

function Model(data) {
	self = this;
	self.data = data;
}

//getters
Model.prototype.getFullDetails = function getNameBlock() {
	const self = this;
	return `
		${self.getNameBlock()}
		${self.getPictureBlock()}
		${self.getStatBlock()}
		${self.getWeaponBlocks()}
		${self.getDamageBoxesBlock()}
		${self.getBattleGroupPointsBlock()}
		${self.getFactionAllotmentBlock()}
		${self.getHiringBlock()}
		${self.getRulesBlock()}
		${self.getWeaponRulesBlock()}
		${self.getSpellBlock()}
		${self.getFeatBlock()}
	`;
}

Model.prototype.getNameBlock = function getNameBlock() {
	const self = this;
	let keywords = '';

	self.data.keywords.forEach(function(keyword){
		keywords += `${keyword} `;
	});
	
	return `
		<div class='profile__name_block'>
			<img src='' alt='Faction Icon - ${self.data.faction}'/>
			<h1>${self.data.name.full}</h1>
			<h2>${keywords}</h2>
			<h3>v. ${self.data.version}</h3>
		</div>
	`;
}

Model.prototype.getPictureBlock = function getPictureBlock(){
	const self = this;
	const _castStatMapping = {
		fur : 'Fury',
		foc : 'Focus',
		ess : 'Essence'
	}

	let showCastStat = false;
	let castStatName = '';
	let castStat = 0;
	let castStatBlock = '';
	
	//we have fury!
	if(self.data.stats.fur !== undefined){
		showCastStat = true;
		castStatName = _castStatMapping.fur;
		castStat = this.data.stats.fur;
	}
	
	//we have focus!
	if(self.data.stats.foc !== undefined){
		showCastStat = true;
		castStatName = _castStatMapping.foc;
		castStat = self.data.stats.foc;
	}
	
	//we have essence!
	if(self.data.stats.ess !== undefined){
		showCastStat = true;
		castStatName = _castStatMapping.ess;
		castStat = self.data.stats.ess;
	}
	
	if(showCastStat){
		castStatBlock = `
			<div class='profile__picture_block__caster_cast_stat'>
				<h2>${castStatName}</h2>
				<h3>${castStat}</h3>
			</div>
		`;
	}
	
	return `
		<div class='profile__picture_block'>
			<img src='' alt='Card Art'/>
			${castStatBlock}
		</div>
	`;
}

Model.prototype.getStatBlock = function getStatBlock(){
	const self = this;
	const stats = self.data.stats;
	let icons = '';
	self.data.advantages.forEach(function(advantage){
		icons += `icon_advantage_${advantage} `;
	});
	icons += `icon_baseSize_${self.data.size}`;
	
	return `
		<table class='profile__stat_block'>
			<tr class='profile__stat_block__canoncial_name'>
				<th colspan='7'>${self.data.name.canonical} ${self.data.name.number}</th>
			</tr>
			<tr class='profile__stat_block__stat_headings'>
				<th>SPD</th>
				<th>STR</th>
				<th>MAT</th>
				<th>RAT</th>
				<th>DEF</th>
				<th>ARM</th>
				<th>CMD</th>
			</tr>
			<tr class='profile__stat_block__stat_values'>
				<td>${stats.spd}</td>
				<td>${stats.str}</td>
				<td>${stats.mat}</td>
				<td>${stats.rat}</td>
				<td>${stats.def}</td>
				<td>${stats.arm}</td>
				<td>${stats.cmd}</td>
			</tr>
			<tr class='profile__stat_block__icons'>
				<td colspan="7">${icons}</td>
			</tr>
		</table>
	`;
}

Model.prototype.getWeaponBlocks = function getWeaponBlocks(){
	const self = this;
	if(self.data.weapons === undefined) { return; } 
	let returnBlock = '';
	const modelStr = self.data.stats.str;

	self.data.weapons.forEach(function(weapon){
		let icons = '';
		if(weapon.advantages !== undefined){
			weapon.advantages.forEach(function(advantage){
				icons += `icon_advantage_${advantage} `;
			});
		}
	
		returnBlock += `
			<table class='profile__weapon_block'>
				<tr class='profile__weapon_block__weapon_name'>
					<th colspan='7'>${weapon.name}</th>
				</tr>
		`
		if(weapon.type === 'melee'){
			returnBlock += `
				<tr class='profile__weapon_block__stat_headings'>
					<th></th>
					<th>RNG</th>
					<th>POW</th>
					<th>P + S</th>
				</tr>
				<tr class='profile__weapon_block__stat_values'>
					<td><img alt='melee icon'/></td>
					<td>${weapon.rng}</td>
					<td>${weapon.pow}</td>
					<td>${weapon.pow + modelStr}</td>
				</tr>
			`				
		}else{//ranged weapons
			returnBlock += `
				<tr class='profile__weapon_block__stat_headings'>
					<th></th>
					<th>RNG</th>
					<th>ROF</th>
					<th>AOE</th>
					<th>POW</th>
				</tr>
				<tr class='profile__weapon_block__stat_values'>
					<td><img alt='melee icon'/></td>
					<td>${weapon.rng}</td>
					<td>${weapon.rof}</td>
					<td>${weapon.aoe}</td>
					<td>${weapon.pow}</td>
				</tr>
			`
		}
		
		returnBlock += `	
					<tr class='profile__profile__weapon_block__icons'>
					<td colspan="7">${icons}</td>
				</tr>
			</table>
		`
	});
	
	return returnBlock;
}

Model.prototype.getDamageBoxesBlock = function getDamageBoxesBlock(){
	const self = this;
	let returnBlock = `<div class=' profile__box_block profile__box_block--layout_${self.data.boxes.layout}'>`;
	switch(self.data.boxes.layout){
		case 'grid' : //jack style damage grid
		break;//end grid
		
		case 'line': //warrior style damage line
			for(var boxCtr = 1; boxCtr <= self.data.boxes.line.total; boxCtr++){
				if(boxCtr === self.data.boxes.line.total){
					returnBlock += '[<3]';
				}else{
					if(boxCtr % 5 === 0){
						returnBlock += '[#]';
					}else{
						returnBlock += '[]';
					}
				}
			}
		break;//end line
		
		case 'spiral': //beast style damage spirals
		break;//end spirial
		
		case 'web': //horror style damage webs
		break;//end web
	}
	returnBlock += '</div>';
	
	return returnBlock;
}

Model.prototype.getBattleGroupPointsBlock = function getBattleGroupPointsBlock(){
	const self = this;
	if(self.data.battleGroup === undefined) { return; }

	let adjustmentLabel = '';

	switch(self.data.battleGroup.type){
		case 'beast':
			adjustmentLabel = 'WB';
		break;
		
		case 'horror':
			adjustmentLabel = 'HR';
		break;
		
		case 'jack':
			adjustmentLabel = 'WJ';
		break;
	}
	
	return `
		<div class='profile__battle_group_block'>
			<h2>${adjustmentLabel}</h2>
			<h3>+${self.data.battleGroup.adjustment}</h3>
		</div>
	`;
}

Model.prototype.getFactionAllotmentBlock = function getFactionAllotmentBlock(){
	const self = this;

	return `
		<div class='profile__faction_allotment_block'>
			<h2>FA</h2>
			<h3>${self.data.fa}</h3>
		</div>
	`;
}

Model.prototype.getHiringBlock = function getHiringBlock(){
	const self = this;
	if(self.data.hiring === undefined) { return; }
	
	let returnBlock = '';
	self.data.hiring.forEach(function(hire){
		returnBlock += `<div class='profile__hiring'>`;
			returnBlock += `<p><label>${hire.type}</label> - This model will work for `
			for(let factionCtr = 0; factionCtr < hire.factions.length; factionCtr++){
				if(factionCtr > 0){ returnBlock += ', '; }
				if(factionCtr === hire.factions.length - 1){ returnBlock += ' and '; }
				returnBlock += hire.factions[factionCtr];
			}
		returnBlock += '</p></div>';
	});
	
	return returnBlock;
}

Model.prototype.getRulesBlock = function getRulesBlock(){
	const self = this;
	if(self.data.specialRules === undefined) { return; } 
	
	let returnBlock  = `
		<div class='profile__special_rules profile__special_rules--model_unit'>
			<h2>${self.data.name.canonical} ${self.data.name.number}</h2>
	`;

	self.data.specialRules.forEach(function(rule){
		const ruleData = specialRules.getSpecialRuleData(rule.name);
		returnBlock += specialRules.formatSpecialRuleForProfile(ruleData);
	});
	returnBlock += '</div>';

	return returnBlock;
}

Model.prototype.getWeaponRulesBlock = function getWeaponRulesBlock(){
	const self = this;
	if(self.data.weapons === undefined) { return; } 
	
	let returnBlock = '';
	
	self.data.weapons.forEach(function(weapon){
		if(weapon.specialRules === undefined){ return; }
		
		returnBlock  += `
			<div class='profile__special_rules profile__special_rules--weapon'>
				<h2>${weapon.name}</h2>
		`;
		weapon.specialRules.forEach(function(rule){
			const ruleData = specialRules.getSpecialRuleData(rule.name);
			returnBlock += specialRules.formatSpecialRuleForProfile(ruleData);
		});
		returnBlock += '</div>';
	});
	
	
	return returnBlock;
}

Model.prototype.getSpellBlock = function getSpellBlock(){
	const self = this;
	if(self.data.spells === undefined) { return; } 
	
	let returnBlock = `<div class='profile__spell_block'>
		<table>
			<tr>
				<th></th>
				<th>Cost</th>
				<th>RNG</th>
				<th>AOE</th>
				<th>POW</th>
				<th>DUR</th>
				<th>OFF</th>
			</tr>
	`;
	
	self.data.spells.forEach(function(spell){
		const spellData = spells.getSpellData(spell.name);
		returnBlock += spells.formatSpellForProfileTable(spellData);
	});
	
	returnBlock += '</table></div>';
	
	return returnBlock;
}

Model.prototype.getFeatBlock = function getFeatBlock() {
	const self = this;
	if(self.data.feat === undefined) { return; } 
	
	return `
		<div class='profile__feat_block'>
			<h2>FEAT: ${self.data.feat.name}</h2>
			<p class='profile__feat_block__fluff'>${self.data.feat.fluff}</p>
			<p>${self.data.feat.rulesText}</p>
		</div>
	`;
}

module.exports = Model;