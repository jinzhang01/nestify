"use client"
import { GoogleAuthProvider, ParsedToken, signInWithPopup, User } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "@/firebase/client"
import { removeToken, setToken } from "./actions"

type AuthContextType = {
    currentUser: User | null;
    logout: () => Promise<void>;
    loginwithGoogle:() => Promise<void>
    customClaims: ParsedToken | null
}

// first creat the react context so that we can use it across the app
const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }:
    { children: React.ReactNode }  // the typescript define the type
) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user ?? null)
            if (user) {
                const tokenResult = await user.getIdTokenResult()
                const token = tokenResult.token;
                const refreshToken = user.refreshToken;
                const claims = tokenResult.claims;
                setCustomClaims(claims ?? null);

                if (token && refreshToken) {
                    // setToken({ token, refreshToken });
                    await setToken({ token, refreshToken });
                }

            } else {
                await removeToken();
            }
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
        <AuthContext.Provider value={{ currentUser, logout, loginwithGoogle, customClaims}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)