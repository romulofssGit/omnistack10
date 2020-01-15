module.exports = (arrayAsString) => {
	return arrayAsString.split(',').map((tech)=>{
		return tech.trim();
	});
}