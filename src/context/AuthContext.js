import React from "react"
import { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loggedIn, setLoggedIn] = useState()

   auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
              setLoggedIn(true)
          } else {
            // No user is signed in.
            setLoggedIn(false)
          }
        });

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
           setCurrentUser(user)
       })
       return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        loggedIn
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
