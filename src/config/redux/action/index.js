import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebase, { database } from "../../firebase";
import { getDatabase, push, set, ref, onValue } from "firebase/database";



export const actionUserName = () => (dispatch) => {
    setTimeout(() => {
      return dispatch ({type: 'CHANGE_USER', value:'Duanda Mahaputra'})
    }, 2000)
}


export const registerUserAPI = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('success: ', userCredential);
            dispatch({type: 'CHANGE_LOADING', value: false})
            resolve(true)
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({type: 'CHANGE_LOADING', value: false}) 
            reject(false)
        })
    })
}

export const loginUserAPI = (data) => (dispatch) => {

    return new Promise ((resolve, reject) => {
        dispatch({type: 'CHANGE_LOADING', value: true})
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log('success: ', userCredential);
            const dataUser = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
                emailVerified: userCredential.user.emailVerified,
                refreshToken: userCredential.user.refreshToken
            }
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: true})
            dispatch({type: 'CHANGE_USER', value: dataUser})
            resolve(dataUser)
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            dispatch({type: 'CHANGE_LOADING', value: false})
            dispatch({type: 'CHANGE_ISLOGIN', value: false})
            reject(false)
        })
    })
}

export const addDataToAPI = ({userId, title, content, date}) => (dispatch) => {
    console.log("DAVES", userId,title, content, date);
    const db = getDatabase();
    push(ref(db, 'notes/' + userId), {
      title: title,
      content: content,
      date: date
    });
  }

export const getDataFromAPI = (userId) => (dispatch) => {
    const db = getDatabase();
    const urlNotes = ref(db, 'notes/' + userId);
    return new Promise((resolve, reject) => {
        onValue(urlNotes, (snapshot) => {
            // updateStarCount(postElement, data);
            console.log('get Data: ', snapshot.val());
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            });
            dispatch ({type: 'SET_NOTES', value: data})
            resolve(snapshot.val())
          });  
    })
}

export const updateDataAPI = (data) => (dispatch) => {
    const db = getDatabase();
    console.log(data)
        set(ref(db, 'notes/'+data.userId), {
            title: data.title,
            content: data.content,
            date: data.date
        })
        .then((resp) => {
            console.log("Resp", resp);
        })
        .catch((error) => {

        });
}

export const deleteDataAPI = (data) => (dispatch) => {
    const db = getDatabase();
    const urlNotes = ref(db, 'notes/' + noteId);
    return new Promise((resolve, reject) => {
        onValue(urlNotes, (snapshot) => {
            // updateStarCount(postElement, data);
            console.log('get Data: ', snapshot.val());
            const data = [];
            Object.keys(snapshot.val()).map(key => {
                data.remove()
            });
           
          });  
    })
}
