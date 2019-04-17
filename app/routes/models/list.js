//to do replace with graph call...
const modelData = [
	{
		name : {
			full : 'Barnabas, Lord of Blood',
			canonical : 'Barnabas',
			number : 2
		},
	}
];

module.exports = (req, res) => {
	let pageContent = `
		<h1>Model List</h1>
		<ul>
	`;

	modelData.forEach(function(model){
		pageContent += `
			<li><a href='/models/${model.name.canonical}-${model.name.number}/'>${model.name.full}</a>
		`;
	});

	pageContent += `
		</ul>
	`;

	res.send(pageContent);
};