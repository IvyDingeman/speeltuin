export default cur => msg =>
	new Promise((resolve, reject) => {
		console.log(msg)
		resolve(cur)
	})
