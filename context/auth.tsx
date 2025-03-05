"use client"
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/firebase/client"

type AuthContextType = {
    currentUser: User | null;
    logout: () => Promise<void>;
    loginwithGoogle:() => Promise<void>
}

// first creat the react context so that we can use it across the app
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }:
    { children: React.ReactNode }  // the typescript define the type
) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user ?? null)
        })
        return () => unsubscribe()
    }, [])

    const logout = async () => {
        await auth.signOut()
    }

    const loginwithGoogle = async () => {
        const provider = new GoogleAuthProvider()
        // Sign in with popup:
        signInWithPopup(auth, provider)
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout, loginwithGoogle }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)