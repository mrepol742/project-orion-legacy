module.exports = (timezone) => {
	const a = new Date()
	const b = new Date(a.toLocaleString('en-US', {
		timeZone: timezone
	}))
	return new Date(a.getTime() - (a.getTime() - b.getTime()))
}