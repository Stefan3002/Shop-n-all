import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from 'firebase/auth'
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc} from 'firebase/firestore'
// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBKppqsPCKv0aKa5TaJhi6ehpEnb8xYRVM",
    authDomain: "e-shop-e61b5.firebaseapp.com",
    projectId: "e-shop-e61b5",
    storageBucket: "e-shop-e61b5.appspot.com",
    messagingSenderId: "155288188550",
    appId: "1:155288188550:web:598255d157fba12b970307"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);




export const auth = getAuth()
const GoogleProvider = new GoogleAuthProvider()
const db = getFirestore()

export const createAccountGoogle = async () => await signInWithPopup(auth,GoogleProvider)

export const createUserDoc = async (userData) => {
    const {displayName, email, uid} = userData

    const docRef = await doc(db,'users',uid)
    const docSnap = await getDoc(docRef)
    const createdAt = new Date()
    if(docSnap.exists())
        return docRef
    else{
        await setDoc(docRef, {
            displayName,
            email,
            favourites: [],
            createdAt,
            uid
        })
        return docRef
    }
}

export const updateDocument = async (fieldName, value, currentUser) => {
    const userRef = doc(db, 'users', currentUser.uid)
    await updateDoc(userRef, {
        favourites: value
    })
}

export const retrieveFavourites = async (user) => {
    const userRef = await doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    return userSnap.data().favourites
}

export const retrieveUserData = async (uid) => {
    const docRef = doc(db, 'users', uid)
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}



export const fetchCategoriesAndItems = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)
    const collectionsSnap = await getDocs(q)
    return collectionsSnap.docs.reduce((acc, collectionSnap) => {
        const {title, items} = collectionSnap.data()
        acc[title] = items
        return acc
    }, {})
}

export const addReviewToDocument = async (user,stars ,reviewBody, reviewTitle, productId, categoryTitle) => {
    const {displayName, uid} = user

    //For the item itself
    const docRef = doc(db, 'categories', categoryTitle.toLowerCase())
    const docSnap = await getDoc(docRef)
    const items = docSnap.data().items
    const addedAt = new Date()
    const foundItem = items.find((item) => item.id == productId)

    if(!foundItem.reviews)
        foundItem.reviews = []

    let starsAverage = foundItem.reviews.reduce((acc, review) => {
        return acc + review.stars
    }, stars)

    starsAverage *= 1.0
    //For decimals
    starsAverage /= foundItem.reviews.length + 1

    const userDocRef = doc(db,'users', uid)

    //+ 1 is to accommodate for the current review that has not been written to db
    foundItem.reviews.push({displayName,stars ,reviewTitle, reviewBody, addedAt, user: userDocRef})

    if(!foundItem.starAverage)
        foundItem.starAverage = 0

    foundItem.starAverage = starsAverage.toFixed(2)

    await updateDoc(docRef, {
        items
    })

    //For the user
    const userDocSnap = await getDoc(userDocRef)
    const userData = userDocSnap.data()
    if(!("reviews" in userData))
        userData.reviews = []
    const {imageUrl, name} = foundItem
    userData.reviews.push({displayName,stars ,reviewTitle, reviewBody, addedAt, item: {imageUrl, name}})
    await updateDoc(userDocRef, {
        ...userData
    })

    return {
        newReviews: foundItem.reviews,
        starAverage: starsAverage
    }
}

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)

export const signOutHandler = () => signOut(auth)


export const addAddressToDB = async (country, address, user) => {
    const userDocRef = doc(db, 'users', user.uid)
    const userDocSnap = await getDoc(userDocRef)
    const userData = userDocSnap.data()
    if(!('address' in userData))
        userData.address = {}
    userData.address = {
        country,
        address
    }
    await updateDoc(userDocRef, {
        ...userData
    })
}


// export const createCollectionAndDocument = async (collectionKey, objectsToAdd) => {
//     const collectionRef = collection(db, collectionKey)
//     const batch = writeBatch(db)
//     objectsToAdd.forEach((object) => {
//         const docRef = doc(collectionRef,object.id)
//         batch.set(docRef, object)
//     })
//     await batch.commit()
// }