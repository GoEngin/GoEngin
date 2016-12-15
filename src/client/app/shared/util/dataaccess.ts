export class DataAccess {

	//Firebase User
	createUser(email: string, password: string) {
		return firebase.auth().createUserWithEmailAndPassword(email, password).then((result: any) => {return result;});
	}

	login(provider: string = 'email', email: string = '', password: string = '') {
		let _provider: any = null
		switch (provider) {
			case "google":
				_provider = new firebase.auth.GoogleAuthProvider();
				break;
			case "facebook":
				_provider = new firebase.auth.FacebookAuthProvider();
				break;
		}
		if (_provider) {
			return firebase.auth().signInWithPopup(_provider).then((result: any) => {
				return result;
			});
		} else {
			return firebase.auth().signInWithEmailAndPassword(email, password).then((result: any) => {return result;});
		}
	}

	logout() {
		return firebase.auth().signOut().then((result:any) => {return result;});
	}

	sendPasswordResetEmail(email: string) {
		return firebase.auth().sendPasswordResetEmail(email).then((result:any) => {return result;});
	}

	getData(path: string) {
		return firebase.database().ref(path);
	}

	setData(path: string, value: any) {
		return this.getData(path).set(value);
	}

	getDataOnce(path: string) {
		let ref = firebase.database().ref(path);
		return ref.once('value').then((snapshot: any) => {return snapshot;});
	}
}